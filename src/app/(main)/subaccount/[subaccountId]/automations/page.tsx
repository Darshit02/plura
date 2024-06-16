import BlurePage from '@/components/global/blure-page'
import { Smile } from 'lucide-react'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <BlurePage>
      <div className='flex flex-col justify-center items-center h-screen gap-5'>
      <Smile size={70}/>
      <p className='text-2xl'>Comming soon...</p>
      </div>
    </BlurePage>
  )
}

export default page