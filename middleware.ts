import { DateOpenMainnet } from 'constants/index'
import { isBefore } from 'date-fns'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()

    const isNotMainnetOpen = process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" ? isBefore(new Date(), new Date(DateOpenMainnet)) : false;
    debugger
    if (isNotMainnetOpen) {
        if (url.pathname === '/loyalty'
            || url.pathname === '/statistic'
            || url.pathname === '/share'
            || url.pathname === '/referral'
            || url.pathname === '/profile'
            || url.pathname === '/lottery'
            || url.pathname === '/homepage'
            || url.pathname === '/campaign'
        ) {

            if (isNotMainnetOpen) {
                url.pathname = '/mainnet-launching'
                return NextResponse.redirect(url)

            } else {
                return NextResponse.next();
            }
        } else if (
            url.pathname === '/'
        ) {
            url.pathname = '/shop'
            return NextResponse.redirect(url)
        }
    } else {

        return NextResponse.next();
    }

}
