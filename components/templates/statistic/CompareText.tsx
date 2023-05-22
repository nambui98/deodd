import { Typography } from "@mui/material";
import { Colors } from "constants/index";
import { ArrowDownIcon, ArrowUpIcon } from "utils/Icons";
import { TypographyProps } from "@mui/material";

type CompareTextProps = {
  data: number | null,
} & TypographyProps

export function CompareText({ data, ...props }: CompareTextProps) {
  return (
    <Typography
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={1}
      variant="body2"
      color={
        data !== null
          ? data < 0
            ? Colors.decrease
            : Colors.increase
          : "inherit"
      }
      {...props}
    >
      {data !== null ? data < 0 ? (
        <ArrowDownIcon fill={Colors.decrease} width={16} height={16} />
      ) : (
        <ArrowUpIcon fill={Colors.increase} width={16} height={16} />
      ) : "No flip data yesterday"}

      {data !== null ? Math.abs(data) + "%" : ""}
    </Typography>
  );
}