import { Box } from '@mui/material';
import { useSiteContext } from 'contexts/SiteContext';

type Props = { isLoadingProps?: boolean }

export default function Loader({ isLoadingProps }: Props) {
    const { isLoading } = useSiteContext();
    let loading = isLoading || isLoadingProps;
    return (
        <Box position={'fixed'} zIndex={100} sx={{ inset: 0, display: loading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', bgcolor: "transparent" }} >
            <div className="spinner">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" /></div>

        </Box>
    )
}