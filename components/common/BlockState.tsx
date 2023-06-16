import { Box, Button, Snackbar, Stack, Typography, styled } from '@mui/material'
import MyImage from 'components/ui/image'
import React, { useEffect, useState } from 'react'
import { CloseSquareIcon2 } from 'utils/Icons'
import { AvatarImage } from 'utils/Images'
import { MessageType } from './Chat'
import { Convert } from 'utils/convert'
import { useQuery } from '@tanstack/react-query'
import { DeoddService } from 'libs/apis'
import { stringify } from 'querystring'
import { getPathAvatar } from 'utils/checkAvatar'

type Props = {
    blockStateProp: enumBlockState,
    messageSelected: MessageType,
    setIsStartBlock: Function,
    onBlockUser: Function,
    onUnBlockUser: Function
}
export enum enumBlockState {
    Block,
    BlockSuccess,
    BlockList
}
function BlockState({ messageSelected, blockStateProp, setIsStartBlock, onBlockUser, onUnBlockUser }: Props) {
    const [blockState, setBlockState] = useState<enumBlockState | undefined>(blockStateProp);
    const [listUserBlock, setListUserBlock] = useState<{
        blockedUserInfo: {
            avatarId: number | undefined,
            userName: string | undefined,
        },
        blocked_user: string,
        created_by: string,
        id: string,
        is_deleted: boolean,
    }[]>([])

    const { refetch: getBlockList } = useQuery({
        queryKey: ["getBlockList"],
        enabled: false,
        retry: false,
        queryFn: () => DeoddService.getBlockList({ page: 1, size: 15 }),
        onSuccess(data) {
            if (data && data.data) {
                setListUserBlock(data.data);
                setBlockState(enumBlockState.BlockList);
            }
        },
        select: (data: any) => {
            if (data.status === 200) {
                return data.data;
            } else {
                return undefined
            }
        },
    });

    useEffect(() => {
        if (blockStateProp === enumBlockState.BlockList) {
            getBlockList();
        }
    }, [blockStateProp, getBlockList])
    const handleClose = () => {
        setBlockState(undefined);
        setIsStartBlock(false)
    }
    const handleBlock = async () => {
        const result = await onBlockUser();
        if (result.data.data) {
            setBlockState(enumBlockState.BlockSuccess)
        }
    }
    const handleUnBlock = async (wallet: string) => {
        await onUnBlockUser(wallet);
        getBlockList();
    }
    const hanleViewBlockList = () => {
        getBlockList();
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={blockState === enumBlockState.Block}
                onClose={handleClose}
            >
                <Wrapper>
                    <Typography variant="body1">Block <Typography component="span" fontSize="inherit" color='secondary.main'>{messageSelected.userInfo.userName || Convert.convertWalletAddress(messageSelected.from, 4, 5)}</Typography> ?</Typography>
                    <Stack direction={'row'} mt={1.5} gap={2}>

                        <Button onClick={handleBlock} variant='text' sx={{
                            flex: 1, bgcolor: 'secondary.900', py: 1, fontSize: 14, textTransform: 'none', color: 'dark.60', '&:hover': {
                                bgcolor: 'secondary.800'
                            }
                        }}>Block</Button>

                        <Button onClick={handleClose} variant='text' sx={{
                            flex: 1, bgcolor: 'secondary.900', py: 1, fontSize: 14, textTransform: 'none', color: 'dark.60', '&:hover': {
                                bgcolor: 'secondary.800'
                            }
                        }}>Cancel</Button>
                    </Stack>
                </Wrapper>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={blockState === enumBlockState.BlockSuccess}
                onClose={handleClose}
            >
                <Wrapper>
                    <Typography variant="body1"> <Typography component="span" fontSize="inherit" color='secondary.main'>{messageSelected.userInfo.userName || Convert.convertWalletAddress(messageSelected.from, 4, 5)}</Typography> Blocked</Typography>
                    <Stack mt={2} gap={1}>

                        <Button variant='text' onClick={() => hanleViewBlockList()} sx={{
                            flex: 1, bgcolor: 'secondary.900', py: 1, fontSize: 14, textTransform: 'none', color: 'dark.60', '&:hover': {
                                bgcolor: 'secondary.800'
                            }
                        }}>View block list</Button>

                        <Button variant='text' onClick={handleClose} sx={{
                            flex: 1, bgcolor: 'secondary.900', py: 1, fontSize: 14, textTransform: 'none', color: 'dark.60', '&:hover': {
                                bgcolor: 'secondary.800'
                            }
                        }}>Close</Button>
                    </Stack>
                </Wrapper>
            </Snackbar >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={blockState === enumBlockState.BlockList}
                onClose={handleClose}
            >
                <Wrapper>
                    <Box sx={{ cursor: 'pointer' }} onClick={handleClose} position={'absolute'} top={'16px'} right={'16px'} lineHeight={0}>
                        <CloseSquareIcon2 width="24px" />
                    </Box>
                    <Typography variant="body1">Blocked Users</Typography>
                    <Stack mt={2} gap={2}>
                        {
                            listUserBlock && listUserBlock.length > 0 ? listUserBlock.map((userBlock) =>
                                <Stack key={userBlock.id} direction={'row'} alignItems={'center'} >
                                    <MyImage width={24} height={24} src={getPathAvatar(userBlock.blockedUserInfo.avatarId)} alt='avatar' />
                                    <Typography ml={1} variant='body2' fontWeight={500} color={'white'}>{userBlock.blockedUserInfo.userName || Convert.convertWalletAddress(userBlock.blocked_user, 4, 5)}</Typography>
                                    <Typography ml="auto" onClick={() => handleUnBlock(userBlock.blocked_user)} sx={{ cursor: 'pointer', transition: '.3s all', '&:hover': { color: 'secondary.main' } }} variant='caption' color={'dark.60'}>Unblock</Typography>
                                </Stack>
                            )
                                : <Typography variant='body2' color={'dark.60'} textAlign={'center'}>Empty</Typography>
                        }
                    </Stack>
                </Wrapper>
            </Snackbar>

        </>
    )
}

export default BlockState

const Wrapper = styled(Box)(({ theme }) => {
    return {
        backgroundColor: (theme.palette.primary as any)['100'],
        minWidth: 260,
        padding: theme.spacing(2),
        border: '1px solid',
        borderColor: theme.palette.secondary.main,
        borderRadius: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)'
    }
})