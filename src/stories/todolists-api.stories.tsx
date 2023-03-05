import React, {ChangeEvent, useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


// Todolists ------------------------------------------------------

// 1. GetTodolists with useEffect ------------------------------------------------
// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todolistAPI.getTodolists()
//             .then((res) => {
//                 setState(res)
//             })
//
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }

// 1. GetTodolists  ------------------------------------------------
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getHandler = () => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }

    return <>
        <h3>Get all todolists: </h3>

        <button onClick={getHandler}>get all todolists</button>

        <div><span><b>Amount of todolists:  </b></span><b>{state !== null ? state.length : 0}</b></div>
        <div><span><b>Response: </b></span>{JSON.stringify(state)}</div>

    </>
}

// 2. CreateTodolist with useEffect -------------------------------------------
// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     const title = 'newTodo'
//
//     useEffect(() => {
//         todolistAPI.createTodolist(title)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }

// 2. CreateTodolist -------------------------------------------
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    // const title = 'newTodo'

    const creatHandler = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    const onChangeNewTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return <>
        <h3>Get all tasks of certain Todolist by its ID: </h3>

        <input type="text" value={title} placeholder={"todolist title"} onChange={onChangeNewTitleHandler}/>
        <button onClick={creatHandler}>create new todolist</button>

        <div><span><b>Amount of todolists:  </b></span><b>{state !== null ? state.length : 0}</b></div>
        <div><span><b>Response: </b></span>{JSON.stringify(state)}</div>

    </>
}



// 3. DeleteTodolist with useEffect------------------------------------------------
// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//
//     useEffect(() => {
//         const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`
//         todolistAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }

// 3. DeleteTodolist ------------------------------------------------
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    // const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`

    const deleteHandler = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    const onChangeNewTodoIdHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <>
        <h3>Delete certain Todolist by its ID: </h3>

        <input type="text" value={todolistId} placeholder={"todolist id:"} onChange={onChangeNewTodoIdHandler}/>
        <button onClick={deleteHandler}>delete todolist</button>

        <div><span><b>Response: </b></span>{JSON.stringify(state)}</div>
    </>

}


// 4. UpdateTodolistTitle with useEffect------------------------------------------------
// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//
//     useEffect(() => {
//         const todolistId = `ac328f57-3d16-431e-b832-c912610b981f`
//         const title = 'React >>>>>>'
//         todolistAPI.updateTodolist(todolistId, title)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }

// 4. UpdateTodolistTitle ------------------------------------------------
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [todoTitle, setTodoTitle] = useState<any>(null)
    // const todolistId = `ac328f57-3d16-431e-b832-c912610b981f`
    // const title = 'React >>>>>>'

    const updateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, todoTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    const onChangeTodoIdHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTodoTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.currentTarget.value)
    }

    return <>
        <h3>Get all tasks of certain Todolist by its ID: </h3>

        <input type="text" value={todolistId} placeholder={"todolist ID:"} onChange={onChangeTodoIdHandler}/>
        <input type="text" value={todoTitle} placeholder={"todolist new title"} onChange={onChangeTodoTitleHandler}/>
        <button onClick={updateTodolist}>rename todolist</button>

        <div><span><b>Amount of todolists:  </b></span><b>{state !== null ? state.length : 0}</b></div>
        <div><span><b>Response: </b></span>{JSON.stringify(state)}</div>

    </>
}



