import { IconType } from "react-icons"

type ControlProps = {
    icon :IconType,
    onClick: ()=>void
    label: string
}

export const MapControlItem = ({icon:Icon,onClick,label} : ControlProps)=>{
    return   <button
    title={label}
    onClick={onClick}
    aria-label="Settings"
    className="btn btn-fill-primary focus:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
  >
    <Icon fontSize="small" />
  </button>
}