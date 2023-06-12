import { MenuItem, Select, SelectChangeEvent, Typography, InputLabel } from '@mui/material'
import { elements } from 'chart.js';
import React, { useState } from 'react'
import { Colors } from 'constants/index';

type Props = {
    selectOptions: { [index: string]: string | number }[];
    setValue: Function;
}

function SelectBox({ selectOptions, setValue }: Props) {
    const [valueSelect, setValueSelect] = useState<string>(`${selectOptions[0].value}` ?? "current");
    return (
        <Select
            value={valueSelect}
            onChange={(event: SelectChangeEvent) => { setValue(event.target.value); setValueSelect(event.target.value) }}
            displayEmpty
            label="Season"
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