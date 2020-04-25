import { useState } from 'react'

const useInput = (intialValue) => {
  const [value, setValue] = useState(intialValue)
  const onChange = (text) => {
    setValue(text)
  }
  return { value, onChange, setValue }
}

export default useInput
