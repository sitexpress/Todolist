import React, {ChangeEvent, useReducer, useState} from 'react';
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


    let [todolists, dispatchToTodolists] = useReducer<(state: TodolistsType[], action: ActionTodoType) => TodolistsType[]>(todolistsReducer,[
        {id: todolistId_1, title: 'Work', filter: 'all'},
        {id: todolistId_2, title: 'Hobbies', filter:'all'},
    ])


    const [tasks, dispatchToTasks] = useReducer<(state: TasksType, action: ActionTaskType) => TasksType>(tasksReducer, {
        [todolistId_1]: {
            data: [
                {id: v1(), name: 'Eat', isDone: false},
                {id: v1(), name: 'Sleep', isDone: false},
                {id: v1(), name: 'Rave', isDone: true},
            ]
        },
        [todolistId_2]: {
            data: [
                {id: v1(), name: 'Eat', isDone: false},
                {id: v1(), name: 'Sleep', isDone: true},
                {id: v1(), name: 'Rave', isDone: false},
            ]
        }
    })

    const onCheckboxHandler = (todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatchToTasks(action)
        // setTasks({
        //     ...tasks,
        //     [todolistId]: {
        //         ...tasks[todolistId],
        //         data: tasks[todolistId].data.map(el => el.id === taskId ? {...el, isDone} : el)
        //     }
        // })
    }

    const onInputTextKeyDownHandler = (todolistId: string, name: string) => {
            onAddTaskHandler(todolistId, name)
    }

    const onRemoveTaskHandler = (todolistId: string, taskId: string) => {
        const action = removeTasksAC(todolistId, taskId)
        dispatchToTasks(action)
        // setTasks({
        //     ...tasks,
        //     [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(t => t.id !== taskId)}
        // })
    }

    const onAddTaskHandler = (todolistId: string, name: string) => {
        const action = addTasksAC(todolistId, name)
        dispatchToTasks(action)
            // const task = {id: v1(), name: name.trim(), isDone: false}
            // setTasks({
            //     ...tasks,
            //     [todolistId]: {
            //         ...tasks[todolistId],
            //         data: [task, ...tasks[todolistId].data]
            //     }
            // })
    }

    const onEditTaskSpanKeyPressHandler = (todolistId: string, taskId: string, name: string) => {
        const action = onEditTaskAC(todolistId, taskId, name)
        dispatchToTasks(action)
        // setTasks({
        //     ...tasks,
        //     [todolistId]: {
        //         ...tasks[todolistId],
        //         data: tasks[todolistId].data.map(t => t.id === taskId ? {...t, name} : t)
        //     }
        // })
    }

    const onEditHeadingKeyPressHandler = (title: string, todolistId: string) => {
        const action = onEditHeadingAC(todolistId,title)
        dispatchToTodolists(action)
        // setTodolists(
        //     todolists.map(todo => todo.id === todolistId ? {...todo, title} : todo)
        // )
    }

    const onFilterHandler = (todolistId: string, filter: FilterType) => {
        const action = onFilterAC(todolistId, filter)
        dispatchToTodolists(action)
        // setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, filter}: todo ))
    }

    const onAddTodoHandler = (title:string) => {
        const todolistId = v1()
        const action = addNewTodolistAC(todolistId, title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
            // const newTodolistId = v1()
            // const newTodoList:TodolistsType = {id: newTodolistId, title, filter:"all"}
            // setTodolists([
            //     newTodoList, ...todolists
            // ])
            // setTasks({
            //     ...tasks,
            //         [newTodoList.id]: {...tasks[newTodoList.id], data:[]}
            // })
    }

    const onInputTextKeyDownNewTodo = (newTitle: string) => {
            onAddTodoHandler(newTitle)
    }

    const onRemoveTodolist = (todolistId:string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        // const newTasks = {...tasks}
        // delete newTasks[todolistId]
        // setTasks({...newTasks})
        // setTodolists(todolists.filter(todo => todo.id !== todolistId))
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

                            let filteredTasks = tasks[td.id].data
                            if (td.filter === 'active') {
                                filteredTasks = tasks[td.id].data.filter(t => !t.isDone)
                            }

                            if (td.filter === 'done') {
                                filteredTasks = tasks[td.id].data.filter(t => t.isDone)
                            }
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
                                    filteredTasks={filteredTasks}
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
