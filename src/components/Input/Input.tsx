import React, {ChangeEvent,KeyboardEvent,FocusEvent} from 'react';

import s from './Input.module.css'
import TextField from "@mui/material/TextField";
import {RequestStatusType} from "../../app/app-reducer";

type InputType = {
    value: string
    entityStatus?: RequestStatusType
    onChangeCallBack: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDownCallBack: (e:KeyboardEvent<HTMLInputElement>) => void
    onBlurCallBack:(e:FocusEvent<HTMLInputElement>) => void
    error:boolean
}

export const Input: React.FC<InputType> = ({
                                               value,
                                               onChangeCallBack,
                                               onKeyDownCallBack,
                                               error,
                                               onBlurCallBack,
                                               entityStatus
                                           }) => {

    return <TextField
                id="outlined-basic"
                disabled={entityStatus === 'loading'}
                label="Your text here"
                variant="outlined"
                error={!!error}
                helperText={error && "* Required field"}
                value={value}
                type="text"
                onChange={onChangeCallBack}
                onKeyDown={onKeyDownCallBack}
                onBlur={onBlurCallBack}
            />
};

