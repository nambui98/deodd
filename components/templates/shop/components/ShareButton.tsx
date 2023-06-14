import { Button, Typography } from "@mui/material";
import { ShareIcon } from "utils/Icons";

const ShareButton = () => {
    return (
        <Button
            onClick={async () => {
                const shareData = {
                    title: "DeODD",
                    text: "Buy DeODD NFT",
                    url: window.location.href,
                };
                await navigator.share(shareData);
            }}
            disableElevation
            variant="contained"
            sx={{
                px: 1.5,
                color: "text.disabled",
                border: "none",
                svg: {
                    stroke: "none",
                    border: "none",
                },
                "&:hover": {
                    svg: {
                        stroke: "none",
                        border: "none",
                    },
                    border: "none",
                },
            }}
        >
            <ShareIcon width={20} />
            <Typography
                ml={1}
                fontSize={"0.875rem"}
                lineHeight={"1.25rem"}
                textTransform={'none'}
                fontWeight={400}
            >
                Share
            </Typography>
        </Button>
    );
};
export default ShareButton;