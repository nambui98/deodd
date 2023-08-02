import { Utils } from '@/utils/index'
import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

type Props = {}

const GenerateText = (props: Props) => {
    const texts: string[] =
        [
            "Hearts race as we await the unveiling of the fortunate soul who will claim the grand prize.",
            "The excitement mounts, the moment of truth is just moments away.",
            "Stay tuned, the announcement of the lucky winner is imminent.",
            "It's about time to find out who will be the lucky winner of the incredible prize.",
            "The suspense is unbearable as we eagerly await the DeODD 625's lucky user.",
            "The countdown begins, soon we will know who struck gold.",
            "Hold your breath, the moment of revelation is upon us."
        ]


    const [randomNum, setRandomNum] = useState<number>(Utils.getRandomNumberInRange(0, texts.length))

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomNum(Utils.getRandomNumberInRange(0, texts.length));
        }, 2000)
        return () => {
            clearInterval(interval);
        }
    }, [texts.length])

    return (
        <Typography variant='body2' color={"secondary.main"} fontWeight={500}>{texts[randomNum]}</Typography>
    )
}

export default GenerateText