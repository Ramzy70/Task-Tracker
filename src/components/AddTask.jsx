import React from 'react'
import { useState } from 'react'

export default function AddTask({onAdd}) {
    const[text, setText] = useState("")
    const[day, setDay] = useState("")
    const[reminder, setReminder] = useState(false)

    const onSubmite = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please add a task')
            return
        }

        onAdd({text, day, reminder})

        setText('')
        setDay('')
        setReminder('')
    }

  return (
    <form action="" className="add-form" onSubmit={onSubmite} >
        <div className="form-control">
            <label>Task</label>
            <input type="text" placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Day</label>
            <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder='Add Day and Time' />
        </div>
        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>

        <input type="submit" value='save task' className='btn btn-block' />

    </form>
  )
}
