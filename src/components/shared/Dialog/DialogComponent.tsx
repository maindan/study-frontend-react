import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from "@/components/ui/dialog"

type DialogProps = {
    title: string,
    subtitle?: string,
    saveBtnName?: string,
    children: React.ReactNode
    saveBtn: () => void,
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export function DialogComponent({title, subtitle, saveBtnName, children, saveBtn, open, onOpenChange}: DialogProps) {
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    { subtitle &&
                        <DialogDescription>{subtitle}</DialogDescription>
                    }
                </DialogHeader>
                    {children}

                <DialogFooter>
                    <Button variant="destructive" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={saveBtn}>{saveBtnName?? 'Salvar'}</Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>

    )
}