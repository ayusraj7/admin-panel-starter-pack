'use client';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useEffect,useState } from 'react';
import TitleContainer from '../../common/TitleContainer';
import CustomTable from '../../common/CustomTable';
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value : any) => value.toLocaleString(),
  },
  {
    id: 'size',
    label: 'Size (km²)',
    minWidth: 170,
    align: 'right',
    format: (value : any) => value.toLocaleString(),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value : any) => value.toFixed(2),
  },
];

// Client-side sample data
function createData(name: string, code: string, population: number, size: number): Country {
  return { name, code, population, size, density: population / size };
}
const clientRows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Australia', 'AU', 25475400, 7692024),
];

export default function DashboardPage() {
  const [serverRows, setServerRows] = useState<any>([]);
  const [totalCount, setTotalCount] = useState(0);

  // Server-side fetch simulation
  const fetchServerData = (page: number, rowsPerPage: number) => {
    console.log(`Fetching server data for page ${page}, rowsPerPage ${rowsPerPage}`);
    setTimeout(() => {
      // Simulated API response
      const start = page * rowsPerPage;
      const newData = clientRows.slice(start, start + rowsPerPage);
      setServerRows(newData);
      setTotalCount(clientRows.length);
    }, 500);
  };

  useEffect(() => {
    fetchServerData(0, 10);
  }, []);
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <TitleContainer title='Welcome to Dashboard' subTitle='This is your dashboard main content. You can customize this page as needed.' />
       <h2>Client-side Pagination</h2>
      <CustomTable columns={columns} rows={clientRows} paginationMode="client" />

      <h2 style={{ marginTop: 40 }}>Server-side Pagination</h2>
      <CustomTable
        columns={columns}
        rows={serverRows}
        totalCount={totalCount}
        paginationMode="server"
        onPageChange={fetchServerData}
      />
    </Container>
  );
}
