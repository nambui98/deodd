import { Box } from '@mui/material';
import { useSiteContext } from 'contexts/SiteContext';

type Props = {}

export default function Loader({ }: Props) {
    const { isLoading } = useSiteContext();
    return (
        <Box position={'fixed'} zIndex={100} sx={{ inset: 0, display: isLoading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', bgcolor: "#25244b86" }} >
            <div className="spinner">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" /></div>

        </Box>
    )
}