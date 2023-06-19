import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Colors } from 'constants/index';

type Props = {
    selectOptions: string[];
    setValue: (value: number) => void;
}

function SelectBox({ selectOptions, setValue }: Props) {
    const [valueSelect, setValueSelect] = useState<number>(0);
    return (
        <Autocomplete
            options={selectOptions}
            renderInput={(params) => <TextField {...params} inputProps={{ ...params.inputProps, readOnly: true }} />}
            value={selectOptions[valueSelect]}
            disableClearable
            size='small'
            ListboxProps={{
                sx: {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    lineHeight: "1.25rem",
                },
            }}
            onChange={(e) => {
                if (e.target instanceof HTMLLIElement) {
                    if (e.target.dataset.optionIndex) {
                        setValue(+e.target.dataset.optionIndex);
                        setValueSelect(+e.target.dataset.optionIndex);
                    }
                }
            }}
            sx={styleInput}
            classes={{

            }}
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
export default SelectBox;
