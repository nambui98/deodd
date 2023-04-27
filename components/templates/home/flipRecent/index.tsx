import { Avatar, Box, Collapse, List, Stack, Typography } from '@mui/material'
import IntervalManager from 'libs/IntervalManager'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Avatar2Image } from 'utils/Images'
type Props = {}
type dataUserRecent = {
    id: number,
    username: string,
    timeAgo: string,
    isWin: boolean,
    amount: number,
    streak: number,
    nodeRef: any
}
function FlipRecent({ }: Props) {
    const [dataRecent, setDataRecent] = useState<dataUserRecent[]>(
        Array.from(Array(100).keys()).map((item, index) => {
            return {
                id: index,
                username: 'username' + index,
                amount: index % 2,
                isWin: index % 2 === 0,
                timeAgo: '17 sec ago',
                streak: index % 2 === 1 ? 3 : 0,
                nodeRef: createRef(),
            }
        })
    );
    const countRef = useRef(0);

    useEffect(() => {
        // IntervalManager.
        // IntervalManager.setInterval(() => {
        //   setCount((prevCount) => prevCount + 1);
        // }, 1000);
        const interval = setInterval(() => {
            setDataRecent((dataRecent) => [
                { id: dataRecent.length, amount: 2, isWin: dataRecent.length % 2 === 0, timeAgo: '5h ago', username: 'username' + dataRecent.length, streak: dataRecent.length % 2 === 1 ? 4 : 0, nodeRef: createRef() },
                ...dataRecent,

            ])
        }, 3000);
        return () => {
            clearInterval(interval);
        }
    }, []);


    return (
        <Box overflow={'hidden'}
            sx={{
                position: 'relative',
                // cursor: '',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    zIndex: 1,
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    background: 'radial-gradient(50% 50% at 50% 50%, #FEF156 0%, rgba(254, 241, 86, 0) 100%)'
                },
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    background: 'radial-gradient(50% 50% at 50% 50%, #FEF156 0%, rgba(254, 241, 86, 0) 100%)'
                },


            }}
        >
            <List component={Stack} flexDirection="row">
                <TransitionGroup component={Stack} flexDirection="row" columnGap={1}>
                    {dataRecent.map((item, index) => (
                        <Collapse addEndListener={(e) => e.style.opacity = '1'} timeout={1500} in={true} key={item.id} sx={{
                            '&.MuiCollapse-horizontal': {
                                opacity: 0,
                                transition: '.5s all',
                                '&.MuiCollapse-entered': {
                                    opacity: 1
                                }
                            }
                        }} easing={{ enter: '200ms', exit: '1000s' }} orientation="horizontal">
                            <Box ref={item.nodeRef} className="item">
                                <UserActivity user={item} />
                            </Box>
                        </Collapse>
                    ))}
                </TransitionGroup>
            </List>
        </Box>


    )
}

export default FlipRecent
function UserActivity({ user }: { user: dataUserRecent }) {
    return <Box className="userRecent" bgcolor={'primary.100'} position={'relative'} width={'226px'} border={'1px solid'} borderColor={'secondary.300'} borderRadius={2} px={2} py={1}>
        <Stack direction={'row'} gap={1}>
            <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" src={Avatar2Image} />
            <Stack alignItems={'baseLine'} columnGap={1}>
                <Typography variant='body2' fontWeight={500} lineHeight={'20px'}>{user.username}</Typography>
                <Typography whiteSpace={'normal'} flexGrow={1} lineHeight={'20px'} variant='body2' sx={{ whiteSpace: 'nowrap' }} fontWeight={400} color="secondary.100">flipped
                    <Typography component={'span'} color={'secondary.main'} lineHeight={'20px'} fontWeight={400} variant='body2'>
                        {" "}
                        {user.amount}
                        {" "}
                    </Typography>
                    and
                    {
                        user.isWin ?
                            <Typography component={'span'} color={'secondary.main'} lineHeight={'20px'} fontWeight={400} variant='body2'>
                                {" "}

                                doubled
                                {" "}
                            </Typography>
                            : <Typography component={'span'} color={'secondary.400'} lineHeight={'20px'} fontWeight={400} variant='body2'>
                                {" "}

                                slipped
                                {" "}
                            </Typography>

                    }

                </Typography>
                <Typography variant='caption' fontWeight={400} color="secondary.100" lineHeight={'20px'}>{user.timeAgo}</Typography>
            </Stack>
        </Stack>
        {
            user.streak > 0 &&
            <Box position={'absolute'} top={0} right={0} bgcolor={'secondary.main'} px={0.5} sx={{ borderRadius: '0px 8px' }}>

                <Typography variant='caption' fontSize={10} fontWeight={500} color="primary.200" >{user.streak} streak</Typography>
            </Box>
        }

    </Box>
}