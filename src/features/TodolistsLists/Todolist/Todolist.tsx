import React, {ChangeEvent, FocusEvent, KeyboardEvent, memo, useCallback, useEffect, useState} from 'react';
import {Mbutton} from "../../../components/Button/Button";
import {Input} from "../../../components/Input/Input";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";

import s from './Todolist.module.css'
import {Task} from "../../../components/Task/Task";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../app/store";
import {ItemsType, TaskStatuses, TaskType} from "../../../api/todolist-api";
import {fetchTasksTC} from "../tasks-reducer";
import {ExtendedGetTodolistsType, fetchTodolistsTC, FilterType} from "../todolists-reducer";

type TodolistType = {
    todolists: ExtendedGetTodolistsType
    onInputTextKeyDown: (todolistId: string, name: string) => void
    onAddTask: (todolistId: string, name: string) => void
    onCheckbox: (todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => void
    onRemove: (todolistId: string, taskId: string) => void
    onFilter: (todolistId: string, name: FilterType) => void
    onEditTaskSpanKeyPress: (todolistId: string, taskId: string, name: string) => void
    onEditHeadingKeyPress: (title: string, todolistId: string) => void
    demo?: boolean
}

export const Todolist: React.FC<TodolistType> = memo(({
                                                          todolists,
                                                          onInputTextKeyDown,
                                                          onAddTask,
                                                          onCheckbox,
                                                          onRemove,
                                                          onFilter,
                                                          onEditTaskSpanKeyPress,
                                                          onEditHeadingKeyPress,
                                                          demo = false
                                                      }) => {

    const [inputTaskValue, setInputTaskValue] = useState('')
    const [error, setError] = useState(false)

    const tasks = useSelector<AppRootStateType, ItemsType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(todolists.id))
    }, [todolists.id])

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
            onAddTask(todolists.id, inputTaskValue)
            setInputTaskValue('')
        } else {
            setError(true)
        }
    }, [onAddTask, inputTaskValue])

    const onBlurCallBackHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            setError(false)
        }
    }

    let filteredTasks = tasks[todolists.id]
    if (todolists.filter === 'active') {
        filteredTasks = tasks[todolists.id].filter(t => t.status === TaskStatuses.New)
    }

    if (todolists.filter === 'done') {
        filteredTasks = tasks[todolists.filter].filter(t => t.status === TaskStatuses.Completed)
    }


    return <div key={todolists.filter} className={s.todolist__container}>
        <span className={s.todolist__header}>
            <EditableSpan
                onEditSpanKeyPress={(name) => onEditHeadingKeyPress(name, todolists.id)}
                name={todolists.title}
            />
        </span>
        <div>
            <Input
                value={inputTaskValue}
                onChangeCallBack={onChangeCallBackHandler}
                onKeyDownCallBack={(e: KeyboardEvent<HTMLInputElement>) => onKeyDownCallBackHandler(todolists.id, inputTaskValue, e)}
                onBlurCallBack={(e: FocusEvent<HTMLInputElement>) => onBlurCallBackHandler(e)}
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
                            todolistId={todolists.id}
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
            <Mbutton callBack={useCallback(() => onFilter(todolists.id, 'all'), [onFilter])}
                     name={'all'}
                     variant={todolists.filter === "all" ? "contained" : "outlined"}
            />
            <Mbutton callBack={useCallback(() => onFilter(todolists.id, 'active'), [onFilter])}
                     name={'active'}
                     variant={todolists.filter === "active" ? "contained" : "outlined"}
            />
            <Mbutton callBack={useCallback(() => onFilter(todolists.id, 'done'), [onFilter])}
                     name={'done'}
                     variant={todolists.filter === "done" ? "contained" : "outlined"}
            />
        </div>
    </div>
})

