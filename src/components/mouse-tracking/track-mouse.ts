import React, { useState, useEffect } from "react"

export const useMousePosition = (ref: React.MutableRefObject<HTMLDivElement | null>, callback: (position: any) => void) => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const [positionChanged, setPositionChanged] = useState(false)

  const updateMousePosition = (ev: MouseEvent & any) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY })
  }

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener("mousemove", updateMousePosition)

      // @ts-ignore
      return () => ref.current.removeEventListener("mousemove", updateMousePosition)
    }
    return
  }, [ref])

  return callback(mousePosition)
}