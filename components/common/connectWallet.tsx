import { ethers } from "ethers";
// import { Button } from "../ui/button"
import { changeNetwork, useWalletContext } from "../../contexts/WalletContext";
import { UserService } from "../../services/user.service";
import { TEXT_STYLE } from "../../styles/common"
import { Box, BoxProps, ButtonProps, Stack, styled, Typography } from "@mui/material";
import { propsTheme } from "../../pages/homepage";
import { useColorModeContext } from "../../contexts/ColorModeContext";
import { ButtonMain } from "../ui/button";

export const ConnectWallet = () => {
	const { provider, setWalletAccount, setToggleActivePopup, walletAccount, metaMaskIsInstalled, chainIdIsSupported } = useWalletContext();
	const { darkMode } = useColorModeContext();

	const handleConnectWallet = async () => {
		if (!metaMaskIsInstalled) {
			let a = document.createElement('a');
			a.target = '_blank';
			a.href = 'https://metamask.io/download';
			a.click();
		} else if (!walletAccount) {
			const providerEthers = await new ethers.providers.Web3Provider(provider);
			const address = await providerEthers.send("eth_requestAccounts", []);
			if (address) {
				setWalletAccount(ethers.utils.getAddress(address[0]));
				UserService.setCurrentUser(address[0]);
				setToggleActivePopup(false);
			} else {
				const signer = providerEthers.getSigner();
				const signature = await signer.signMessage("Please sign this transaction");
				if (address && signature) {
					setWalletAccount(ethers.utils.getAddress(address[0]));
					UserService.setCurrentUser(address[0]);
					setToggleActivePopup(false);
				}
			}
			if (!chainIdIsSupported) {
				await changeNetwork(provider)
			}
		}

	}

	return <Wrap>
		<BoxConnect>
			<Title themeLight={!darkMode}>Feel lucky today?</Title>
			<div style={{ marginBottom: '35px' }}><img width={144} src="assets/icons/head.svg" /></div>
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
	...TEXT_STYLE(24, 500, props.themeLight ? '#181536' : '#FFFFFF'),
	textTransform: 'uppercase',
	marginBottom: 24,
	'@media (min-width: 800px)': {
		marginBottom: 40
	}
}))
