import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import { changeNetwork, useWalletContext, WalletProvider } from '../contexts/WalletContext';
import { ThemeProvider } from '@mui/material';
import theme from '../utils/theme';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    <>
      <ThemeProvider theme={theme}>
        <WalletProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </WalletProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
