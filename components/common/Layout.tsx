import React from 'react'
import { IProps } from '../../libs/interfaces'
import { Contact } from './Contact'
import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'


const Layout = ({ children }: IProps) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Box position={'fixed'} bottom={{ lg: "80px", md: "30px" }} left={{ lg: '80px', md: "30px" }} display={{ xs: 'none', md: 'block' }}>
                <Contact />
            </Box>
            <Footer />
        </>
    )
}

export default Layout