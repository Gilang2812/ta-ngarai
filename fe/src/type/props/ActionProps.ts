import { AxiosError } from "axios" 

export type ActionProps = {
    onSuccess: (data?:unknown)=>void
    onError?: (e:AxiosError)=>void
}