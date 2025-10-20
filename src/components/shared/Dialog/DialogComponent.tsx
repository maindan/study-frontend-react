import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from "@/components/ui/dialog"

type DialogProps = {
    title?: string,
    subtitle?: string,
    saveBtnName?: string,
    hideBtns?: boolean,
    children: React.ReactNode
    saveBtn?: () => void,
    open: boolean,
    className?: string,
    onOpenChange: (open: boolean) => void
}

export function DialogComponent({title, subtitle, hideBtns, saveBtnName, children, saveBtn, open, onOpenChange, className}: DialogProps) {
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`text-white bg-slate-950 border-slate-700 ${className}`}>

                <DialogHeader>

                    <DialogTitle>{title && title}</DialogTitle>
                    { subtitle &&
                        <DialogDescription>{subtitle}</DialogDescription>
                    }
                </DialogHeader>
                    {children}

                {hideBtns ? <></> : 
                
                    <DialogFooter>
                        <Button variant="destructive" onClick={() => onOpenChange(false)} className="cursor-pointer">Cancelar</Button>
                        <Button onClick={saveBtn} className="cursor-pointer">{saveBtnName?? 'Salvar'}</Button>
                    </DialogFooter>
                }

            </DialogContent>
        </Dialog>

    )
}