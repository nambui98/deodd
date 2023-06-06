import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { GA_TRACKING_ID } from '../utils/gtag';
export default function Document() {

	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="color-scheme" content="light only"></meta>
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GA_TRACKING_ID}', {
							page_path: window.location.pathname,
						});
				`,
					}}
				/>
				{/* <meta
					name="google-site-verification"
					content="HYiuC-O79F8rJ09CK5wwhKFlBQjNnMA9QAgaJsejIzs"
				/> */}
				{/* <script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GA_TRACKING_ID}', {
							page_path: window.location.pathname,
						});
				`,
					}}
				/>
				<meta
					name="facebook-domain-verification"
					content="34xv3jxswvy30ianzlijfcji8xgwj6"
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `!function(f,b,e,v,n,t,s)
					{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};
					if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
					n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t,s)}(window, document,'script',
					'https://connect.facebook.net/en_US/fbevents.js');
					fbq('init', '764522044915903');
					fbq('track', 'PageView');`,
					}}
				/>
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<img height="1" width="1" style="display:none"
					src="https://www.facebook.com/tr?id=764522044915903&ev=PageView&noscript=1" />`,
					}}
				/> */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
