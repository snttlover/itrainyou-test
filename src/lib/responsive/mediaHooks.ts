import { useState, useEffect } from "react"

const ranges = {
  mobile: "480px",
  tablet: "800px",
  laptop: "1024px",
  desktop: "1280px",
}

export const mediaQuery = (query) => {
  const media = window.matchMedia(query)
  const [matches, setMatches] = useState()
  const handler = () => setMatches(media.matches)

  useEffect(() => {
    handler()
    media.addListener(handler)
    return () => media.removeListener(handler)
  }, [media])

  return matches
}

export const isMobile = () => mediaQuery(`(max-width: ${ranges.tablet})`)
export const isTablet = () => mediaQuery(`(min-width: ${ranges.tablet}) and (max-width: ${ranges.laptop})`)
export const isLaptop = () => mediaQuery(`(min-width: ${ranges.laptop}) and (max-width: ${ranges.desktop})`)
export const isDesktop = () => mediaQuery(`(min-width: ${ranges.desktop})`)