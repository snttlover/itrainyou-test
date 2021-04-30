import React, { useEffect } from "react"

export function useClickOutside<T>(ref: React.MutableRefObject<T>, callback: (e: MouseEvent & any) => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent & any) => {
      const el = ref.current
      const path = event.path || (event.composedPath && event.composedPath())
      for (const pathEl of path) {
        if (pathEl === el) return
      }
      callback(event)
    }

    // Bind the event listener
    document.addEventListener("mousedown", (e) => handleClickOutside(e))
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", (e) => handleClickOutside(e))
    }
  }, [ref])
}
