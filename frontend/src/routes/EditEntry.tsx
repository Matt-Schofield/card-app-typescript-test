import {useState, useContext, ChangeEvent, MouseEvent, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {EntryContext} from '../utilities/globalContext'
import {Entry, EntryContextType} from '../@types/context'

export default function EditEntry(){
    const {id} = useParams()
    const emptyEntry: Entry = {title: "", description: "",created_at: new Date(), time: new Date()}

    const { updateEntry, entries } = useContext(EntryContext) as EntryContextType
    const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)

    useEffect(() =>{
        const entry = entries.filter(entry=> entry.id == id)[0]
        setNewEntry(entry)
    },[])
    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name] : event.target.name == "time" ? parseTime(event.target.value) : event.target.value
        })
    }
    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        updateEntry(id as string,newEntry)
    }
    const parseTime = (t : any) => {
        /*
            See "NewEntry.tsx" for an in-depth explanation of this function's purpose.
        */

        if (typeof(t) == "object") {
            //"Fri Oct 18 2024 17:28:15 GMT+0100 (British Summer Time)"
            return t
        } else {
            // "HH:MM" e.g. "16:43"
            let date = (new Date(newEntry.created_at))
            date.setHours(t.slice(0,2))
            date.setMinutes(t.slice(3,5))

            return date
        }

    };
    return(
        <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-card p-8 rounded-md">
            <input className="p-3 rounded-md" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
            <textarea className="p-3 rounded-md" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
            <input className="p-3 rounded-md" type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            <input className="p-3 rounded-md" type="time" name="time" value={(new Date(newEntry.time)).toISOString().split('T')[1].slice(0, 5)} onChange={handleInputChange}/>
            <button onClick={(e) => {handleSend(e)}} className="bg-button hover:bg-button-hover font-semibold text-button-text p-3 rounded-md">Update</button>
        </section>
    )
}