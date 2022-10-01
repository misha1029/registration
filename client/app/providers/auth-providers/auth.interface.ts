import { Dispatch, SetStateAction } from "react";
import { IUser } from "../../shared/interface/user.interface";


export type TypeUserState = IUser | null

export interface IContext {
    user: TypeUserState
    setUser: Dispatch<SetStateAction<TypeUserState>>
}