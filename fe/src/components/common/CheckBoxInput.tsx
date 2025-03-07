import React from 'react'

type Props = {
    name:string
    id?:string
}

export const CheckBoxInput = ({id,name}: Props) => {
  return (
    <input className='rounded outline-none checked:bg-primary focus:border-primary focus:outline-transparent focus:ring-transparent ring-blue-500 ' type="checkbox" name={name} id={id||name} />
  )
} 