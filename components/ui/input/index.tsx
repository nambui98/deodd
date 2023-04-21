import { IconButton, InputAdornment, InputBase, InputBaseProps, alpha, styled } from '@mui/material';
import React from 'react'
import { SendIcon } from 'utils/Icons';


export const Input = (props: InputBaseProps) => {
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <PrimaryInput
            // defaultValue="react-bootstrap"
            id="bootstrap-input"
            placeholder='Type your messsages'
            {...props}
        />
    )
}
const PrimaryInput = styled(InputBase)(({ theme }) => ({
    // 'label + &': {
    //     marginTop: theme.spacing(3),
    // },
    '& .MuiInputBase-input': {
        // borderRadius: 4,

        position: 'relative',

        // backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        // border: '1px solid #ced4da',
        fontSize: 14,

        // width: 'auto',
        // padding: '10px 12px',
        paddingLeft: theme.spacing(1),
        // paddingLeft: theme.spacing(1),
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&::placeholder': {
            color: (theme.palette.secondary as any)[700]
        },
        '&:hover': {
            border: 'none',
        },
        '&:focus': {
            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            border: "none"
            // borderColor: theme.palette.primary.main,
        },
    },
}));