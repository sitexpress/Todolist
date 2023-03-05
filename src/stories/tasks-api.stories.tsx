export const xyz = {}
// import React, {ChangeEvent, useEffect, useState} from "react";
// import { v1 } from "uuid";
// import {ItemsType, TaskPriorities, TaskStatuses, todolistAPI} from "../api/todolist-api";
//
// export default {
//     title: 'API/Tasks'
// }
//
// // Tasks --------------------------------------------------------
// // 1. GetTasks with useEffect -----------------------------------
// // export const GetTasks = () => {
// //     const [state, setState] = useState<any>(null)
// //     const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`
// //
// //     useEffect(() => {
// //         todolistAPI.getTasks(todolistId)
// //             .then((res) => {
// //                 setState(res.data.items)
// //             })
// //
// //     }, [])
// //     return <div>{JSON.stringify(state)}</div>
// // }
//
// // 1.1 GetTasks ------------------------------------------------
// export const GetTasks = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoIdValue, setTodoIdValue] = useState<string>('')
//     // const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`
//
//     const getHandler = () => {
//         todolistAPI.getTasks(todoIdValue)
//             .then((res) => {
//                 setState(res.data.items)
//             })
//         setTodoIdValue('')
//     }
//
//     const onChangeGetHandler = (e:ChangeEvent<HTMLInputElement>) => {
//         setTodoIdValue(e.currentTarget.value)
//     }
//
//     return <>
//         <h3>Get tasks of certain Todolist by its ID: </h3>
//
//         <input type="text" value={todoIdValue} placeholder={"todolist id:"} onChange={onChangeGetHandler}/>
//         <button onClick={getHandler}>get tasks</button>
//
//         <div><span><b>Amount of tasks:  </b></span><b>{state !== null ? state.length : 0}</b></div>
//         <div><span><b>Response: </b></span>{JSON.stringify(state)}</div>
//
//     </>
// }
//
// // 2. CreateTask with useEffect -----------------------------------------
// // export const CreateTask = () => {
// //     const [state, setState] = useState<any>(null)
// //     const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`
// //     const title = `New Task Title >>>>>>>>>>>>>>`
// //
// //     useEffect(() => {
// //         todolistAPI.createTask(todolistId,title)
// //             .then((res) => {
// //                 setState(res.data.data)
// //             })
// //
// //     }, [])
// //     return <div>{JSON.stringify(state)}</div>
// // }
//
// // 2. CreateTask ------------------------------------------------
// export const CreateTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoIdValue, setTodoIdValue] = useState<string>('')
//     const [taskTitleValue, setTaskTitleValue] = useState<string>('')
//     // const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`
//
//     const createHandler = () => {
//         todolistAPI.createTask(todoIdValue,taskTitleValue)
//             .then((res) => {
//                 setState(res.data.data)
//             })
//         setTodoIdValue('')
//         setTaskTitleValue('')
//     }
//
//     const onChangeTodoIdHandler = (e:ChangeEvent<HTMLInputElement>) => {
//         setTodoIdValue(e.currentTarget.value)
//     }
//
//     const onChangeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
//         setTaskTitleValue(e.currentTarget.value)
//     }
//
//
//     return <>
//         <h3>Create task in certain Todolist by its ID, with certain title:</h3>
//
//         <input type="text" value={todoIdValue} placeholder={"todolist id:"} onChange={onChangeTodoIdHandler}/>
//         <input type="text" value={taskTitleValue} placeholder={"task title:"} onChange={onChangeTaskTitleHandler}/>
//         <button onClick={createHandler}>create task</button>
//
//         <div><span><b>Response: </b></span>{JSON.stringify(state)}</div>
//
//     </>
// }
//
// // 3. UpdateTask with useEffect ------------------------------------------------
// // export const UpdateTask = () => {
// //     const [state, setState] = useState<any>(null)
// //     const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`
// //     const taskId = `232812f1-1576-4d58-8f81-d3bbaf7d276b`
// //     const title = `Super New Task Title`
// //
// //     useEffect(() => {
// //         todolistAPI.updateTask(todolistId, title, taskId)
// //             .then((res) => {
// //                 setState(res.data.data)
// //             })
// //
// //     }, [])
// //     return <div>{JSON.stringify(state)}</div>
// // }
//
//
// // 3. UpdateTask ---------------------------------------------------------
// export const UpdateTask = () => {
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//     const [state, setState] = useState<any>(null)
//     const [todoIdValue, setTodoIdValue] = useState<string>('')
//     const [taskIdValue, setTaskIdValue] = useState<string>('')
//     const [taskTitleValue, setTaskTitleValue] = useState<ItemsType>({
//         [todolistId1]: [
//             {
//                 description: '',
//                 title: 'Eat',
//                 completed: false,
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 id: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 description: '',
//                 title: 'Sleep',
//                 completed: false,
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 id: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 description: '',
//                 title: 'Rave',
//                 completed: false,
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 id: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             }
//         ],
//         [todolistId2]: [
//             {
//                 description: '',
//                 title: 'Eat',
//                 completed: false,
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 id: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 description: '',
//                 title: 'Sleep',
//                 completed: false,
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 id: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 description: '',
//                 title: 'Rave',
//                 completed: false,
//                 status: TaskStatuses.New,
//                 priority: TaskPriorities.Low,
//                 startDate: '',
//                 deadline: '',
//                 id: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             }
//         ]
//     })
//     // const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`
//
//     const updateHandler = () => {
//         todolistAPI.updateTask(todoIdValue, taskIdValue, taskTitleValue)
//             .then((res) => {
//                 setState(res.data.data)
//             })
//         setTodoIdValue('')
//         setTaskIdValue('')
//         setTaskTitleValue('')
//     }
//
//     const onChangeTodoIdHandler = (e:ChangeEvent<HTMLInputElement>) => {
//         setTodoIdValue(e.currentTarget.value)
//     }
//
//     const onChangeTaskIdHandler = (e:ChangeEvent<HTMLInputElement>) => {
//         setTaskIdValue(e.currentTarget.value)
//     }
//
//     const onChangeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
//         setTaskTitleValue(e.currentTarget.value)
//     }
//
//
//     return <>
//         <h3>Update certain task in certain Todolist by their ID's:</h3>
//
//         <input type="text" value={todoIdValue} placeholder={"todolist id:"} onChange={onChangeTodoIdHandler}/>
//         <input type="text" value={taskIdValue} placeholder={"task id:"} onChange={onChangeTaskIdHandler}/>
//         <input type="text" value={taskTitleValue} placeholder={"task title:"} onChange={onChangeTaskTitleHandler}/>
//         <button onClick={updateHandler}>create task</button>
//
//         <div><span><b>Response: </b></span>{JSON.stringify(state)}</div>
//
//     </>
// }
//
//
// // 4. DeleteTask with useEffect------------------------------------------------
// // export const DeleteTask = () => {
// //     const [state, setState] = useState<any>(null)
// //     const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`
// //     const taskId = `217514ca-072f-45f4-8573-0f89b54d313e`
// //
// //     useEffect(() => {
// //         todolistAPI.deleteTask(todolistId, taskId)
// //             .then((res) => {
// //                 setState(res.data.data)
// //             })
// //
// //     }, [])
// //     return <div>{JSON.stringify(state)}</div>
// // }
//
// // 4. DeleteTask ------------------------------------------------
// export const DeleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoIdValue, setTodoIdValue] = useState<string>('')
//     const [taskIdValue, setTaskIdValue] = useState<string>('')
//     // const todolistId = `d0bc11bb-eb5a-4e4f-8be0-5466af687f88`
//
//
//     const deleteHandler = () => {
//         todolistAPI.deleteTask(todoIdValue, taskIdValue)
//             .then((res) => {
//                 setState(res.data.data)
//             })
//         setTodoIdValue('')
//         setTaskIdValue('')
//     }
//
//     const onChangeTodoIdHandler = (e:ChangeEvent<HTMLInputElement>) => {
//         setTodoIdValue(e.currentTarget.value)
//     }
//
//     const onChangeTaskIdHandler = (e:ChangeEvent<HTMLInputElement>) => {
//         setTaskIdValue(e.currentTarget.value)
//     }
//
//     return <>
//         <h3>Update certain task in certain Todolist by their ID's:</h3>
//
//         <input type="text" value={todoIdValue} placeholder={"todolist id:"} onChange={onChangeTodoIdHandler}/>
//         <input type="text" value={taskIdValue} placeholder={"task id:"} onChange={onChangeTaskIdHandler}/>
//         <button onClick={deleteHandler}>delete task</button>
//
//         <div><span><b>Response: </b></span>{JSON.stringify(state)}</div>
//
//     </>
// }