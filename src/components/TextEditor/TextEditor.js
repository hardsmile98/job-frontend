import React from 'react'
import { useEffect } from 'react'
import { BoldIcon, ItalicIcon, ListIcon } from '../Icons/Icons'
import classes from './TextEditor.module.css'

const TextEditor = ({ setEditer }) => {
  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, 'p')
  }, [])

  const editerHandler = () => {
    setEditer(document.getElementById('textBox').innerHTML)
  }

  const execCmd = (cmd) => {
    document.execCommand(cmd, false, null)
    document.getElementById('textBox').focus()
    editerHandler()
  }

  return (
    <div className={classes.TextEditor}>
      <div className={classes.Buttons}>
        <button onClick={() => execCmd('bold')}>
          <BoldIcon />
        </button>
        <button onClick={() => execCmd('italic')}>
          <ItalicIcon />
        </button>
        <button onClick={() => execCmd('insertUnorderedList')}>
          <ListIcon />
        </button>
      </div>

      <div
        id="textBox"
        className={classes.Field}
        onKeyUp={editerHandler}
        contentEditable></div>
    </div>
  )
}

export default TextEditor
