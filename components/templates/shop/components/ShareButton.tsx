import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ShareIcon } from "utils/Icons";

const ShareButton = ({ title, description }: { title: string, description: string }) => {
    const router = useRouter();
    return (
        <Button
            onClick={async () => {
                const shareData = {
                    title: title,
                    text: description,
                    url: router.pathname
                    // url: window.location.href,
                };

                await navigator.share(shareData)
                // try {
                //     await navigator.share(shareData);
                // } catch (err) {

                //     debugger
                // }
                // if (navigator.share && navigator.canShare(shareData)) {
                // await navigator.share(shareData)
                // } else {
                //     // do something else like copying the data to the clipboard
                // }
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