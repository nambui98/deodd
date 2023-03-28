import React from 'react'
import { IProps } from '../../libs/interfaces'
import { Header } from './Header'
import { Contact } from './Contact'


const Layout = ({ children }: IProps) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Contact />
        </>
    )
}

export default Layout