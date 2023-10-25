import { useEffect, useState } from 'react'

/**
 * Allows us to manage our local storage the same way we manage our app's state
 * @param key Key/name of the stored values
 * @param defaultValue Default value that will be saved if provided
 * @returns The state with current value and ability to set the value
 */
export const useLocalStorageState = (key: string, defaultValue: '') => {
  const [state, setState] = useState(
    () => window.localStorage.getItem(key) ?? defaultValue
  )

  useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

// Call in component:
// const [name, setName] = useLocalStorageState("name", initialValue);
