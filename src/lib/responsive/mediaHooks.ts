import { useState, useEffect } from "react"

const ranges = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
}

export const mediaQuery = (query: string) => {
  const media = window.matchMedia(query)
  const [matches, setMatches] = useState(true)
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

export const biggerThenMobile = () => mediaQuery(`(min-width: ${ranges.mobile})`)
export const biggerThenTablet = () => mediaQuery(`(min-width: ${ranges.tablet})`)
export const biggerThenLaptop = () => mediaQuery(`(min-width: ${ranges.laptop})`)
export const biggerThenDesktop = () => mediaQuery(`(min-width: ${ranges.desktop})`)

// export const smallerThenMobile = () => mediaQuery(`(max-width: ${ranges.mobile})`)
// export const smallerThenTablet = () => mediaQuery(`(max-width: ${ranges.tablet})`)
// export const smallerThenLaptop = () => mediaQuery(`(max-width: ${ranges.laptop})`)
// export const smallerThenDesktop = () => mediaQuery(`(max-width: ${ranges.desktop})`)