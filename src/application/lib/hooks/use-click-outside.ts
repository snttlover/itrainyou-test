import React, { useEffect } from "react"

export function useClickOutside<T>(ref: React.MutableRefObject<T>, callback: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent & any) => {
      const el = ref.current
      const path = event.path || (event.composedPath && event.composedPath())
      for (const pathEl of path) {
        if (pathEl === el) return
      }
      callback()
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
