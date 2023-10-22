import React from 'react'
import Task from './Task'

export default function Tasks({tasks , onDelete , onToggle}) {

  return (
    <div>
      {tasks.map( (task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
      ))}
    </div>
  )
}
