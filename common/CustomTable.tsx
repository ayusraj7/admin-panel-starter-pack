import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTheme as useMuiTheme } from '@mui/material/styles';


export interface Column<T> {
    id: keyof T;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any, row?: T) => React.ReactNode;
}

interface CustomTableProps<T> {
    columns: readonly Column<T>[];
    rows: T[];
    rowsPerPageOptions?: number[];
    totalCount?: number; // Required for server-side mode
    paginationMode?: 'client' | 'server';
    onPageChange?: (page: number, rowsPerPage: number) => void; // Server mode callback
}

export default function CustomTable<T extends { [key: string]: any }>({
    columns,
    rows,
    rowsPerPageOptions = [10, 25, 100],
    totalCount,
    paginationMode = 'client',
    onPageChange,
}: CustomTableProps<T>) {
    const theme = useMuiTheme();
    console.log('theme', theme.palette.primary.main)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
        if (paginationMode === 'server' && onPageChange) {
            onPageChange(newPage, rowsPerPage);
        }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRpp = +event.target.value;
        setRowsPerPage(newRpp);
        setPage(0);
        if (paginationMode === 'server' && onPageChange) {
            onPageChange(0, newRpp);
        }
    };

    const displayedRows =
        paginationMode === 'client'
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    sx={{
                                        background: theme.palette.mode === "light" ? theme.palette.primary.main : theme.palette.background.tableHeader,
                                        color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                                    }}
                                    key={String(column.id)}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.map((row, rowIndex) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={String(column.id)} align={column.align}>
                                            {column.format ? column.format(value, row) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                sx={{
                    background: theme.palette.mode === "light" ? theme.palette.primary.main : theme.palette.background.tableHeader,
                    color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                }}
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={paginationMode === 'client' ? rows.length : totalCount || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
