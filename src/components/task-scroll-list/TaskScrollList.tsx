import React from 'react'
import ScrollStack, { ScrollStackItem } from '@/components/react-bits/ScrollStack'
import AnimatedList from '../AnimatedList';

export function TaskScrollList() {
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']; 
  return (
    <div className="w-full h-full flex bg-[#060010] rounded-2xl overflow-hidden">
        <AnimatedList
            items={items}
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={true}
            itemClassName="bg-[#271e37]"
            enableArrowNavigation={true}
            displayScrollbar={false}
        />
    </div>
  )
}
