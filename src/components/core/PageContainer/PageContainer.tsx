import React, { type JSX } from 'react'

export function PageContainer({children}: {children: JSX.Element}) {
  return (
    <div className='p-6 max-w-4xl mx-auto h-max'>
        {children}
    </div>
  )
}
