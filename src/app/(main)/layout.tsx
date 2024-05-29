import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
        <div className=''>
            {children}
        </div>
        </ClerkProvider>
    )
}

export default AuthLayout