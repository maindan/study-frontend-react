import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription, DrawerHeader } from '@/components/ui/drawer'
import React from 'react'

type DrawerProps = {
    title?: string,
    subtitle?: string,
    open: boolean,
    onOpenChange: (open: boolean) => void,
    children?: React.ReactNode,
    cancelBtn?: boolean,
}

export function DrawerComponent({title, subtitle, open, onOpenChange, children, cancelBtn}: DrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-gray-900 text-white border-black">
            <div className="mx-auto w-full max-w-sm mb-3">
                <DrawerHeader >
                    {title && 
                        <DrawerTitle className="text-white">{title}</DrawerTitle>
                    }
                    {subtitle && 
                        <DrawerDescription>{subtitle}</DrawerDescription>
                    }
                </DrawerHeader>
                <div className="p-4 pb-0">
                    {children}
                </div>
                {cancelBtn && 
                    <Button variant="secondary" onClick={() => onOpenChange(false)} className='w-full cursor-pointer'>Cancelar</Button>
                }
            </div>
        </DrawerContent>
    </Drawer>
  )
}
