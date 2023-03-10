import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import s from "../../features/TodolistsLists/Todolist/Todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Mbutton} from "../Button/Button";
import {RequestStatusType} from "../../app/app-reducer";

type TaskType = {
    todolistId: string
    taskId: string
    taskName:string
    onCheckbox: (todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => void
    onEditTaskSpanKeyPress: (todolistId: string, taskId: string, name: string) => void
    onRemove: (todolistId: string, taskId: string) => void
    checked:boolean
    entityStatus:RequestStatusType

}
export const Task:React.FC<TaskType> = memo(({
                                                 todolistId,
                                                 taskId,
                                                 taskName,
                                                 onCheckbox,
                                                 checked,
                                                 onEditTaskSpanKeyPress,
                                                 onRemove,
                                                 entityStatus
                                             }) => {
    return <>
        <Checkbox
            className={s.checkbox__task}
            onChange={(e) => onCheckbox(todolistId, taskId, e)}
            checked={checked}
        />
        <EditableSpan
            onEditSpanKeyPress={(name) => onEditTaskSpanKeyPress(todolistId, taskId, name)}
            name={taskName}
        />
        <Mbutton
            callBack={() => onRemove(todolistId, taskId)}
            name={'x'}
            variant={"contained"}
            entityStatus={entityStatus}
        />;
    </>
})

