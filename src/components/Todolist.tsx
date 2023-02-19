import React, {ChangeEvent, FocusEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import {FilterType, TasksType, TaskType} from "../App";
import {Mbutton} from "./Button/Button";
import {Input} from "./Input/Input";
import {EditableSpan} from "./EditableSpan/EditableSpan";

import s from './Todolist.module.css'
import Checkbox from '@mui/material/Checkbox';
import {v1} from "uuid";
import {Task} from "./Task/Task";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

type TodolistType = {
    todolistId: string
    title: string
    onInputTextKeyDown: (todolistId: string, name: string) => void
    onAddTask: (todolistId: string, name: string) => void
    //tasks: TaskType[]
    onCheckbox: (todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => void
    onRemove: (todolistId: string, taskId: string) => void
    onFilter: (todolistId: string, name: FilterType) => void
    filter: FilterType
    onEditTaskSpanKeyPress: (todolistId: string, taskId: string, name: string) => void
    onEditHeadingKeyPress: (title: string, todolistId: string) => void

}

export const Todolist: React.FC<TodolistType> = memo(({
                                                          todolistId,
                                                          title,
                                                          onInputTextKeyDown,
                                                          onAddTask,

                                                          onCheckbox,
                                                          onRemove,
                                                          onFilter,
                                                          filter,
                                                          onEditTaskSpanKeyPress,
                                                          onEditHeadingKeyPress,
                                                      }) => {

    console.log("Todolist called" + todolistId)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
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


    const addTaskHandler = useCallback(() => {
        if (inputTaskValue.trim() !== '') {
            onAddTask(todolistId, inputTaskValue)
            setInputTaskValue('')
        } else {
            setError(true)
        }
    },[onAddTask, inputTaskValue])

    const onBlurCallBackHandler = (e:FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            setError(false)
        }
    }

    let filteredTasks = tasks[todolistId].data
    if (filter === 'active') {
        filteredTasks = tasks[todolistId].data.filter(t => !t.isDone)
    }

    if (filter === 'done') {
        filteredTasks = tasks[todolistId].data.filter(t => t.isDone)
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
                        <Task
                            todolistId={todolistId}
                            taskId={t.id}
                            taskName={t.name}
                            onCheckbox={onCheckbox}
                            checked={t.isDone}
                            onEditTaskSpanKeyPress={onEditTaskSpanKeyPress}
                            onRemove={onRemove}
                        />
                        {/*<Checkbox*/}
                        {/*    className={s.checkbox__task}*/}
                        {/*    onChange={(e) => onCheckbox(todolistId, t.id, e)}*/}
                        {/*    checked={t.isDone}*/}
                        {/*/>*/}
                        {/*<EditableSpan*/}
                        {/*    onEditSpanKeyPress={(name) => onEditSpanKeyPressHandler(todolistId, t.id, name)}*/}
                        {/*    name={t.name}*/}
                        {/*/>*/}
                        {/*<Mbutton*/}
                        {/*    callBack={() => onRemove(todolistId, t.id)}*/}
                        {/*    name={'x'}*/}
                        {/*    variant={"contained"}*/}
                        {/*/>*/}
                    </li>
                })}
            </ul>
        </div>
        <div>
            <Mbutton callBack={useCallback(() => onFilter(todolistId, 'all'),[onFilter])}
                     name={'all'}
                     variant={filter === "all" ? "contained" : "outlined"}
            />
            <Mbutton callBack={useCallback(() => onFilter(todolistId, 'active'),[onFilter])}
                     name={'active'}
                     variant={filter === "active" ? "contained" : "outlined"}
            />
            <Mbutton callBack={useCallback(() => onFilter(todolistId, 'done'),[onFilter])}
                     name={'done'}
                     variant={filter === "done" ? "contained" : "outlined"}
            />
        </div>
    </div>
})

