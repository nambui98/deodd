import { useEffect, useState } from 'react'

type Props = {
    number: number
}

const CountDownNumber = ({ number }: Props) => {
    const [numberLeft, setNumberLeft] = useState<number>(number)
    useEffect(() => {
        const interval = setInterval(() => {
            setNumberLeft((prev) => prev === 0 ? 0 : prev - 1);
        }, 1000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <span>{numberLeft}</span>
    )
}

export default CountDownNumber