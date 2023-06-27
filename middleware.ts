import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { urlToHttpOptions } from 'url'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()

    if (url.pathname === '/loyalty'
        || url.pathname === '/statistic'

        || url.pathname === '/share'
        || url.pathname === '/referral'
        || url.pathname === '/profile'
        || url.pathname === '/lottery'
        || url.pathname === '/'
        || url.pathname === '/homepage'
        || url.pathname === '/campaign'
        || url.pathname === '/assets'
    ) {
        url.pathname = '/mainnet-launching'
        return NextResponse.redirect(url)
    } else if (url.pathname === '/shop') {
        url.pathname = '/shop-opening'
        return NextResponse.redirect(url)
    }

}
// export const config = {
//     matcher: '/',
// }