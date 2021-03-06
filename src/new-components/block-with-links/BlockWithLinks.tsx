import React from "react"
// у этого компонента дока в github pages неверная, лучше ориентироваться по коду
import Linkify from "react-linkify"

const BlockWithLinksDecorator = (href: string, text: string) => (
  // eslint-disable-next-line react/jsx-no-target-blank
  <a href={href} target='_blank'>
    {text}
  </a>
)

type BlockWithLinksProps = {
  className?: string
}

export const BlockWithLinks: React.FC<BlockWithLinksProps> = ({ children, ...props }) => {
  return (
    <Linkify {...props} componentDecorator={BlockWithLinksDecorator}>
      {children}
    </Linkify>
  )
}
