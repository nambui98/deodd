import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import React, { useState } from 'react'

type Props = {}

function SelectBox({ }: Props) {
    const [valueSelect, setValueSelect] = useState<string>()
    return (
        <Select
            value={valueSelect}
            placeholder='Select-'
            onChange={(event: SelectChangeEvent) => { setValueSelect(event.target.value) }}
            displayEmpty
            sx={styleInput}
            inputProps={{ 'aria-label': 'Without label' }}
        >
            <MenuItem disabled value={""}>
                <Typography color={"secondary.100"}>Select-</Typography>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
    )
}
const styleInput = {
    backgroundColor: "background.paper", border: '0px solid', borderColor: 'background.paper', '.MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    // width: "100%",
    fontSize: 16,
    'div': {
        py: "8px",
        fontSize: 16,
    },
    '.MuiSelect-select': {
        color: "secondary.main"
    }

}
export default SelectBox