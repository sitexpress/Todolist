import {AppRootStateType} from "./store";

export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppError = (state: AppRootStateType) => state.app.error
export const selectAppInitialized = (state: AppRootStateType) => state.app.isInitialized