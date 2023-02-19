import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import s from './Button.module.css'

type ButtonType = {
    callBack: () => void
    name: string
    variant: "text" | "outlined" | "contained"
}
export const Mbutton: React.FC<ButtonType> = ({
                                                  callBack,
                                                  name,
                                                  variant
                                              }) => {
    return name === 'x'
        ?
        <IconButton aria-label="delete" onClick={callBack}>
            <DeleteIcon/>
        </IconButton>
        : name === 'Add a new todolist'
        ?
        <Button
            className={s.btn}
            onClick={callBack}
            variant={variant}
            size="large"
            sx={{ m: 1 }}
        >{'+todo'}
        </Button>
        : name === 'remove-todo'
        ?
        <Button
            className={s.btn__remove_todo}
            onClick={callBack}
        >{"X"}
        </Button>
        :
        <Button
            className={s.btn}
            onClick={callBack}
            variant={variant}
            size="small"
            sx={{ m: 0.5 }}
        >{name}
        </Button>
};

