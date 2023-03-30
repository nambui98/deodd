import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { WalletProvider } from '../contexts/WalletContext';
import { AppPropsCustom } from '../libs/types';
import '../styles/globals.css';
import '../styles/globals.scss';
import Layout from '../components/common/Layout';
import { WagmiConfig } from 'wagmi';
import { wagmiClient } from 'config/wagmi';
import { useEffect, useState } from 'react';
import { ContractProvider } from 'contexts/ContractContext';

function MyApp(props: AppPropsCustom) {
  const { pageProps, Component } = props;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={wagmiClient}>
      <ColorModeProvider {...props}>
        <WalletProvider>
          <ContractProvider>
            <CssBaseline />
            {
              mounted && <Layout>
                <Component {...pageProps} />
              </Layout>
            }
          </ContractProvider>
        </WalletProvider>
      </ColorModeProvider>
    </WagmiConfig>
  )
}

export default MyApp
