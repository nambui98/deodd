import { Box, BoxProps } from "@mui/material"
import { useAnimationFrame } from "hooks/useAnimationFrame"
import { useState } from "react"
type Props = BoxProps & {
    width?: number,
    height?: number
}
export const CoinAnimation = ({ width, height, ...props }: Props) => {
    const [count, setCount] = useState(0)

    useAnimationFrame((deltaTime: number) => {
        setCount(prevCount => (prevCount + deltaTime * 0.01) % 11)
    })

    return <Box {...props}>
        <img width={width} height={height} src={"/assets/images/coin/coin" + Math.round(count) + ".png"} alt="" />
    </Box>
}