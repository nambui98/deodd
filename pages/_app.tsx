import CssBaseline from '@mui/material/CssBaseline';
import Loader from 'components/common/Loader';
import MadalClaimSuccess from 'components/common/MadalClaimSuccess';
import MadalError from 'components/common/MadalError';
import { wagmiClient } from 'config/wagmi';
import { Colors } from 'constants/index';
import { ContractProvider } from 'contexts/ContractContext';
import { SiteProvider } from 'contexts/SiteContext';
import NextProgress from "next-progress";
import { WagmiConfig } from 'wagmi';
import Layout from '../components/common/Layout';
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { WalletProvider } from '../contexts/WalletContext';
import { AppPropsCustom } from '../libs/types';
import '../styles/globals.css';
import '../styles/globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Create a client
const queryClient = new QueryClient()
function MyApp(props: AppPropsCustom) {
  const { pageProps, Component } = props;
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);
  return (
    <QueryClientProvider client={queryClient}>

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

    </QueryClientProvider>
  )
}

export default MyApp
