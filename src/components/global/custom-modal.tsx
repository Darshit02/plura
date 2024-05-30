import { useModal } from '@/providers/model-provider'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

type Props = {
    title: string
    subheading: string
    children: React.ReactNode
    defaultOpen?: boolean
}

const CustomModal = ({
    title,
    subheading,
    children,
    defaultOpen
}: Props) => {
    const {isOpen , setClose} = useModal()
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
        <DialogContent className='overflow-scroll md:max-h-[700] md:h-full h-screen bg-card'>
<DialogHeader className='pt-8 text-left '>
    <DialogTitle className='text-2xl font-bold'>
{title}
    </DialogTitle>
    <DialogDescription>
        {subheading}
    </DialogDescription>
    {children}
</DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CustomModal