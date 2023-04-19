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

export const ConnectWallet = () => {
	const { handleConnectWallet } = useWalletContext();
	return <Box mt={15}>
		<BoxConnect>
			<Typography mb={{ xs: 3, md: 5 }} variant="h2" fontWeight={500} textTransform={'uppercase'}>Feel lucky today?</Typography>
			<div style={{ marginBottom: '35px' }}><img alt="" width={144} src="assets/icons/head.svg" /></div>
			<ButtonMain active={true} title="Connect wallet" onClick={handleConnectWallet} customStyle={{
				width: 213
			}} />
		</BoxConnect>

	</Box>
}


const BoxConnect = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})

