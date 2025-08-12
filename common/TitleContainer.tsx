'use client';
import { Paper, Typography, type TypographyProps } from "@mui/material";

export type titleContainerProps = {
    title: string;
    subTitle?: string;
    variant?: TypographyProps["variant"]; // here variant should be only "h1, h2,h3,h4,body1,subtitle"
    subVariant?: TypographyProps["variant"]; // here variant should be only "h1, h2,h3,h4,body1,subtitle"
}

export default function TitleContainer(props: titleContainerProps) {
    const { variant = "h4" } = props;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant={variant} gutterBottom>
                {props.title}
            </Typography>
            {props.subTitle && (
                <Typography variant={props.subVariant || "body1"}>
                    {props.subTitle}
                </Typography>
            )}
        </Paper>
    );
}
