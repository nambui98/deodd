import { Button, Typography } from "@mui/material";
import { useSiteContext } from "contexts/SiteContext";
import { useRouter } from "next/router";
import { ShareIcon } from "utils/Icons";

const ShareButton = ({ title, description }: { title: string, description: string }) => {
    const router = useRouter();
    const { setTitleSuccess, setIsSuccess } = useSiteContext();
    return (
        <Button
            onClick={async () => {
                const shareData = {
                    title: title,
                    text: description,
                    url: window.location.href,
                };

                if (navigator.share && navigator.canShare(shareData)) {
                    await navigator.share(shareData)
                } else {
                    navigator?.clipboard.writeText(window.location.href);
                    setTitleSuccess("Copy to clipboard");
                    setIsSuccess(true);
                }
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