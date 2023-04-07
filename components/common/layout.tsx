import React from 'react'
import { IProps } from '../../libs/interfaces'
import { Contact } from './Contact'
import Header from './Header'


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