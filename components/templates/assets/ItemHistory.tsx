import { Stack, Typography } from "@mui/material"
import { ArrowLeftIcon, ArrowRightIcon } from "utils/Icons"

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
            isDeposit ? <ArrowLeftIcon style={{ stroke: "#FC753F" }} /> : <ArrowRightIcon />
        }
        <Stack ml={1}>
            <Typography>{title}</Typography>
            <Typography color={"secondary"} mt={0.5}>{value}</Typography>
        </Stack>
        <Stack ml="auto" textAlign={"end"}>
            <Typography color={"secondary.200"} variant='caption'>{StatusTransfer[status]}</Typography>
            <Typography color={"secondary.200"} variant='caption' mt={0.5}>{date}</Typography>
        </Stack>
    </Stack>
}