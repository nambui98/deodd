// import { Button } from "../ui/button"
import { Box, styled, Typography } from "@mui/material";
import { useWalletContext } from "../../contexts/WalletContext";
import { ButtonMain } from "../ui/button";
import CoinAnimation from "./CoinAnimation";

export const ConnectWallet = () => {
	const { handleConnectWallet } = useWalletContext();
	return <Box mt={{ md: 15, xs: 8 }}>
		<BoxConnect>
			<Typography variant="h2" fontWeight={700} textTransform={'uppercase'}>Feel lucky today?</Typography>
			<Box my={5}>
				<CoinAnimation width={{ md: 144, xs: 160 }} height={{ md: 144, xs: 160 }} />
			</Box>
			<ButtonMain active={true} title="Connect wallet" onClick={handleConnectWallet} customStyle={{
				px: 5, py: 2, textTransform: 'none', fontSize: 16
			}} />
		</BoxConnect>

	</Box>
}


const BoxConnect = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})

