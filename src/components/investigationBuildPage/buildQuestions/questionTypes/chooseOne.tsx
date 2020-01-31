import React from 'react'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';


export interface ChooseOneProps {
  value: string,
}

const ChooseOneComponent: React.FC<ChooseOneProps> = () => {
  return (
    <div className="input-box ">
      <DragIndicatorIcon />
      <div>
        <input placeholder="Enter correct answer" />
      </div>
    </div>
  )
}

export default ChooseOneComponent