import { Stack, StackProps } from '@mui/material'
import React from 'react'
import TicketNumber from '../TicketNumber'
import { SubtractImage } from 'utils/Images'

type Props = {
    numbers: (string | number | null)[],
    size?: number,
    text?: React.ReactNode
} & StackProps

const Ticket = ({ numbers, size, text, sx, ...props }: Props) => {
    return (
        <Stack
            direction={'row'}
            gap={2}
            px={2}
            py={1}
            alignItems={'center'}
            maxHeight={56}
            sx={{
                backgroundImage: `url(${SubtractImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                '> div:last-child': {
                    marginLeft: 'auto',
                    '> div': {
                        ':nth-child(1)': {
                            backgroundColor: 'secondary.main'
                        },
                        ':nth-child(2)': {
                            backgroundColor: '#FFFCDD'
                        },
                        ':nth-child(3)': {
                            backgroundColor: '#FFFCDD',
                            opacity: .8

                        },
                    }
                },
                ...sx
            }}
            {...props}
        >
            {text}
            {
                numbers.map((number, index) =>
                    <TicketNumber key={number + "" + index} size={size} number={number ?? ''} />
                )
            }
        </Stack >
    )
}

export default Ticket