import { Autocomplete, TextField, Box } from '@mui/material'
import React, { useState } from 'react'
import { Colors } from 'constants/index';

type LoyaltySelectBoxProps = {
    selectOptions: string[];
    setValue: (value: number) => void;
    selectTarget: 'jackpot' | 'nftholder';
}

export function LoyaltySelectBox({ selectOptions, setValue, selectTarget }: LoyaltySelectBoxProps) {
    const [selectedValue, setSelectedValue] = useState<number>(0);
    const [open, setOpen] = useState(false); // Have to use controlled state so that the TextField close even when click on itself, not only on arrow button.
    return (
        <Autocomplete
            options={selectOptions}
            open={open}
            renderInput={(params) =>
                <Box ref={params.InputProps.ref} onClick={() => { setOpen(!open) }}>
                    <TextField {...params} inputProps={{ ...params.inputProps, readOnly: true }} />
                </Box>}
            value={selectOptions[selectedValue]}
            disableClearable
            size='small'
            ListboxProps={{
                sx: {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    lineHeight: "1.25rem",
                },
            }}
            onClose={() => { setOpen(false) }} // Close the select options when click outside
            onChange={(e) => {
                if (e.target instanceof HTMLLIElement) {
                    if (e.target.dataset.optionIndex) {
                        if (selectTarget === 'jackpot') {
                            setValue(+e.target.innerText.replace(/\D/g, ''));
                        } else if (selectTarget === 'nftholder') {
                            setValue(+e.target.dataset.optionIndex);
                        }
                        setSelectedValue(+e.target.dataset.optionIndex);
                    }
                }
            }}
            sx={styleInput}
        />
    )
}

const styleInput = {
    backgroundColor: "background.paper",
    '.MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    maxWidth: "10.2rem",
    minWidth: "10.2rem",
    borderRadius: 2,
    "& input": {
        cursor: "pointer",
        "::selection": {
            background: "transparent"
        }
    },
    '& .MuiInputBase-root': {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: "1.25rem",
        cursor: "pointer",
    },
    '& .MuiSvgIcon-root ': {
        fill: Colors.secondary,
    },
}
