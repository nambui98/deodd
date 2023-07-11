import { Utils } from '@/utils/index'
import { ClickAwayListener } from '@mui/base'
import { Avatar, Box, Button, Divider, IconButton, InputAdornment, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Popper, Stack, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ButtonLoading } from 'components/ui/button'
import { DOWNSTREAM_MESSAGE, DateOpenMainnet, JOINED } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import { useWalletContext } from 'contexts/WalletContext'
import EmojiPicker from 'emoji-picker-react'
import { LocalStorage } from 'libs/LocalStorage'
import { DeoddService } from 'libs/apis'
import { MessageCommand } from 'libs/types'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { ArrowDown2Icon, ArrowLeft2Icon, ChatBoxIcon, CloseSquareIcon, EmojiIcon, MoreIcon, MoreSquareIcon, SendIcon, UndoIcon, WarningIcon } from 'utils/Icons'
import { Convert } from 'utils/convert'
import { Format } from 'utils/format'
import BlockState, { enumBlockState } from './BlockState'
import CoinAnimation from './CoinAnimation'
import { isAfter, isBefore, isEqual } from 'date-fns'
import { useRouter } from 'next/router'

export type MessageType = {
    userInfo: {
        userName: string | undefined,
        avatarId: number | undefined,
    },
    repliedUserInfo: {
        avatarId: number | undefined,
        userName: string | undefined,
    } | undefined,
    content: string,
    created_at: string,
    from: string,
    to: string,
    id: string,
    is_hidden: boolean,
    updated_at: string,
    replied_content: string,
    replied_to: string
}
type UserTyping = {
    walletAddress: string | undefined,
    userName: string | undefined
}
function Chat({ open }: { open: boolean }) {
    const { walletIsConnected, handleConnectWallet, walletAddress, userInfo } = useWalletContext();
    const [anchorElOptionMore, setAnchorOptionMore] = useState<HTMLButtonElement | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null)
    const [isScrollBottom, setIsScrollBottom] = useState<boolean>(true);
    const { setIsError, setTitleError } = useSiteContext();
    const [usersTyping, setUsersTyping] = useState<UserTyping[]>([]);
    const [replyUser, setReplyUser] = useState<{ wallet: string, username: string, repliedTo: string } | undefined>();
    const [messageSelected, setMessageSelected] = useState<MessageType | undefined>()
    const [isStartBlock, setIsStartBlock] = useState<boolean>(false);
    const [blockState, setBlockState] = useState<enumBlockState>(enumBlockState.BlockList);

    const isNotMainnetOpen = isBefore(new Date(), new Date(DateOpenMainnet))
    const [isHasNewMessage, setIsHasNewMessage] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const [isPing, setIsPing] = useState(false);
    const { refetch: getMessages, isFetching: isFetchingMessages } = useQuery({
        queryKey: ["getMessages", walletAddress],
        enabled: !!walletAddress,
        queryFn: () => DeoddService.getMessagesWithAuth({ limit: 15, lastCreatedAt: lastCreatedAt }),
        onSuccess(data) {
            if (data && data.data) {
                if (lastCreatedAt === null) {
                    setMessages([])
                }
                if (lastCreatedAt !== data.data[data.data.length - 1]?.created_at && data.data.length > 0) {
                    if (lastCreatedAt === null) {
                        setMessages(data.data);
                    } else {
                        setMessages((prev) => ([...prev, ...data.data]))
                    }
                    setLastCreatedAt(data.data[data.data.length - 1]?.created_at || null);
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

    const {
        // refetch: getMessagesWithoutAuth, 
        isFetching: isFetchingMessageWithoutAuth } = useQuery({
            queryKey: ["getMessagesWithoutAuth", walletAddress],
            enabled: walletAddress === undefined || walletAddress === "" || walletAddress === null,
            retry: false,
            queryFn: () => DeoddService.getMessagesWithoutAuth(false),
            onSuccess(data) {
                if (data && data.data) {
                    setMessages(data.data)
                }
            },
            onError(err: any) {
                // setIsLoadMoreWithoutAuth(false);
                // setIsError(true)
                // setTitleError(err.response?.data?.meta.error_message)
            },
            select: (data: any) => {
                if (data.status === 200) {
                    return data.data;
                } else {
                    return undefined
                }
            },
        });
    const router = useRouter();
    const { sendJsonMessage, readyState, } = useWebSocket(process.env.NEXT_PUBLIC_URL_WEBSOCKET ?? '',
        {
            onMessage: async (event) => {

                // debugger
                const dataMessage = await getDataFromBlob(event.data)
                console.log("🚀 ~ file: Chat.tsx:121 ~ onMessage: ~ dataMessage:", dataMessage)
                console.log("🚀 ~ file: Chat.tsx:121 ~ onMessage: ~ dataMessage:", Object.keys(dataMessage ?? {}))

                if (dataMessage !== null) {
                    if (dataMessage[JOINED]) {
                        console.log("888888888888888888888888");
                        debugger
                        // pingSocket();
                        setIsPing(true);
                        // queryClient.getQueryCache().gt
                    }
                    if (dataMessage[DOWNSTREAM_MESSAGE]) {
                        if (dataMessage[DOWNSTREAM_MESSAGE].data.command === MessageCommand.NEW_MESSAGE) {
                            setIsHasNewMessage(!isScrollBottom);
                            setMessages((prev) => [dataMessage[DOWNSTREAM_MESSAGE].data.data, ...prev])
                        }
                    }
                    if (dataMessage[MessageCommand.USERS_TYPING]) {
                        const filterTyping = (dataMessage[MessageCommand.USERS_TYPING]?.usersTyping as UserTyping[]).filter(user => user.walletAddress?.toUpperCase() !== walletAddress.toUpperCase());
                        setUsersTyping(filterTyping);
                    }
                }
            },
            onOpen(event) {
            },
            retryOnError: true,
            onClose(event) {
                console.log("🚀 ~ file: Chat.tsx:134 ~ onClose ~ event:", event)
                setIsPing(false);
            },
            // reconnectInterval: 5000,
            // shouldReconnect: () => true
        },
    );

    //interval ping connect socket
    const { refetch: pingSocket } = useQuery({
        queryKey: ["pingSocket", walletAddress],
        enabled: isPing,
        retry: false,
        queryFn: () => sendPingSocket(),
        refetchIntervalInBackground: true,
        // refetchIntervalInBackground: 55000,
        refetchInterval: 55000
    });
    const joinChat = useQuery({
        queryKey: ["joinChat", walletAddress],
        enabled: !!walletAddress && readyState === ReadyState.OPEN,
        // retry: true,
        refetchOnWindowFocus: false,
        queryFn: () => sendJoinChat(),
        onError: async (err: any) => {
            debugger
            // router.reload();
            // const response = await DeoddService.refreshToken();
            // const { accessToken } = response.data.data;
            // LocalStorage.setAccessToken(accessToken);
            // setIsLoadMoreWithoutAuth(false);
            // setIsError(true)
            // setTitleError(err.response?.data?.meta.error_message)
        }
    });

    const sendPingSocket = () => {
        const message: any = [0, {}];
        console.log("888888888888888888888888pingSocket");

        sendJsonMessage(message);
        return true;
    }

    const sendJoinChat = () => {
        console.log("🚀 ~ file: Chat.tsx:194 ~ sendJoinChat ~ readyState:", readyState)
        const message: any = [2, { "accessToken": LocalStorage.getAccessToken() }];
        sendJsonMessage(message);
        return true;
    }

    const getDataFromBlob = async (data: Blob) => {
        const text = await new Response(data).text()
        const parseJson = JSON.parse(text);
        if (parseInt(parseJson[0][0]) !== 1) {
            let result: { [key: number]: any } = {};
            for (let index = 0; index < parseJson.length; index++) {
                const element: any = parseJson[index];
                result[parseInt(element[0])] = element[1]!.data ?? element[1];
            }
            return result;
        }
        return null;
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, user: MessageType) => {
        setAnchorOptionMore(event.currentTarget);
        setMessageSelected(user);
    };

    const handleClose = () => {
        setAnchorOptionMore(null);
    };


    const id = Boolean(anchorElOptionMore) ? 'pop-up-option-more' : undefined;
    const refBottomChat = useRef<HTMLDivElement>(null);
    const handleScrollToBottom = () => {
        refBottomChat.current?.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
        if (refBottomChat.current && open) {
            setTimeout(() => {
                handleScrollToBottom();
            }, 1000);
        }
    }, [refBottomChat, open])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    console.log('status chat: ', connectionStatus);

    const handleScroll = (e: any) => {
        const bottom = e.target.scrollTop > -80;
        if (bottom) {
            setIsScrollBottom(true);
            setIsHasNewMessage(false);
        } else {
            setIsScrollBottom(false);
        }
    }
    const [refTopChat, inView] = useInView();
    useEffect(() => {
        if (inView) {
            if (walletAddress) {
                getMessages()
            }
        }
    }, [inView, walletAddress, getMessages])

    //
    const handleReplyUser = () => {
        setReplyUser({ wallet: messageSelected?.from || '', repliedTo: messageSelected?.id || '', username: messageSelected?.userInfo.userName || '' });
    }

    // hanlde reporting 
    const report = useMutation({
        mutationFn: (typeReport: string) => {
            return DeoddService.reportMessage({ messageId: messageSelected!.id, type: typeReport })
        },
        onError(error: any, variables, context) {
            setIsError(true)
            setTitleError(error.response.data.meta.error_message)
        },
        onSuccess(data, variables, context) {
            setLastCreatedAt(null);
            setTimeout(() => {
                getMessages();
            }, 10);
        },
    });
    const undoReport = useMutation({
        mutationFn: (id: string) => {
            return DeoddService.undoReportMessage({ messageId: id })
        },
        onError(error: any, variables, context) {
            setIsError(true)
            setTitleError(error.response.data.meta.error_message)
        },
        onSuccess(data, variables, context) {
            setLastCreatedAt(null);
            setTimeout(() => {
                getMessages();
            }, 10);
        },
    });

    const handleReport = (typeReport: string) => {
        report.mutate(typeReport);
    }
    const handleUndoReport = (id: string) => {
        undoReport.mutate(id);
    }
    //handle block
    const handleBlock = () => {
        setIsStartBlock(true);
        setBlockState(enumBlockState.Block)
        setAnchorOptionMore(null)
    }

    //typing
    const sendMessageTyping = () => {
        if (walletIsConnected) {
            const message: any = [
                9,
                {
                    "data": {
                        usersTyping: [
                            ...usersTyping,
                            {
                                walletAddress,
                                userName: userInfo.username || Convert.convertWalletAddress(walletAddress, 4, 5),
                            }
                        ]
                    }
                }
            ];
            sendJsonMessage(message);
        }
    }
    const sendMessageCancelTyping = () => {
        const message: any = [
            9,
            {
                "data": {
                    usersTyping: [...usersTyping.filter((user) => user.walletAddress !== walletAddress)]
                }
            }
        ];
        sendJsonMessage(message);
    }

    let textTyping = usersTyping.length === 1 ? usersTyping[0].userName + ' is typing' : usersTyping.length === 2 ? `${usersTyping[0].userName} and ${usersTyping[1].userName} are typing` : usersTyping.length > 2 ? 'some users are typing' : ''
    //handle block
    const blockUser = useMutation({
        mutationFn: () => {
            return DeoddService.blockUser({ wallet: messageSelected!.from })
        },
        onError(error: any, variables, context) {
            setIsError(true)
            setTitleError(error.response.data.meta.error_message)
        },
        onSuccess(data, variables, context) {
            setLastCreatedAt(null);
            setTimeout(() => {
                getMessages();
            }, 10);
        },
    });
    const unBlockUser = useMutation({
        mutationFn: (wallet: string) => {
            return DeoddService.unBlockUser({ wallet })
        },
        onError(error: any, variables, context) {
            setIsError(true)
            setTitleError(error.response.data.meta.error_message)
        },
        onSuccess(data, variables, context) {
            setLastCreatedAt(null);
            setTimeout(() => {
                getMessages();
            }, 10);
        },
    });
    let indexEndedOnSameDay: number | null;

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
                isNotMainnetOpen ?
                    <Typography fontWeight={600} textAlign={'center'} fontSize={24} mt={2}>Coming soon</Typography>
                    :
                    <>
                        <Box
                            height={{ xs: 'calc(100vh - 208px)', md: 'calc(100vh - 143px)' }}
                            display={'flex'}
                            flexDirection={'column-reverse'}
                            onScroll={handleScroll}
                            p={2} overflow={'auto'} sx={{ transition: open ? '3s opacity' : "", opacity: open ? 1 : 0 }} >
                            <Box ref={refBottomChat} />
                            {
                                messages.map((message, index) => {
                                    let currentDate = new Date();
                                    currentDate.setHours(0, 0, 0, 0);

                                    let dateMessage = new Date(message.created_at);
                                    dateMessage.setHours(0, 0, 0, 0);

                                    let dateMessagePrev: Date = new Date(messages[index - 1]?.created_at ?? message.created_at);
                                    dateMessagePrev.setHours(0, 0, 0, 0);

                                    let isToday = false;
                                    const isSameDay = isEqual(dateMessage, dateMessagePrev);
                                    let isYesterday = false;
                                    if (!isSameDay) {
                                        indexEndedOnSameDay = index - 1;
                                        isToday = isEqual(currentDate, dateMessagePrev);

                                        isYesterday = isEqual(currentDate.setDate(currentDate.getDate() - 1), dateMessagePrev);
                                    }
                                    return <Stack
                                        key={message.id}
                                        alignItems={'center'}
                                    >
                                        <Box width={1}>
                                            <ChatItem
                                                handleUndoReport={handleUndoReport}
                                                data={message}
                                                isReport={message.is_hidden}
                                                handleClick={(e) => handleClick(e, message)}
                                                id={message.id}
                                                isMy={message.from.toLowerCase() === walletAddress?.toLowerCase()}
                                            />
                                        </Box>
                                        {
                                            index - 1 === indexEndedOnSameDay && <Box display='inline-block' borderRadius={6} mb={1} px={1} py={.5} bgcolor={"background.paper"}>
                                                <Typography variant='caption' >{isToday ? 'Today' : isYesterday ? 'Yesterday' : Format.formatDateTimeAlt(dateMessagePrev, 'UTC', 'MMMM dd, yyyy')}</Typography>
                                            </Box>
                                        }
                                    </Stack>
                                })
                            }
                            {
                                <Box mb={2} height={30} display={isFetchingMessageWithoutAuth || isFetchingMessages ? 'block' : 'none'}>
                                    <CoinAnimation mx="auto" width={30} height={30} />
                                </Box>
                            }
                            <Box ref={refTopChat} />
                        </Box>
                        <Box bgcolor={'primary.200'} zIndex={1} position={'sticky'} bottom={0} right={0} left={0}>
                            <Stack direction={'row'} p={2} height={80} alignItems={'center'} width={1} columnGap={2}>
                                {
                                    walletIsConnected ?
                                        <Stack>
                                            <Box height={10}>
                                                <Typography variant='body2' fontWeight={400} color={'secondary.700'} fontSize={10}>{textTyping || ''}</Typography>
                                            </Box>
                                            <SendMessage setReplyUser={setReplyUser} replyUser={replyUser} sendMessageCancelTyping={sendMessageCancelTyping} sendMessageTyping={sendMessageTyping} disabled={readyState !== ReadyState.OPEN} walletAddress={walletAddress} />
                                        </Stack>
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
                                    {
                                        isHasNewMessage &&

                                        <Box width={12} height={12} bgcolor="#FF5870" borderRadius={'100%'} position={'absolute'} top={0} right={0} />
                                    }
                                </Button>
                            }
                        </Box>

                    </>
            }
            <PopoverItem
                handleReport={handleReport}
                handleBlock={handleBlock}
                handleViewBlockList={() => {
                    setBlockState(enumBlockState.BlockList)
                    setIsStartBlock(true);
                    setAnchorOptionMore(null)
                }}
                messageSelected={messageSelected!}
                id={id}
                anchorEl={anchorElOptionMore}
                handleClose={handleClose}
                setReplyUser={handleReplyUser} />
            {
                isStartBlock &&
                <BlockState
                    blockStateProp={blockState}
                    onBlockUser={() => blockUser.mutateAsync()}
                    onUnBlockUser={(wallet: string) => unBlockUser.mutateAsync(wallet)}
                    messageSelected={messageSelected!}
                    setIsStartBlock={setIsStartBlock} />
            }
        </Box >
    )
}

export default Chat

const SendMessage = ({ disabled, replyUser, setReplyUser, walletAddress, sendMessageTyping, sendMessageCancelTyping }: { disabled: boolean, setReplyUser: Function, replyUser: { wallet: string, username: string, repliedTo: string } | undefined, sendMessageCancelTyping: VoidFunction, sendMessageTyping: VoidFunction, walletAddress: string }) => {
    const { setIsError, setTitleError } = useSiteContext();
    const { register, handleSubmit, setValue: setContent, reset, watch, formState: { errors } } = useForm();
    const refInput = useRef(null);
    const [anchorElEmoji, setAnchorElEmoji] = useState<null | HTMLElement>(null);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [isShowReply, setIsShowReply] = useState<boolean>(true);
    const open = Boolean(anchorElEmoji);
    const id = open ? 'pop-up-emoji' : undefined;
    useEffect(() => {
        if (replyUser) {
            setContent('content',
                '@' + (replyUser?.username || Convert.convertWalletAddress(replyUser.wallet, 4, 5)) + " "
            );
            (refInput?.current as any).focus();
        }
    }, [replyUser, setContent])

    let reply = replyUser ? '@' + (replyUser?.username || Convert.convertWalletAddress(replyUser.wallet, 4, 5)) + " " : '';
    //remove reply when user remove
    useEffect(() => {
        if (replyUser) {
            if (watch('content').length < reply.length) {
                setContent('content', '');
                setReplyUser(undefined);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [replyUser, setContent, setReplyUser, watch('content')])

    //is ended typing
    const onSubmit = (data: any) => {
        sendMessage.mutate(data.content);
        setIsTyping(false);
        sendMessageCancelTyping();
    }
    const sendMessage = useMutation({
        mutationFn: (content: string) => {
            return DeoddService.sendMessage({ from: walletAddress, to: replyUser?.wallet, repliedTo: replyUser?.repliedTo, content: replyUser ? content.replace(reply, '') : content })
        },
        onError(error: any, variables, context) {
            setIsError(true)
            setTitleError(error.response.data.meta.error_message)
        },
        onSuccess(data, variables, context) {
            reset();
            setReplyUser(undefined);
        },
    });

    const handleOnKeydown = (e: any) => {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)()
        }
    }
    const handleEmoji = (emojiObject: any) => {
        const cursor = (refInput?.current as any).selectionStart;
        const content = watch('content');
        const text = content.slice(0, cursor) + emojiObject.emoji + content.slice(cursor);
        setContent('content', text);
    }
    useEffect(() => {
        function onTimeout() {
            setIsTyping(false);
            sendMessageCancelTyping();
        }
        let content = watch('content');
        if (content !== undefined && content !== null && content) {
            setIsTyping(true);
            const timeoutId = setTimeout(onTimeout, 5000);
            return () => {
                clearTimeout(timeoutId);
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('content')]);

    useEffect(() => {
        if (isTyping) {
            sendMessageTyping();
        }
    }, [isTyping, sendMessageTyping])

    return <Box component={'form'} sx={{ width: 1, position: 'relative' }} onSubmit={handleSubmit(onSubmit)}>
        <Box position={'relative'}>
            {
                replyUser && isShowReply &&
                <Box position={'absolute'} top={6} left={8} zIndex={1}><Typography color="secondary.main" fontSize={14}>@{replyUser?.username || Convert.convertWalletAddress(replyUser.wallet, 4, 5)} </Typography></Box>
            }
            <InputBase
                inputRef={refInput}
                inputProps={{
                    maxLength: 200,
                }}
                {...register("content", { required: true, maxLength: 200, validate: (value) => !!value.trim() })}
                onBlur={() => {
                    setIsTyping(false)
                    sendMessageCancelTyping();
                }}
                onKeyDown={(e) => handleOnKeydown(e)}
                onScrollCapture={(e: any) => {
                    const isTop = e.target?.scrollTop === 0;
                    setIsShowReply(isTop)
                }}
                sx={{ width: '100%', fontSize: 14, px: 1, color: 'white', fontWeight: 400 }}
                placeholder='Type your messsages'
                multiline
                maxRows={3}
                endAdornment={

                    <InputAdornment position="end" sx={{ pr: 2 }}>
                        <ClickAwayListener onClickAway={() => setAnchorElEmoji(null)}>
                            <Box>
                                <Popper
                                    id={id}
                                    open={open}
                                    anchorEl={anchorElEmoji}
                                    placement='top-end'
                                    sx={{
                                        zIndex: (theme) => theme.zIndex.drawer + 1
                                    }}
                                >
                                    <EmojiPicker onEmojiClick={handleEmoji} />
                                </Popper>
                                <IconButton
                                    aria-label="Toggle emoji"
                                    aria-describedby={id}
                                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                                        setAnchorElEmoji(anchorElEmoji ? null : event.currentTarget);
                                    }}
                                    edge="end"
                                    sx={{ mr: -1, }}
                                >
                                    <EmojiIcon />
                                </IconButton>
                            </Box>
                        </ClickAwayListener>

                        <IconButton
                            aria-label="toggle password visibility"
                            type='submit'
                            disabled={disabled}
                            edge="end"
                            sx={{ px: 0, mr: -4 }}
                        >
                            <Stack width={60} alignItems={'center'}>
                                <SendIcon />
                                <Typography fontSize={10} mt={.5} fontWeight={400} color="dark.60">
                                    {watch('content')?.length ?? 0}/200
                                </Typography>

                            </Stack>
                        </IconButton>
                    </InputAdornment>
                }
            />

        </Box>
    </Box>

}
const PopoverItem = ({ id, anchorEl, handleViewBlockList, setReplyUser, handleReport, handleBlock, handleClose, messageSelected }: {
    id?: string,
    anchorEl: HTMLButtonElement | null,
    messageSelected: MessageType,
    setReplyUser: Function,
    handleClose: VoidFunction,
    handleReport: (reportType: string) => void
    handleBlock: Function,
    handleViewBlockList: Function
}) => {
    const [isShowReport, setIsShowReport] = useState<boolean>(false);
    const [typeReport, setTypeReport] = useState<string | undefined>();
    const reportRef = useRef<HTMLDivElement>(null);
    const initRef = useRef<HTMLDivElement>(null);
    const nodeRef = isShowReport ? reportRef : initRef;
    const { walletAddress } = useWalletContext();

    useEffect(() => {
        if (anchorEl === null) {
            setTimeout(() => {
                setIsShowReport(false)
                setTypeReport(undefined);
            }, 200);
        }
    }, [anchorEl])

    const data = [
        {
            icon: <UndoIcon />,
            title: 'Reply',
            onClick: () => {
                setReplyUser();
                handleClose();
            }
        },
        {
            icon: <WarningIcon />,
            title: 'Report message',
            onClick: () => {
                setIsShowReport((prev) => !prev);
            }
        },
        {
            icon: <CloseSquareIcon />,
            title: 'Block user',
            onClick: () => {
                handleBlock();
            }
        },
        {
            icon: <MoreIcon width={20} height={20} />,
            title: 'View block list',
            onClick: () => {

                handleViewBlockList()
            }
        },

    ]
    const dataMy = [
        {
            icon: <MoreIcon width={20} height={20} />,
            title: 'View block list',
            onClick: () => {
                handleViewBlockList()
            }
        },
    ]
    const dataReport = [
        {
            title: 'Spam',
            type: 'SPAM',
            onClick: () => { }
        },
        {
            title: 'Violence',
            type: 'VIOLENCE',
            onClick: () => { }
        }, {
            title: 'Pornography',
            type: 'PORNOGRAPHY',
            onClick: () => { }
        }, {
            title: 'Child abuse',
            type: 'CHILD_ABUSE',
            onClick: () => { }
        }, {
            title: 'Political distortion',
            type: 'POLITICAL_DISTORTION',
            onClick: () => { }
        }, {
            title: 'Copyright',
            type: 'COPYRIGHT',
            onClick: () => { }
        }, {
            title: 'Others',
            type: 'OTHERS',
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
                                (messageSelected?.from?.toUpperCase() === walletAddress?.toUpperCase() ? dataMy : data).map((item, index) =>
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
                        </List>
                        : <List sx={{
                            py: 1,
                            mx: 2,
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
                                <ListItemButton>
                                    <ListItemText primary={<Typography color='secondary.100' fontWeight={400} variant='body2'>Report as...</Typography>} />
                                </ListItemButton>
                            </ListItem>
                            {
                                dataReport.map((item, index) =>
                                    <ListItem key={index} disablePadding sx={typeReport === item.type ? { bgcolor: 'secondary.main', color: 'primary.200' } : {}}>
                                        <ListItemButton onClick={() => setTypeReport(item.type)}>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }
                            <ButtonLoading onClick={() => {
                                handleClose();
                                handleReport(typeReport!)
                            }} disabled={!typeReport} sx={{ py: 1, mb: 1, fontSize: 12, bgcolor: 'primary.300', fontWeight: 400, textTransform: 'none', borderRadius: 2 }}>
                                Send Report
                            </ButtonLoading>
                        </List>
                }
            </Box>
        </div>
        {/* </CSSTransition>
        </SwitchTransition> */}


    </Popover >

}

const ChatItem = ({ isMy, handleUndoReport, isReport, id, data, handleClick }: { isReport?: boolean, handleUndoReport: (id: string) => void, data: MessageType, isMy?: boolean, id: string | undefined, handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
    const { walletIsConnected, walletAddress } = useWalletContext()

    if (isReport) {
        return <Box bgcolor={'background.paper'} position={'relative'} boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.15)"} border={'1px solid'} borderColor={'secondary.300'} textAlign={'center'} borderRadius={2} px={2} pt={2} pb={1} mb={1}>
            <Typography variant='body2' color="secondary.100" fontWeight={400} whiteSpace={'pre-line'} sx={{ wordBreak: 'break-all' }}>This message has been <br /> reported and hidden</Typography>
            <Button variant="text" sx={{ border: 'none', '&:hover': { border: 'none', backgroundColor: 'secondary.300' } }} onClick={() => handleUndoReport(id!)} color={'secondary'}>Undo</Button>
        </Box >
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
        <Stack direction={'row'} alignItems={'baseline'} gap={1} mt={.5}>
            <Typography variant='body2' fontWeight={400} color={'secondary.700'} lineHeight={'14px'} fontSize={10}>{Format.formatDateTimeAlt(data.updated_at, 'UTC', 'HH:mm')}</Typography>
            <Stack>
                {
                    data.replied_content && <Stack sx={{ borderLeft: 1, borderColor: 'secondary.main' }} mb={.5}>
                        <Typography ml={.5} whiteSpace={'pre-line'} lineHeight={'14px'} sx={{ wordBreak: 'break-all' }} flexGrow={1} variant='caption' fontWeight={400} color="dark.60"> {data.replied_content}</Typography>
                    </Stack>
                }
                <Typography whiteSpace={'pre-line'} sx={{ wordBreak: 'break-all' }} flexGrow={1} variant='body2' fontWeight={500} color="secondary.100">
                    {
                        data.repliedUserInfo &&
                        <>

                            <Typography sx={walletAddress?.toLowerCase() === data.to.toLowerCase() ? {
                                bgcolor: 'secondary.main',
                                color: 'primary.200'
                            } : {}} component="span" fontSize={'inherit'} fontWeight={'inherit'} color="secondary.main">
                                @{data.repliedUserInfo?.userName || Convert.convertWalletAddress(data.to, 4, 5)}&nbsp;
                            </Typography>
                            &nbsp;
                        </>
                    }
                    {data.content}</Typography>
            </Stack>
        </Stack>
        {
            walletIsConnected
            && <Box position="absolute" className="more" sx={{ top: 0, right: 0 }}>
                <IconButton aria-describedby={id} onClick={handleClick} aria-label="delete">
                    <MoreSquareIcon />
                </IconButton>
            </Box>
        }

    </Box >
}
const ContentChat = () => {
    return <Typography>Coming Soon</Typography>
}