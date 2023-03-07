import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { WalletProvider } from '../contexts/WalletContext';
import { AppPropsCustom } from '../libs/types';
import '../styles/globals.css';
import '../styles/globals.scss';
import Layout from '../components/common/layout';

function MyApp(props: AppPropsCustom) {
  const { pageProps, Component } = props;
  return (
    <ColorModeProvider {...props}>
      <WalletProvider>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </ColorModeProvider>
  )
}

export default MyApp
