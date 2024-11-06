import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type ButtonProps = {
  onClick: () => void;
}

export const PrevButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className='p-2 border hover:cursor-pointer border-white hover:border-primary hover:bg-primary transition-ease-in-out' onClick={onClick}>
      <FaChevronLeft className="h-6 w-6 text-white" />
    </button>
  )
}

export const NextButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className='border border-white p-2 hover:cursor-pointer hover:border-primary hover:bg-primary transition-ease-in-out' onClick={onClick}>
      <FaChevronRight className="h-6 w-6 text-white" />
    </button>
  )
}
