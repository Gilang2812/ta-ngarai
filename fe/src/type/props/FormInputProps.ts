import { IconType } from "react-icons";

export type FormInputProps ={
    label?: string;
    icon?: IconType;
    type: string;
    name: string;
    value?: string;
    placeholder?: string;
    readonly?:boolean
    as?:string
    required?:boolean;
    children?:React.ReactNode
  }