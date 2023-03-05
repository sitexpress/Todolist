import React, {ChangeEvent, FocusEvent, KeyboardEvent, memo, useCallback, useEffect, useState} from 'react';
import {Mbutton} from "./Button/Button";
import {Input} from "./Input/Input";
import {EditableSpan} from "./EditableSpan/EditableSpan";

import s from './Todolist.module.css'
import {Task} from "./Task/Task";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {ItemsType, TaskStatuses, TaskType} from "../api/todolist-api";
import {fetchTasksTC} from "../state/tasks-reducer";
import {fetchTodolistsTC, FilterType} from "../state/todolists-reducer";

type TodolistType = {
    todolistId: string
    title: string
    onInputTextKeyDown: (todolistId: string, name: string) => void
    onAddTask: (todolistId: string, name: string) => void
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

    const [inputTaskValue, setInputTaskValue] = useState('')
    const [error, setError] = useState(false)

    const tasks = useSelector<AppRootStateType, ItemsType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(todolistId))
    },[todolistId])

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

    let filteredTasks = tasks[todolistId]
    if (filter === 'active') {
        filteredTasks = tasks[todolistId].filter(t => t.status === TaskStatuses.New)
    }

    if (filter === 'done') {
        filteredTasks = tasks[todolistId].filter(t => t.status === TaskStatuses.Completed)
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
                            taskName={t.title}
                            onCheckbox={onCheckbox}
                            checked={t.status === TaskStatuses.New ? false : true}
                            onEditTaskSpanKeyPress={onEditTaskSpanKeyPress}
                            onRemove={onRemove}
                        />
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

