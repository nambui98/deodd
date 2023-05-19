import { Utils } from '@/utils/index'
import { Avatar, Box, Button, Divider, IconButton, InputAdornment, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ButtonLoading } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { DOWNSTREAM_MESSAGE } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import { useWalletContext } from 'contexts/WalletContext'
import { LocalStorage } from 'libs/LocalStorage'
import { DeoddService } from 'libs/apis'
import { MessageCommand } from 'libs/types'
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { ArrowDown2Icon, ArrowLeft2Icon, ChatBoxIcon, CloseSquareIcon, MoreSquareIcon, SendIcon, UndoIcon, WarningIcon } from 'utils/Icons'
import { Convert } from 'utils/convert'
import { Format } from 'utils/format'
type MessageType = {
    userInfo: {
        userName: string | undefined,
        avatarId: number | undefined,
    },
    content: string,
    created_at: string,
    from: string,
    id: string,
    is_hidden: boolean,
    updated_at: string
}
function Chat({ open }: { open: boolean }) {
    const { walletIsConnected, handleConnectWallet, walletAddress } = useWalletContext();


    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null)
    const [isScrollBottom, setIsScrollBottom] = useState<boolean>(true);
    useQuery({
        queryKey: ["getMessages"],
        enabled: walletAddress !== null && walletAddress !== undefined,
        queryFn: () => DeoddService.getMessagesWithAuth({ limit: 10, lastCreatedAt: lastCreatedAt }),
        onSuccess(data) {
            if (data && data.data) {
                if (lastCreatedAt === null) {
                    setMessages([])
                }
                if (lastCreatedAt !== data.data[data.data.length - 1].createdAt) {
                    setMessages((prev) => ([...prev, ...data.data]))
                    setLastCreatedAt(data.data[data.data.length - 1].createdAt);
                }
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

    //get messages without auth
    useQuery({
        queryKey: ["getMessagesWithoutAuth"],
        enabled: walletAddress === null || walletAddress === undefined,
        queryFn: () => DeoddService.getMessagesWithoutAuth(),
        onSuccess(data) {
            if (data && data.data) {
                setMessages(data.data)
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
    const didUnmount = useRef(false);
    const { sendJsonMessage, lastMessage, readyState } = useWebSocket('ws://deodd.io/degateway/connect/websocket',
        {
            onMessage: async (event) => {
                const dataMessage = await getDataFromBlob(event.data)
                if (dataMessage.message === DOWNSTREAM_MESSAGE) {
                    if (dataMessage.data.data.data.command === MessageCommand.NEW_MESSAGE) {
                        setMessages((prev) => [dataMessage.data.data.data.data, ...prev])
                    }
                }
            },
            reconnectInterval: 59000,
            shouldReconnect: (closeEvent) => {
                return didUnmount.current === false;
            },
        },
    );

    useEffect(() => {
        return () => {
            didUnmount.current = true;
        };
    }, []);
    useEffect(() => {
        if (walletIsConnected) {
            const message: any = [2, { "accessToken": LocalStorage.getAccessToken() }];
            sendJsonMessage(message);
        }
    }, [walletIsConnected, sendJsonMessage])

    const getDataFromBlob = async (data: Blob) => {
        const text = await new Response(data).text()
        const parseJson = JSON.parse(text);
        const result = {
            message: parseJson[0][0],
            data: parseJson[0][1]
        }
        return result;
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(messages);

    const id = Boolean(anchorEl) ? 'simple-popover' : undefined;
    const refContainerChat = useRef<HTMLDivElement>(null);
    const handleScrollToBottom = () => {
        refContainerChat.current?.scrollIntoView({ behavior: "smooth" })
    };
    useEffect(() => {
        if (refContainerChat.current && open) {
            setTimeout(() => {
                handleScrollToBottom();
            }, 1000);
        }
    }, [refContainerChat, open])
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    // console.log(refContainerChat.current?.scrollHeight - refContainerChat.current?.scrollTop);
    const handleScroll = (e: any) => {
        const bottom = e.target.scrollTop > -50;
        console.log(e.target.scrollTop);

        if (bottom) {
            setIsScrollBottom(true);
            console.log("bottom")
        } else {
            setIsScrollBottom(false);
        }
    }
    return (
        <Box position={'relative'} overflow={'hidden'} >
            <Box bgcolor={'primary.200'} zIndex={1} position={'sticky'} top={0} right={0} left={0}>
                <Stack height={72} justifyContent={'center'} direction={'row'} alignItems={'center'} columnGap={2}>
                    <ChatBoxIcon />
                    <Typography variant='h3' fontWeight={600}>Chat Box</Typography>
                </Stack>
            </Box>
            <Divider />
            {
                process.env.NEXT_PUBLIC_RELEASE_EARLY && JSON.parse(process.env.NEXT_PUBLIC_RELEASE_EARLY) ?
                    <Stack
                        height={{ xs: 'calc(100vh - 208px)', md: 'calc(100vh - 143px)' }}
                        justifyContent={'center'} alignItems={'center'}
                        overflow={'hidden'}
                    >
                        <Typography variant='h3' fontWeight={600}>
                            Welcome to DeODD!
                        </Typography>
                        <Typography mt={'10px'} variant='body2' fontWeight={400} color="dark.60">
                            Coming soon
                        </Typography>
                    </Stack> :
                    <Box
                        height={{ xs: 'calc(100vh - 208px)', md: 'calc(100vh - 143px)' }}
                        display={'flex'}
                        flexDirection={'column-reverse'}
                        onScroll={handleScroll}
                        p={2} overflow={'auto'} sx={{ transition: open ? '3s opacity' : "", opacity: open ? 1 : 0 }} >
                        <Box
                            ref={refContainerChat}
                        />
                        {
                            messages.map((message) => {
                                return <ChatItem key={message.id} data={message} handleClick={handleClick} id={message.id} isMy={message.from === walletAddress} />
                            })
                        }
                    </Box>
            }
            <Box bgcolor={'primary.200'} zIndex={1} position={'sticky'} bottom={0} right={0} left={0}>
                <Stack direction={'row'} p={2} height={70} alignItems={'center'} width={1} columnGap={2}>
                    {
                        walletIsConnected ?
                            <SendMessage disabled={readyState !== ReadyState.OPEN} walletAddress={walletAddress} />
                            : <ButtonLoading
                                onClick={handleConnectWallet}

                                sx={{
                                    py: 1,
                                    borderRadius: 2,
                                    width: '100%'
                                }}
                                loading={false}>
                                <Typography variant='body2' fontWeight={600} textTransform={'uppercase'}>Connect wallet to chat</Typography>
                            </ButtonLoading>
                    }
                </Stack>
                {
                    !isScrollBottom &&
                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleScrollToBottom()
                        }}
                        sx={{
                            position: 'absolute',
                            bottom: 77,
                            right: 8,
                            borderRadius: "100%",
                            p: 1,
                            minWidth: 0,
                            border: "1px solid ",
                            borderColor: "secondary.main",
                            boxShadow: "0px 2px 16px rgba(254, 241, 86, 0.5)",
                            bgcolor: "primary.200",
                            '&:hover': {
                                bgcolor: 'transparent',
                                border: '1px solid',
                                borderColor: 'secondary.main',
                            }
                        }}
                    >
                        <ArrowDown2Icon />
                    </Button>
                }
            </Box>
            <PopoverItem id={id} anchorEl={anchorEl} handleClose={handleClose} />
        </Box>
    )
}

export default Chat
const SendMessage = ({ disabled, walletAddress }: { disabled: boolean, walletAddress: string }) => {
    const { setIsError, setTitleError } = useSiteContext();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        sendMessage.mutate(data.content);
    }
    const sendMessage = useMutation({
        mutationFn: (content: string) => {
            return DeoddService.sendMessage({ from: walletAddress, content: content })
        },
        onError(error: any, variables, context) {
            setIsError(true)
            setTitleError(error.response.data.meta.error_message)
        },
        onSuccess(data, variables, context) {
            reset();
        },
    });

    const handleOnKeydown = (e: any) => {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)()
        }
    }
    return <Box component={'form'} sx={{ width: 1 }} onSubmit={handleSubmit(onSubmit)}>
        <InputBase
            {...register("content", { required: true, maxLength: 200 })}
            onKeyDown={(e) => handleOnKeydown(e)}
            sx={{ width: '100%', fontSize: 14, px: 1, color: 'white', fontWeight: 400 }}
            placeholder='Type your messsages'
            multiline
            maxRows={3}
            endAdornment={
                <InputAdornment position="end" sx={{ pr: 2 }}>
                    <IconButton
                        aria-label="toggle password visibility"
                        type='submit'
                        disabled={disabled}
                        edge="end"
                    >
                        <SendIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    </Box>

}
const PopoverItem = ({ id, anchorEl, handleClose }: {
    id?: string,
    anchorEl: HTMLButtonElement | null,
    handleClose: VoidFunction
}) => {
    const [isShowReport, setIsShowReport] = useState<boolean>(false);
    const reportRef = useRef<HTMLDivElement>(null);
    const initRef = useRef<HTMLDivElement>(null);
    const nodeRef = isShowReport ? reportRef : initRef;
    const data = [
        {
            icon: <UndoIcon />,
            title: 'Reply',
            onClick: () => {

                // setActiveStep(1);
                setIsShowReport((prev) => !prev);
            }
        },
        {
            icon: <WarningIcon />,
            title: 'Report message',
            onClick: () => { }
        },
        {
            icon: <CloseSquareIcon />,
            title: 'Block user',

            onClick: () => { }
        },
    ]
    const dataReport = [
        {
            title: 'Spam',

            onClick: () => { }
        },
        {
            title: 'Violence',

            onClick: () => { }
        }, {
            title: 'Pornography',

            onClick: () => { }
        }, {
            title: 'Child abuse',

            onClick: () => { }
        }, {
            title: 'Political distortion',

            onClick: () => { }
        }, {
            title: 'Copyright',

            onClick: () => { }
        }, {
            title: 'Others',

            onClick: () => { }
        },
    ]
    return <Popover
        id={id}
        open={Boolean(anchorEl)}
        disableScrollLock
        anchorEl={anchorEl}
        onClose={handleClose}
        disableRestoreFocus
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        sx={{
            '.MuiPopover-paper': {
                backgroundImage: 'none',
                border: '1px solid #3F4251',
                borderRadius: 1.5,
            }
        }}
    >
        {/* <SwitchTransition mode={'out-in'}>
            <CSSTransition
                key={isShowReport + "container"}
                nodeRef={nodeRef}
                addEndListener={(done: any) => {
                    nodeRef?.current?.addEventListener("transitionend", done, false);
                }}
                classNames="fade"
            > */}
        <div ref={nodeRef} className="button-container">
            <Box className='container'>
                {
                    !isShowReport ?
                        <List sx={{
                            py: 1,
                            '.MuiListItemButton-root': {
                                py: 1,
                                px: 2,
                            },
                            '.MuiListItemText-root span': {
                                fontSize: 14,
                                fontWeight: 400
                            }
                        }}>
                            {
                                data.map((item, index) =>
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton onClick={item.onClick}>
                                            <ListItemIcon sx={{ minWidth: "36px", }}>
                                                {
                                                    item.icon
                                                }
                                            </ListItemIcon>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }
                        </List> :
                        <List sx={{
                            py: 1,
                            '.MuiListItemButton-root': {
                                py: 1,
                                px: 2,
                            },
                            '.MuiListItemText-root span': {
                                fontSize: 14,
                                fontWeight: 400
                            }
                        }}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => setIsShowReport(false)}>
                                    <ListItemIcon sx={{ minWidth: "36px", }}>
                                        <ArrowLeft2Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Back'} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => setIsShowReport(false)}>
                                    <ListItemText primary={<Typography color='secondary.100' fontWeight={400} variant='body2'>Report as...</Typography>} />
                                </ListItemButton>
                            </ListItem>
                            {
                                dataReport.map((item, index) =>
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton onClick={item.onClick}>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>

                                )
                            }

                        </List>
                }


            </Box>
        </div>
        {/* </CSSTransition>
        </SwitchTransition> */}

    </Popover >

}

const ChatItem = ({ isMy, isReport, id, data, handleClick }: { isReport?: boolean, data: MessageType, isMy?: boolean, id: string | undefined, handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
    if (isReport) {
        return <Box bgcolor={'background.paper'} position={'relative'} boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.15)"} border={'1px solid'} borderColor={'secondary.300'} textAlign={'center'} borderRadius={2} px={2} pt={2} pb={1} mb={1}>
            <Typography variant='body2' color="secondary.100" fontWeight={400}>Message reported and hidden</Typography>
            <Button variant="text" sx={{ border: 'none', '&:hover': { border: 'none', backgroundColor: 'secondary.300' } }} color={'secondary'}>Undo</Button>
        </Box>
    }
    return <Box bgcolor={'primary.300'} position={'relative'} border={'1px solid'} borderColor={'secondary.300'} borderRadius={2} px={2} py={1} mb={1} sx={{
        cursor: 'pointer',
        transition: '.3s all',
        '.more': {
            opacity: 0,
            transition: '.3s all'
        },
        '&:hover': {
            bgcolor: 'background.paper',
            '.more': {
                opacity: 1
            }
        }
    }}>

        <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Avatar sx={{ width: 24, height: 24 }} alt={data.userInfo.userName} src={Utils.getPathAvatar(data.userInfo.avatarId ?? 0)} />
            <Typography variant='body2' fontWeight={500} >{data.userInfo.userName ?? Convert.convertWalletAddress(data.from, 4, 5)}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'baseLine'} gap={1} mt={.5}>
            <Typography variant='body2' fontWeight={400} color={'secondary.700'} fontSize={10}>{Format.formatDateTime(data.updated_at, 'HH:mm')}</Typography>
            <Typography whiteSpace={'normal'} flexGrow={1} variant='body2' fontWeight={500} color="secondary.100"> {data.content}</Typography>
        </Stack>
        <Box position="absolute" className="more" sx={{ top: 0, right: 0 }}>
            <IconButton aria-describedby={id} onClick={handleClick} aria-label="delete">
                <MoreSquareIcon />
            </IconButton>
        </Box>
    </Box>
}