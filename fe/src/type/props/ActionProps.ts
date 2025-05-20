import { AxiosError } from "axios" 

export type ActionProps = {
    onSuccess: ()=>void
    onError?: (e:AxiosError)=>void
}