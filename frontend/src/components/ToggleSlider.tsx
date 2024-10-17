import { useState } from "react"

export default function ToggleSlider() {
    const [toggled, setToggle] = useState(false)

    function toggle() {
        setToggle(!toggled)
    }

    return(
        <div className="flex justify-center">
            <div className={`relative w-14 h-7 rounded-full outline-2 outline transition-color duration-300 ease-in-out ${(toggled ? "bg-blue-500" : "outline-slate-600")}`}>
                <button onClick={toggle} className={`w-full h-full rounded-xl transition-color duration-300 ease-in-out ${(toggled ? "bg-blue-400" : "bg-slate-500")}`}>
                    <div className={`absolute bottom-1/2 translate-y-1/2 left-0.5 bg-white rounded-full w-6 h-6 outline-slate-600 outline-4 transition-transform duration-300 ease-in-out ${(toggled ? "translate-x-7" : "")}`}></div>
                </button>
            </div>
        </div>
    )
}