import {instance} from "../../common/api/common-api";
import {PostTodolistsType} from "../todolistsLists/todolists-api";
import {LoginParamsType} from "../../common/types";


export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<PostTodolistsType<{userId?:number}>>(
            `/auth/login`,
            data
        )
    },
    logout(){
        return instance.delete<PostTodolistsType<{}>>(`/auth/login`)
    },
    me() {
        return instance.get<PostTodolistsType<{id: number, email: string, login: string}>>(`/auth/me`)
    }
}