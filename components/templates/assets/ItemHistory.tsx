import { Stack, Typography } from "@mui/material"
import { ArrowLeftIcon, ArrowRightIcon, LeftIcon, RightIcon } from "utils/Icons"

export enum StatusTransfer {
    Inprogress,
    Complete,
    Failed
}
type TypeItem = {
    isDeposit: boolean,
    title: string,
    status: StatusTransfer,
    value: string,
    date: string,
}
export const ItemHistory: React.FC<TypeItem> = ({ title, isDeposit, status, value, date }) => {
    return <Stack direction={'row'} mt={1}>
        {
            isDeposit ? <LeftIcon style={{ stroke: "#FC753F" }} /> : <RightIcon stroke="#26BC7F" />
        }
        <Stack ml={1}>
            <Typography variant="body2" fontWeight={400}>{title}</Typography>
            <Typography variant="body2" color={"secondary"} mt={0.5}>{value}</Typography>
        </Stack>
        <Stack ml="auto" textAlign={"end"}>
            <Typography color={"dark.60"} variant='caption'>{StatusTransfer[status]}</Typography>
            <Typography color={"dark.60"} variant='caption' mt={0.5}>{date}</Typography>
        </Stack>
    </Stack>
}