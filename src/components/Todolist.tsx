import React, {ChangeEvent, FocusEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../App";
import {Mbutton} from "./Button/Button";
import {Input} from "./Input/Input";
import {EditableSpan} from "./EditableSpan/EditableSpan";

import s from './Todolist.module.css'
import Checkbox from '@mui/material/Checkbox';
import {v1} from "uuid";

type TodolistType = {
    todolistId: string
    title: string
    onInputTextKeyDown: (todolistId: string, name: string) => void
    onAddTask: (todolistId: string, name: string) => void
    filteredTasks: TaskType[]
    onCheckbox: (todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => void
    onRemove: (todolistId: string, taskId: string) => void
    onFilter: (todolistId: string, name: FilterType) => void
    filter: FilterType
    onEditTaskSpanKeyPress: (todolistId: string, taskId: string, name: string) => void
    onEditHeadingKeyPress: (title: string, todolistId: string) => void

}

export const Todolist: React.FC<TodolistType> = ({
                                                     todolistId,
                                                     title,
                                                     onInputTextKeyDown,
                                                     onAddTask,
                                                     filteredTasks,
                                                     onCheckbox,
                                                     onRemove,
                                                     onFilter,
                                                     filter,
                                                     onEditTaskSpanKeyPress,
                                                     onEditHeadingKeyPress,
                                                 }) => {


    const [inputTaskValue, setInputTaskValue] = useState('')
    const [error, setError] = useState(false)

    const onKeyDownCallBackHandler = (todolistId: string, inputTaskValue: string, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputTaskValue !== '') {
            onInputTextKeyDown(todolistId, inputTaskValue)
            setInputTaskValue('')
        }
        if (inputTaskValue === '') {
            setError(true)
        }
    }

    const onChangeCallBackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTaskValue(e.currentTarget.value)
        setError(false)
    }


    const addTaskHandler = () => {
        if (inputTaskValue.trim() !== '') {
            onAddTask(todolistId, inputTaskValue)
            setInputTaskValue('')
        } else {
            setError(true)
        }
    }

    const onBlurCallBackHandler = (e:FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            setError(false)
        }
    }


    return <div key={todolistId} className={s.todolist__container}>
        <span className={s.todolist__header}>
            <EditableSpan
                onEditSpanKeyPress={(name) => onEditHeadingKeyPress(name, todolistId)}
                name={title}
            />
        </span>
        <div>
            <Input
                value={inputTaskValue}
                onChangeCallBack={onChangeCallBackHandler}
                onKeyDownCallBack={(e: KeyboardEvent<HTMLInputElement>) => onKeyDownCallBackHandler(todolistId, inputTaskValue, e)}
                onBlurCallBack={(e:FocusEvent<HTMLInputElement>) => onBlurCallBackHandler(e)}
                error={error}
            />
            <Mbutton
                callBack={addTaskHandler}
                name={'+'}
                variant={"contained"}/>
            <ul>
                {filteredTasks.map(t => {

                    const onEditSpanKeyPressHandler = (todolistId: string, taskId: string, name: string) => {
                        onEditTaskSpanKeyPress(todolistId, taskId, name)
                    }

                    return <li key={t.id}>
                                <Checkbox
                                    className={s.checkbox__task}
                                    onChange={(e) => onCheckbox(todolistId, t.id, e)}
                                    checked={t.isDone}
                                />
                                <EditableSpan
                                    onEditSpanKeyPress={(name) => onEditSpanKeyPressHandler(todolistId, t.id, name)}
                                    name={t.name}
                                />
                                <Mbutton
                                    callBack={() => onRemove(todolistId, t.id)}
                                    name={'x'}
                                    variant={"contained"}
                                />
                            </li>
                })}
            </ul>
        </div>
        <div>
            <Mbutton callBack={() => onFilter(todolistId, 'all')} name={'all'}
                     variant={filter === "all" ? "contained" : "outlined"}/>
            <Mbutton callBack={() => onFilter(todolistId, 'active')} name={'active'}
                     variant={filter === "active" ? "contained" : "outlined"}/>
            <Mbutton callBack={() => onFilter(todolistId, 'done')} name={'done'}
                     variant={filter === "done" ? "contained" : "outlined"}/>
        </div>
    </div>
}

