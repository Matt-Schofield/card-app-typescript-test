import { useState } from "react"

export default function ToggleSlider() {
    const [toggled, setToggle] = useState(false)

    function toggle() {
        document.body.classList.remove(toggled ? "darkTheme" : "lightTheme")
        document.body.classList.add(toggled ? "lightTheme" : "darkTheme")

        setToggle(!toggled)
    }

    return(
        <div className="flex flex-col basis-20 justify-center flex-none gap-1">
            <div className="flex align-center justify-center">
                <button onClick={toggle} className={`relative w-14 h-7 rounded-full outline outline-1 ${(toggled ? "bg-button outline-button-hover" : "bg-card outline-slate-300")}`}>
                    <div className={`absolute bottom-1/2 translate-y-1/2 left-0.5 bg-white rounded-full w-6 h-6 outline-slate-600 outline-4 ${(toggled ? "translate-x-7" : "")}`}></div>
                </button>
            </div>
            <span className='text-center text-txt text-sm font-light'>{toggled ? "Dark Mode" : "Light Mode"}</span>
        </div>
    )
}