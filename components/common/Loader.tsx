import { Box } from '@mui/material';
import { useSiteContext } from 'contexts/SiteContext';

type Props = { isLoadingProps?: boolean, isInComponent?: boolean, size?: number }

export default function Loader({ isLoadingProps, isInComponent, size = 60 }: Props) {
    const { isLoading } = useSiteContext();
    let loading = isLoading || isLoadingProps;
    return (
        <Box position={isInComponent ? 'relative' : 'fixed'} zIndex={100} sx={{ inset: 0, display: loading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', bgcolor: "transparent" }} >
            <Box className="spinner" width={size} height={size} >
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" /></Box>

        </Box>
    )
}