import { Stack, StackProps } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TicketNumber from '../TicketNumber'
import { SubtractImage } from 'utils/Images'
import { Utils } from '@/utils/index'

type Props = {
    numbersInit: string[] | number[] | undefined,
    size?: number,
    text?: React.ReactNode
} & StackProps

const TicketAnimationOdometer = ({ numbersInit, size, text, sx, ...props }: Props) => {
    const [numbers, setNumbers] = useState<(string | number | null)[]>([null, null, null, null, null, null])
    const generateInterval = 300; // Interval in milliseconds
    const generateCount = 10; // Number of times to generate each number

    useEffect(() => {
        if (numbersInit !== undefined) {
            let numberIndex = 0;
            let generateIndex = 0;
            const intervalId = setInterval(() => {
                if (numberIndex < 6) {
                    setNumbers(prevNumbers => {
                        // generateIndex++;
                        //                     debugger
                        //                     if (numberIndex < 5) {
                        //                         newNumbers[numberIndex] = generateIndex < generateCount ? Utils.getRandomNumberInRange(1, 25) : numbersInit[numberIndex];
                        //                     } else {
                        //                         newNumbers[numberIndex] = generateIndex < generateCount ? Utils.getRandomNumberInRange(1, 10) : numbersInit[numberIndex];
                        //                     }

                        const newNumbers = [...prevNumbers];
                        if (numberIndex < 6) {
                            newNumbers[numberIndex] = generateIndex < generateCount ? numbersInit[numberIndex] : Utils.getRandomNumberInRange(1, 25);
                        } else {
                            newNumbers[numberIndex] = generateIndex < generateCount ? numbersInit[numberIndex] : Utils.getRandomNumberInRange(1, 10);
                        }
                        generateIndex++;
                        if (generateIndex >= generateCount) {
                            generateIndex = 0;
                            numberIndex++;
                        }
                        debugger
                        return newNumbers;
                    });
                } else {
                    clearInterval(intervalId);
                }
            }, generateInterval);

            return () => {
                clearInterval(intervalId);
            };

        }
    }, [numbersInit]);


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
                    <TicketNumber key={number + "ticket" + index} size={size} number={number ?? ''} />
                )
            }
        </Stack >
    )
}

export default TicketAnimationOdometer