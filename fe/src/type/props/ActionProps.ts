import { CustomError } from "./ErrorProps"

export type ActionProps = {
    onSuccess: ()=>void
    onError: (e:CustomError)=>void
}