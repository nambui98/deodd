// import { Button } from "../ui/button"
import { Box, styled, Typography } from "@mui/material";
import { useWalletContext } from "../../contexts/WalletContext";
import { ButtonLoading, ButtonMain } from "../ui/button";
import CoinAnimation from "./CoinAnimation";

export const ConnectWallet = () => {
	const { handleConnectWallet, isConnectingWallet } = useWalletContext();
	return <Box mt={{ md: 15, xs: 8 }}>
		<BoxConnect>
			<Typography variant="h2" fontWeight={700} textTransform={'uppercase'}>Feel lucky today?</Typography>
			<Box my={5}>
				<CoinAnimation width={{ md: 144, xs: 160 }} height={{ md: 144, xs: 160 }} />
			</Box>
			<ButtonLoading
				onClick={handleConnectWallet}
				sx={{
					px: 5, py: 2,
					borderRadius: 2,
					width: 'auto',
					textTransform: 'none',
				}}
				loading={isConnectingWallet}>
				<Typography variant='body2' fontSize={16} fontWeight={600} >Connect wallet</Typography>
			</ButtonLoading>
		</BoxConnect>

	</Box>
}


const BoxConnect = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})

