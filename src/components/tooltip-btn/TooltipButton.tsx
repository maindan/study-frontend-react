import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import React from 'react'
import { Button, buttonVariants } from '../ui/button';
import type { VariantProps } from 'class-variance-authority';

type ToolTipBtnProps = {
    variant?: VariantProps<typeof buttonVariants>['variant'];
    children: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
    toolTip?: string;
}

export function TooltipButton({variant, children, disabled, onClick, toolTip}: ToolTipBtnProps) {
  return (
    <Tooltip>
        <TooltipTrigger asChild>
            <Button className="cursor-pointer" size="icon" variant={variant} disabled={disabled??false} onClick={onClick}>
                {children}
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>{toolTip??''}</p>
        </TooltipContent>
    </Tooltip>
  )
}
