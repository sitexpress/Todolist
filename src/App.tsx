import React, {ChangeEvent, useCallback, useReducer, useState} from 'react';
import {v1} from "uuid";
import {Todolist} from "./components/Todolist";
import {ButtonAppBar} from "./components/AppBar/AppBar";
import {AddNewTodo} from "./components/AddNewTodo/AddNewTodo";

import s from './App.module.css'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Mbutton} from "./components/Button/Button";
import {
    ActionTodoType,
    addNewTodolistAC,
    onEditHeadingAC,
    onFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    ActionTaskType,
    addTasksAC,
    changeTaskStatusAC,
    onEditTaskAC,
    removeTasksAC,
    tasksReducer
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/state";


export type FilterType = 'all' | 'active' | 'done'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}
//---------------------------
export type TaskType = {
    id: string
    name: string
    isDone: boolean
}
type DataType = {
    data: TaskType[]
}
export type TasksType = {
    [key: string]: DataType
}

const todolistId_1 = v1()
const todolistId_2 = v1()

function App() {
    //Пример с useState
    // const [todolists, setTodolists] = useState<TodolistsType[]>([
    //     {id: todolistId_1, title: 'Work', filter:'all'},
    //     {id: todolistId_2, title: 'Hobbies', filter:'all'},
    // ])
    //
    // const [tasks, setTasks] = useState<TasksType>({
    //     [todolistId_1]: {
    //         data: [
    //             {id: v1(), name: 'Eat', isDone: false},
    //             {id: v1(), name: 'Sleep', isDone: false},
    //             {id: v1(), name: 'Rave', isDone: true},
    //         ]
    //     },
    //     [todolistId_2]: {
    //         data: [
    //             {id: v1(), name: 'Eat', isDone: false},
    //             {id: v1(), name: 'Sleep', isDone: true},
    //             {id: v1(), name: 'Rave', isDone: false},
    //         ]
    //     }
    // })

    // Пример с React-овскими редюсерами
    // let [todolists, dispatchToTodolists] = useReducer<(state: TodolistsType[], action: ActionTodoType) => TodolistsType[]>(todolistsReducer,[
    //     {id: todolistId_1, title: 'Work', filter: 'all'},
    //     {id: todolistId_2, title: 'Hobbies', filter:'all'},
    // ])
    //
    //
    // const [tasks, dispatchToTasks] = useReducer<(state: TasksType, action: ActionTaskType) => TasksType>(tasksReducer, {
    //     [todolistId_1]: {
    //         data: [
    //             {id: v1(), name: 'Eat', isDone: false},
    //             {id: v1(), name: 'Sleep', isDone: false},
    //             {id: v1(), name: 'Rave', isDone: true},
    //         ]
    //     },
    //     [todolistId_2]: {
    //         data: [
    //             {id: v1(), name: 'Eat', isDone: false},
    //             {id: v1(), name: 'Sleep', isDone: true},
    //             {id: v1(), name: 'Rave', isDone: false},
    //         ]
    //     }
    // })

    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)

    const dispatch = useDispatch()

    const onCheckboxHandler = useCallback(
        (todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
            const isDone = e.currentTarget.checked
            const action = changeTaskStatusAC(todolistId, taskId, isDone)
            dispatch(action)
        },[])

    const onInputTextKeyDownHandler = useCallback((todolistId: string, name: string) => {
        onAddTaskHandler(todolistId, name)
    },[])

    const onRemoveTaskHandler = useCallback((todolistId: string, taskId: string) => {
        const action = removeTasksAC(todolistId, taskId)
        dispatch(action)
    },[])

    const onAddTaskHandler = useCallback((todolistId: string, name: string) => {
        const action = addTasksAC(todolistId, name)
        dispatch(action)
    },[])

    const onEditTaskSpanKeyPressHandler = useCallback((todolistId: string, taskId: string, name: string) => {
        const action = onEditTaskAC(todolistId, taskId, name)
        dispatch(action)
    },[])

    const onEditHeadingKeyPressHandler = useCallback((title: string, todolistId: string) => {
        const action = onEditHeadingAC(todolistId,title)
        dispatch(action)
    },[])

    const onFilterHandler = useCallback((todolistId: string, filter: FilterType) => {
        const action = onFilterAC(todolistId, filter)
        dispatch(action)
    },[])

    const onAddTodoHandler = useCallback(
        (title:string) => {
            const todolistId = v1()
            const action = addNewTodolistAC(todolistId, title)
            dispatch(action)
        }, [])

    const onInputTextKeyDownNewTodo = useCallback((newTitle: string) => {
        onAddTodoHandler(newTitle)
    }, [])

    const onRemoveTodolist = (todolistId:string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    return <>
        <ButtonAppBar/>
        <div className={s.app__wrapper}>
            <Container fixed>
                <Grid container spacing={0} style={{padding:"25px"}}>
                    <AddNewTodo
                        addNewTodo={onAddTodoHandler}
                        onInputTextKeyDown={onInputTextKeyDownNewTodo}
                    />
                </Grid>
                <Grid container spacing={2} style={{padding:"5px"}}>
                    <div className={s.app__container}>

                        {todolists.map(td => {


                            return <div key={td.id}>
                                <Paper elevation={2} style={{padding:"5px", margin:"5px"}}>
                                <Mbutton
                                    callBack={() => onRemoveTodolist(td.id)}
                                    name={'remove-todo'}
                                    variant={"contained"}
                                />
                                <Todolist
                                    todolistId={td.id}
                                    title={td.title}
                                    onInputTextKeyDown={(todolistId: string, name: string) => onInputTextKeyDownHandler(todolistId, name)}
                                    onAddTask={(todolistId: string, name: string) => onAddTaskHandler(todolistId, name)}
                                  //  tasks={tasks[td.id].data}
                                    onCheckbox={onCheckboxHandler}
                                    onRemove={onRemoveTaskHandler}
                                    onFilter={onFilterHandler}
                                    filter={td.filter}
                                    onEditTaskSpanKeyPress={onEditTaskSpanKeyPressHandler}
                                    onEditHeadingKeyPress={onEditHeadingKeyPressHandler}
                                />
                                </Paper>
                            </div>
                        })}
                    </div>
                </Grid>
            </Container>
        </div>

    </>
}

export default App;
