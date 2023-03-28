import { ethers } from "ethers";
// import { Button } from "../ui/button"
import { changeNetwork, useWalletContext } from "../../contexts/WalletContext";
import Image from 'next/image'
import { UserService } from "../../services/user.service";
import { TEXT_STYLE } from "../../styles/common"
import { Box, BoxProps, ButtonProps, Stack, styled, Typography } from "@mui/material";
import { propsTheme } from "../../pages/homepage";
import { useColorModeContext } from "../../contexts/ColorModeContext";
import { ButtonMain } from "../ui/button";

export const ConnectWallet = () => {
	const { handleConnectWallet } = useWalletContext();
	const { darkMode } = useColorModeContext();
	return <Wrap>
		<BoxConnect>
			<Title themelight={!darkMode}>Feel lucky today?</Title>
			<div style={{ marginBottom: '35px' }}><img alt="" width={144} src="assets/icons/head.svg" /></div>
			<ButtonMain active={true} title="Connect wallet" onClick={handleConnectWallet} customStyle={{
				width: 213
			}} />
		</BoxConnect>

	</Wrap>
}

const Wrap = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	// marginLeft: 60
})
const BoxConnect = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})
const Title = styled(Typography)((props: propsTheme) => ({
	...TEXT_STYLE(24, 500, props.themelight ? '#181536' : '#FFFFFF'),
	textTransform: 'uppercase',
	marginBottom: 24,
	'@media (min-width: 800px)': {
		marginBottom: 40
	}
}))
