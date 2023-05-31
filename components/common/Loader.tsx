import { Box } from '@mui/material';
import { useSiteContext } from 'contexts/SiteContext';
import CoinAnimation from './CoinAnimation';

type Props = { isLoadingProps?: boolean, isInComponent?: boolean, size?: number }

export default function Loader({ isLoadingProps, isInComponent, size = 60 }: Props) {
    const { isLoading } = useSiteContext();
    let loading = isLoading || isLoadingProps;
    return (
        <Box position={isInComponent ? 'relative' : 'fixed'} zIndex={100} sx={{ inset: 0, display: loading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', bgcolor: "transparent" }} >
            <CoinAnimation width={size} height={size} />
        </Box>
    )
}