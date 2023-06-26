import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import s from './Button.module.css'
import {RequestStatusType} from "../../../app/app-reducer";

type ButtonType = {
    callBack: () => void
    name: string
    variant: "text" | "outlined" | "contained"
    entityStatus: RequestStatusType
}
export const Mbutton: React.FC<ButtonType> = ({
                                                  callBack,
                                                  name,
                                                  variant,
                                                  entityStatus
                                              }) => {
    console.log('entityStatus', entityStatus)
    return name === 'x'
        ?
        <IconButton aria-label="delete" onClick={callBack} disabled={entityStatus === 'loading'}>
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
            disabled={entityStatus === 'loading'}
        >{'+todo'}
        </Button>
        : name === 'remove-todo'
        ?
        <Button
            className={s.btn__remove_todo}
            onClick={callBack}
            disabled={entityStatus === 'loading'}
        >{"X"}
        </Button>
        :
        <Button
            className={s.btn}
            onClick={callBack}
            variant={variant}
            size="small"
            sx={{ m: 0.5 }}
            disabled={entityStatus === 'loading'}
        >{name}
        </Button>
};

