import { Stack, Typography, Fade, Tooltip } from "@mui/material";
import { useSiteContext } from "contexts/SiteContext";
import { InfoPopup } from "./InfoPopup";
import MyImage from "../image";
import { CountdownTimer } from "./CountdownTimer";

export function GoldenHour() {
  const { isGoldenHour } = useSiteContext();

  return (
    <Stack width={'100%'} alignItems={isGoldenHour ? "center" : "initial"} justifyContent="center">
      <Typography variant='body2' color={'primary.200'} >{isGoldenHour ? "Golden Hour" : "Golden Hour starts in"}</Typography>
      <CountdownTimer />
      <Tooltip title={<InfoPopup />} arrow placement="top"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 150 }}
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: "rgba(22, 24, 33, 60%)",
              borderRadius: "8px",
              padding: "0.75rem",
              minWidth: 400,
              outline: "1px solid #fffcdd",
              boxShadow: "0px 2px 24px 0px #00000033",
              backdropFilter: "blur(24px)",
              marginLeft: "-16.3%",
            }
          },
          // Using marginLeft to move the position of the tooltip and arrow.
          arrow: {
            sx: {
              marginLeft: "16.3%",
              "&::before": {
                backgroundColor: "rgba(22, 24, 33, 60%)",
                outline: "1px solid #fffcdd",
                boxShadow: "0px 2px 24px 0px #00000033",
                backdropFilter: "blur(24px)",
              },
            }
          }
        }}>
        {/* Wrapping the icon in another element so that the tooltip displays correctly. In order for this to work I set width and height of the wrapper equal to the icon */}
        <Stack justifyContent={"center"} sx={{ position: "absolute", right: "14px", height: "17px", width: "17px" }}>
          <MyImage
            src={"/assets/icons/info-circle.svg"}
            width={17}
            height={17}
            alt="info-icon"
          />
        </Stack>
      </Tooltip>

    </Stack>

  );
}