'use client'

import { Agency, User } from '@prisma/client'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface ModalProviderProps {
    children: React.ReactNode
}

export type ModalData = {
    user?: User
    agency?: Agency
}

//Initial ModalContextType
type ModalContextType = {
    data: ModalData
    isOpen: boolean
    setOpen: (model: React.ReactNode, fetchData?: () => Promise<any>) => void
    setClose: () => void
}

//Initial State

export const ModelContext = createContext<ModalContextType>({
    data: {},
    isOpen: false,
    setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => { },
    setClose: () => { }
})

//Define State
const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<ModalData>({})
    const [showingModal, setShowingModal] = useState<React.ReactNode>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const setOpen = async (modal: React.ReactNode, fetchData?: () => Promise<any>) => {
        if (modal) {
            if (fetchData) {
                setData({ ...data, ...(await fetchData()) })
            }
            setShowingModal(modal)
            setIsOpen(true)
        }
    }
    const setClose = () => {
        setIsOpen(false)
        setData({})
    }
    if (!isMounted) return null

    return (
        <ModelContext.Provider value={{ data, isOpen, setOpen, setClose }}>
            {children}
            {showingModal}
        </ModelContext.Provider>
    )
}

//use Modal
export const useModal = () => {
    const context = useContext(ModelContext)
    if(!context){
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

export default ModalProvider