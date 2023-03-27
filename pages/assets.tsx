import { Box, Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import { ButtonMain } from '../components/ui/button'
import { ArrowDownIcon, ArrowUpIcon, BnbIcon, BnbUsdIcon } from '../utils/Icons'
import { BronzeImage } from '../utils/Images'

type Props = {}

function assets({ }: Props) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>
                    <Typography variant='h2' textTransform={'uppercase'}>
                        Assets
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Stack direction="row" mt={3} columnGap={4}>
                    <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
                        <Stack direction={'row'} alignItems={"flex-end"} justifyContent={'space-between'}>
                            <Typography variant='h2' textTransform={'uppercase'}>
                                Assets
                            </Typography>
                            <Typography variant='body2' color={"secondary.100"}>
                                History
                            </Typography>
                        </Stack>
                        <Stack mt={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                            <Typography variant='body2'>
                                TOSSPOINT
                            </Typography>
                            <Typography variant='h2' color={"secondary.100"}>
                                9,500
                            </Typography>
                        </Stack>
                        <Stack mt={2} direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                            <Typography variant='body2'>
                                TOKEN
                            </Typography>
                            <Box textAlign={"end"}>
                                <Typography variant='h2' color={"secondary"}>
                                    9,500
                                    <Box display={"inline"} ml={0.5}>
                                        <BnbIcon />
                                    </Box>
                                </Typography>
                                <Stack direction={'row'} justifyContent={"flex-end"} alignItems={"center"}>
                                    <Typography mt={1} variant='body2' color={"secondary.100"}>
                                        ~2,745
                                    </Typography>
                                    <Box mt={1} ml={0.5}>
                                        <BnbUsdIcon />
                                    </Box>
                                </Stack>
                                <ButtonMain active={true} title="CLAIM" onClick={() => { }} customStyle={{
                                    width: 75, padding: "4px 16px", mt: 1
                                }} />

                            </Box>
                        </Stack>
                        <Stack mt={2} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                            <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
                                <Typography variant='body2'>
                                    NFT DEODD CARD
                                </Typography>
                                <Typography variant='h2' color={"secondary.100"}>
                                    9,500
                                </Typography>
                            </Stack>
                            <ListCus sx={{ border: "none" }}>
                                <ListItemButton onClick={handleClick}>
                                    {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
                                    <Stack ml={1} direction={"row"} alignItems={"center"}><img width={30} src={BronzeImage} alt="" /> <Typography color={"text.primary"} ml={1} variant='body2' textTransform={"uppercase"}>bronze nft card</Typography> </Stack>
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                <BnbIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Starred" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </ListCus>
                            <Box textAlign={"end"}>
                                <ButtonMain active={true} title="CLAIM" onClick={() => { }} customStyle={{
                                    width: 75, padding: "4px 16px", mt: 1
                                }} />


                            </Box>

                        </Stack>
                    </Box>
                    <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
                        <Stack direction={'row'} alignItems={"flex-end"} justifyContent={'space-between'}>
                            <Typography component={'span'} variant='h2' textTransform={'uppercase'}>
                                Wallet
                                <Typography component={"span"} variant='caption'>(3535***3534)</Typography>
                            </Typography>
                            <Typography variant='body2' color={"secondary.100"}>
                                History
                            </Typography>
                        </Stack>

                        <Stack mt={2} direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                            <Typography variant='body2'>
                                TOKEN
                            </Typography>
                            <Box textAlign={"end"}>
                                <Typography variant='h2' color={"secondary"}>
                                    9,500
                                    <Box display={"inline"} ml={0.5}>
                                        <BnbIcon />
                                    </Box>
                                </Typography>
                                <Stack direction={'row'} justifyContent={"flex-end"} alignItems={"center"}>
                                    <Typography mt={1} variant='body2' color={"secondary.100"}>
                                        ~2,745
                                    </Typography>
                                    <Box mt={1} ml={0.5}>
                                        <BnbUsdIcon />
                                    </Box>
                                </Stack>
                                <ButtonMain active={true} title="CLAIM" onClick={() => { }} customStyle={{
                                    width: 75, padding: "4px 16px", mt: 1
                                }} />

                            </Box>
                        </Stack>

                    </Box>
                </Stack>
            </Container>
        </div>
    )
}
const ListCus = styled(List)({
    root: {
        border: "none"
    }
})
export default assets