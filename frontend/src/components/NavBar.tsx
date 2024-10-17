import {NavLink} from 'react-router-dom'
import ToggleSlider from './ToggleSlider'

export default function NavBar(){
    return(
      <nav className="flex justify-center h-20 align-content-center gap-5 m-5">
        <NavLink className="m-3 p-4 text-xl bg-button hover:bg-button-hover rounded-md font-medium text-button-text" to={'/'}>All Entries</NavLink>
        <NavLink className="m-3 p-4 text-xl bg-button hover:bg-button-hover rounded-md font-medium text-button-text" to={'/create'}>New Entry</NavLink>
        <ToggleSlider></ToggleSlider>
      </nav>
    )
}