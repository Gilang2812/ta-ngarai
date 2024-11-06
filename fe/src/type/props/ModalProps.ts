export type ModalProps ={
    isOpen: boolean,
    closeModal: () => void  
}

export type UseModal ={
    isOpen: boolean,
    openModal: (content: React.ReactNode) => void,
    onClose: () => void
}