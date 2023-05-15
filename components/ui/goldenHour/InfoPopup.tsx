import { List, ListItem, ListItemText, Stack, Box, Typography } from "@mui/material";

export function InfoPopup() {
  return (
    <Stack gap={0.3}>
      <Typography variant="body2" fontWeight={400} fontSize={"0.875rem"}>
        Higher chance to drop {""}
        <Typography variant="body2" fontWeight={400} display={"inline"} color="secondary.main" fontSize={"inherit"}>
          TossPoint {""}
        </Typography>
        and {""}
        <Typography variant="body2" fontWeight={400} display={"inline"} color="secondary.main" fontSize={"inherit"}>
          DeODD NFT Card
        </Typography>
      </Typography>
      {/* listStyleType is used so that it displays a bullet list.
      pl is used to correct bullet point position, it is set to be equal to the tooltip padding */}
      <List disablePadding sx={{ display: "flex", flexDirection: "column", listStyleType: "disc", pl: 2 }}>
        <ListItem sx={{
          padding: 0,
          display: 'list-item'
        }}>
          <ListItemText disableTypography>
            <Typography variant="body2" fontWeight={400} fontSize={"0.75rem"}>
              Get more TossPoint to win <Box component={"span"} fontWeight={600}>Jackpot Reward</Box>
            </Typography>
          </ListItemText>
        </ListItem>

        <ListItem sx={{
          padding: 0,
          display: 'list-item'
        }}>
          <ListItemText disableTypography>
            <Typography variant="body2" fontWeight={400} fontSize={"0.75rem"}>
              Saving DeODD NFT Card to get reward in <Box component={"span"} fontWeight={600}>NFT Holder Pool</Box>
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Stack >
  );
}