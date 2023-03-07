import React from 'react'
import { IProps } from '../../libs/interfaces'
import { Header } from './header'
import { Contact } from './contact'
import { Box } from '@mui/material'


const Layout = ({ children }: IProps) => {
    return (
        < >
            <Header />
            <main>{children}</main>
            <Contact />
        </>
    )
}

export default Layout