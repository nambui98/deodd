import { ethers } from "ethers";
// import { Button } from "../ui/button"
import { useWalletContext } from "../../contexts/WalletContext";
import Image from 'next/image'
import { UserService } from "../../services/user.service";
import { TEXT_STYLE } from "../../styles/common"
import { Box, BoxProps, ButtonProps, Stack, styled, Typography } from "@mui/material";
import { propsTheme } from "../../pages/homepage";
import { useColorModeContext } from "../../contexts/ColorModeContext";
import { ButtonMain } from "../ui/button";
import { CoinAnimation } from "./CoinAnimation";

export const ConnectWallet = () => {
	const { handleConnectWallet } = useWalletContext();
	return <Box mt={15}>
		<BoxConnect>
			<Typography variant="h2" fontWeight={700} textTransform={'uppercase'}>Feel lucky today?</Typography>
			<Box my={5}>
				<CoinAnimation width={144} height={144} />
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

