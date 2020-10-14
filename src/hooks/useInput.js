import { useState } from 'react'

const useInput = (defalutValue = '') => {
  const [value, setValue] = useState(defalutValue)

  const onChange = (e) => setValue(e.target.value)

  return { value, setValue, onChange }
}

export default useInput
