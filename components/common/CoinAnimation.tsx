import { Box, BoxProps } from "@mui/material"
import Image from "next/image"
import React, { useEffect, useState } from "react"
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

function CoinAnimation({ width, height, mx, textAlign }: Props) {
    const [imagesLoaded, setImagesLoaded] = useState<number>(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((currentIndex) => (currentIndex + 1) % listImage.length);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return <Box mx={mx} textAlign={textAlign} width={width} height={height} position={'relative'}
    // sx={{ opacity: imagesLoaded === listImage.length ? 1 : 0 }}
    >
        {
            listImage.map((image, index) =>
                <Box key={image} width={1} height={1} position={'absolute'}
                    display={currentImageIndex === index ? 'block' : 'none'}
                >
                    <Image
                        onLoadingComplete={() => setImagesLoaded((prev) => prev += 1)}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                                33vw"
                        fill
                        style={{ objectFit: "contain" }}
                        src={image} alt="" />
                </Box>
            )
        }

    </Box>

}
export default React.memo(CoinAnimation);
