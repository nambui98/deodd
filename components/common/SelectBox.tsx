import { MenuItem, Select, SelectChangeEvent, Typography, InputLabel } from '@mui/material'
import { elements } from 'chart.js';
import React, { useState } from 'react'
import { Colors } from 'constants/index';

type Props = {
    selectOptions: { [index: string]: string }[];
}

function SelectBox({ selectOptions }: Props) {
    const [valueSelect, setValueSelect] = useState<string>(selectOptions[0].value);
    return (
        <Select
            value={valueSelect}
            onChange={(event: SelectChangeEvent) => { setValueSelect(event.target.value) }}
            displayEmpty
            label="Current Season"
            sx={styleInput}
            inputProps={{ 'aria-label': 'Without label' }}
        >
            {selectOptions.map((property, index) => {
                return (
                    <MenuItem key={index} value={property.value} sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        lineHeight: "1.25rem",
                    }}>{property.text}</MenuItem>
                )
            })}
            {/* <MenuItem value={"current-season"}>Current Season</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
    )
}
const styleInput = {
    backgroundColor: "background.paper", border: '0px solid', borderColor: 'background.paper', '.MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    ' .MuiSelect-select': {
        py: 1,
        px: 2,
    },
    '.MuiMenuItem-root': {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: "1.25rem",
    },
    '.MuiSvgIcon-root ': {
        fill: Colors.secondary,
    },
    maxWidth: "10rem",
    minWidth: "10rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: "1.25rem",
    borderRadius: 2,
}
export default SelectBox