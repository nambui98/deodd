import { Button, Typography } from "@mui/material";
import { useSiteContext } from "contexts/SiteContext";
import { useRouter } from "next/router";
import { ShareIcon } from "utils/Icons";
import ClipboardJS from 'clipboard';
import { useEffect, useRef, useState } from "react";
const ShareButton = ({ title, description }: { title: string, description: string }) => {
    const { setTitleSuccess, setIsSuccess } = useSiteContext();
    const [link, setLink] = useState<string | undefined>();
    const buttonRef = useRef(null);
    const router = useRouter();
    console.log(router);

    useEffect(() => {
        setLink(window.origin + router.asPath)
        if (buttonRef) {
            const clipboard = new ClipboardJS(buttonRef!.current!, {
                text: () => window.origin + router.asPath
            })
            clipboard.on('success', () => {
                setTitleSuccess("Copy to clipboard");
                setIsSuccess(true);
            })
            return () => {
                clipboard.destroy();
            }
        }
    }, [])

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
                    (buttonRef?.current as any).click();
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
            <button style={{ display: 'none' }} ref={buttonRef} data-clipboard-text={link}>
                Copy
            </button>
        </Button>
    );
};
export default ShareButton;