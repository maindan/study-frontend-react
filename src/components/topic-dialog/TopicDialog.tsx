import React from 'react'
import { DialogComponent } from '../shared/Dialog/DialogComponent'

export function TopicDialog({open, onOpenChange}: {open: boolean, onOpenChange: () => void}) {

    function handleSave(): void {

    }

    return (
    <DialogComponent
        title="Tópico"
        subtitle="Informe os dados do tópico"
        open={open}
        onOpenChange={onOpenChange}
        saveBtn={handleSave}
    >
        <p>Tem algo aqui</p>

    </DialogComponent>
    )
}
