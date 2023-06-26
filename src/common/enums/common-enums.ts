export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum ResultCode {
    Success = 0,
    Error = 1,
    Captcha = 2,
}
//
// export const TaskStatuses = {
//     New: 0,
//     InProgress: 1,
//     Completed: 2,
//     Draft: 3
// } as const
// export const TaskPriorities = {
//     Low: 0,
//     Middle: 1,
//     Hi: 2,
//     Urgently: 3,
//     Later: 4
// } as const
// export const ResultCode = {
//     Success: 0,
//     Error: 1,
//     Captcha: 2,
// } as const
//
//
// export type TaskPrioritiesType = {
//     Low: number,
//     Middle: number,
//     Hi: number,
//     Urgently: number,
//     Later: number
// }
//
// export type TaskStatusesType = {
//     New: number,
//     InProgress: number,
//     Completed: number,
//     Draft: number
// }
//
// export type ResultCodeType = {
//     Success: number,
//     Error: number,
//     Captcha: number,
// }