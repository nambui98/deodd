import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { WalletProvider, useWalletContext } from '../contexts/WalletContext';
import { AppPropsCustom } from '../libs/types';
import '../styles/globals.css';
import '../styles/globals.scss';
import Layout from '../components/common/Layout';
import { WagmiConfig } from 'wagmi';
import { wagmiClient } from 'config/wagmi';
import { useEffect, useState } from 'react';
import { ContractProvider } from 'contexts/ContractContext';
import Loader from 'components/common/Loader';
import MadalClaimSuccess from 'components/common/MadalClaimSuccess';
import { SiteProvider } from 'contexts/SiteContext';
import MadalError from 'components/common/MadalError';
import NextProgress from "next-progress";
import { Colors } from 'constants/index';

function MyApp(props: AppPropsCustom) {
  const { pageProps, Component } = props;
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={wagmiClient}>

      <SiteProvider>
        <ColorModeProvider {...props}>
          <WalletProvider>
            <ContractProvider>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>

              <Loader />
              <MadalClaimSuccess />
              <MadalError />
              <NextProgress delay={300} color={Colors.secondaryDark} height={8} disableSameRoute options={{ showSpinner: true, }} />

            </ContractProvider>
          </WalletProvider>
        </ColorModeProvider>

      </SiteProvider>
    </WagmiConfig>
  )
}

export default MyApp
