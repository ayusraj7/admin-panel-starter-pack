import { Container, Paper, Typography } from '@mui/material'
import React from 'react'
import TitleContainer from '../../common/TitleContainer'

const page = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <TitleContainer title='Roles And Permissions'/>
    </Container>
  )
}

export default page