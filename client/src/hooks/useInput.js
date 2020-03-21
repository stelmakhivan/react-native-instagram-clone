import { useState } from 'react'

export default defaultValue => {
  const [value, setValue] = useState(defaultValue)

  const onChange = ({ target: { value } }) => {
    setValue(value)
  }

  return { value, onChange, setValue }
}
