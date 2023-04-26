import { Box, BoxProps } from "@mui/material"
import { useAnimationFrame } from "hooks/useAnimationFrame"
import Image from "next/image"
import React, { Suspense, useEffect } from "react"
import { useState } from "react"
type Props = BoxProps;

const listImage = [
    "/assets/images/coin/coin0.png",
    "/assets/images/coin/coin1.png",
    "/assets/images/coin/coin2.png",
    "/assets/images/coin/coin3.png",
    "/assets/images/coin/coin4.png",
    "/assets/images/coin/coin5.png",
    "/assets/images/coin/coin6.png",
    "/assets/images/coin/coin7.png",
    "/assets/images/coin/coin8.png",
    "/assets/images/coin/coin9.png",
    "/assets/images/coin/coin10.png",
    "/assets/images/coin/coin11.png",
]

const FrameByFrameAnimation = ({ images, speed }: any) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((currentIndex) => (currentIndex + 1) % images.length);
        }, speed);

        return () => clearInterval(interval);
    }, [images, speed]);

    return (
        <img src={images[currentImageIndex]} alt="frame-by-frame-animation" />
    );
};

// export default FrameByFrameAnimation;

function CoinAnimation({ width, height, ...props }: Props) {
    // const [count, setCount] = useState(0)
    const [imagesLoaded, setImagesLoaded] = useState<number>(0);

    // useAnimationFrame((deltaTime: number) => {
    //     setCount(prevCount => (prevCount + deltaTime * 0.01) % 11)
    // })
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((currentIndex) => (currentIndex + 1) % listImage.length);
        }, 100);

        return () => clearInterval(interval);
    }, []);


    return <Box {...props} width={width} height={height} position={'relative'}

    // sx={{ opacity: imagesLoaded === listImage.length ? 1 : 0 }}
    >
        {/* <FrameByFrameAnimation images={listImage} speed={100} /> */}

        {/* <img src={images[currentImageIndex]} alt="frame-by-frame-animation" /> */}
        {

            listImage.map((image, index) =>
                <Box key={image} width={1} height={1} position={'absolute'}

                    // sx={{ opacity: Math.round(count) === index ? 1 : 0, inset: 0 }}

                    display={currentImageIndex === index ? 'block' : 'none'}
                >
                    <Image
                        // width={width} height={height}
                        // onLoadingComplete={}
                        onLoadingComplete={() => setImagesLoaded((prev) => prev += 1)}
                        loading="lazy"
                        fill
                        style={{ objectFit: "contain" }}
                        src={image} alt="" />
                </Box>
            )
        }

    </Box>

}
export default React.memo(CoinAnimation);
// const CoinAnimationNotMemoize = ({ width, height, ...props }: Props) => {
//     const [count, setCount] = useState(0)

//     useAnimationFrame((deltaTime: number) => {
//         setCount(prevCount => (prevCount + deltaTime * 0.01) % 11)
//     })

//     return <Box {...props}>
//         <img width={width} height={height} src={"/assets/images/coin/coin" + Math.round(count) + ".png"} alt="" />
//     </Box>
// }
// export const CoianAimation = React.memo(CoinAnimationNotMemoize);;
//  CoianAimation;