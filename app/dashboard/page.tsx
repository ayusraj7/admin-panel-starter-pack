'use client';
import { Container, Typography, Paper, Box } from '@mui/material';
import TitleContainer from '../../common/TitleContainer';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <TitleContainer title='Welcome to Dashboard' subTitle='This is your dashboard main content. You can customize this page as needed.' />
    </Container>
  );
}
