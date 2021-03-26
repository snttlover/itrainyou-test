import React, { useState, useEffect } from "react"

export function useMousePosition (ref: React.MutableRefObject<HTMLDivElement | null>, callback: (position: any) => void)  {
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

export function trackMouse (ref: React.MutableRefObject<HTMLDivElement | null>, callback: (eventX: MouseEvent, eventY: MouseEvent) => void): void | (() => void) {

  //ref.current.onmousemove = handleMouseMove
  if (ref && ref.current) {
    ref.current.addEventListener("mousemove", handleMouseMove)
  }

  function handleMouseMove(event: MouseEvent & any) {
    let eventDoc, doc, body

    event = event || window.event // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document
      doc = eventDoc.documentElement
      body = eventDoc.body

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0)
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0)
    }

    // Use event.pageX / event.pageY here
    callback(event.pageX, event.pageY)
  }
}