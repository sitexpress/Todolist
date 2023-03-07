import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {v1} from "uuid";
import {Todolist} from "../features/TodolistsLists/Todolist/Todolist";
import {ButtonAppBar} from "../components/AppBar/AppBar";
import {AddNewTodo} from "../components/AddNewTodo/AddNewTodo";

import s from './App.module.css'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Mbutton} from "../components/Button/Button";
import {
    addNewTodolistAC,
    changeTodolistTitleTC,
    ExtendedGetTodolistsType,
    fetchTodolistsTC,
    FilterType,
    onFilterAC,
    removeTodolistsTC,
} from "../features/TodolistsLists/todolists-reducer";
import {addTasksTC, removeTaskTC, updateTaskTC,} from "../features/TodolistsLists/tasks-reducer";
import {useAppDispatch, useAppSelector} from "./store";
import {TaskStatuses} from '../api/todolist-api';
import {TodolistsLists} from "../features/TodolistsLists/TodolistsLists";

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

    const dispatch = useAppDispatch()
    const onAddTodoHandler = useCallback(
        (title:string) => {
            const todolistId = v1()
            const action = addNewTodolistAC(todolistId, title)
            dispatch(action)
        }, [])

    const onInputTextKeyDownNewTodo = useCallback((newTitle: string) => {
        onAddTodoHandler(newTitle)
    }, [])


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
                <TodolistsLists/>
            </Container>
        </div>
    </>
}


export default App;
