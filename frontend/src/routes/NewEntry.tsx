import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), time: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.name == "time" ? parseTime(event.target.value) : event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };
  const parseTime = (t: any) => {
    /*
            Because the value of the input field for time is of type="time", the value field only accepts
            time formats such as "HH:MM" or "HH:MM:SS". We handle this by converting to and ISOString, splitting
            and then splicing the date value. This works, however setNewEntry extracts this string manipulated 
            value and stores it in the time property of the newEntry object.
           
            This means that when we then try to construct a new date object the Date() constructor recieves the 
            string manipulated value like so:

            value={(new Date(newEntry.time)).toISOString().split('T')[0]}

            ...evaluating to:

            value={(new Date("HH:SS")).toISOString().split('T')[0]}

            ...which creates an invalid date object, throwing an error. Hence, I have implemented this translator 
            function which reformats the value attribute back into a suitable Date object format.
        */

    if (typeof t == "object") {
      //"Fri Oct 18 2024 17:28:15 GMT+0100 (British Summer Time)"
      return t;
    } else {
      // "HH:MM" e.g. "16:43"
      let date = new Date(newEntry.created_at);
      date.setHours(t.slice(0, 2));
      date.setMinutes(t.slice(3, 5));

      return date;
    }
  };
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-card p-8 rounded-md">
      <input
        className="p-3 rounded-md"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <input
        className="p-3 rounded-md"
        type="date"
        name="created_at"
        value={new Date(newEntry.created_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <input
        className="p-3 rounded-md"
        type="time"
        name="time"
        value={new Date(newEntry.time).toISOString().split("T")[1].slice(0, 5)}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-button hover:bg-button-hover font-semibold text-button-text p-3 rounded-md"
      >
        Create
      </button>
    </section>
  );
}
//
