import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

export default function Header({title , onAdd , showAdd}) {


  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color ={showAdd ? 'red' :'green'} text = {showAdd ? 'Close' : 'Add'} onClick = {onAdd}/>
    </header>
  )
}

Header.defaultProps = {
  title : "Task Tracker"
}

Header.proptype = {
  title : PropTypes.string.isRequired,
}
