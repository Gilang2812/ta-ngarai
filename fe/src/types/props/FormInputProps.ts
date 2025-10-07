import { IconType } from "react-icons";

export type FormInputProps ={
    label?: string;
    icon?: IconType;
    type: string;
    name: string;
    value?: string|number;
    placeholder?: string;
    readonly?:boolean
    as?:string
    required?:boolean;
    children?:React.ReactNode
    rows?:number;
    onInput?:(e:React.FormEvent<HTMLInputElement>)=>void
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
    min?: string|number
  }