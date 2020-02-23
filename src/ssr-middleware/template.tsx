import * as React from 'react'

type TemplateOptions = {
  content?: string,
  stylesTags?: string,
  scriptsTags?: string,
  initialState?: Object
}

export function generateDocument(options: TemplateOptions) {
  const { content = '', stylesTags = '', scriptsTags = '', initialState = {} } = options
  return `
    <html>
      <head>
        <title>Title</title>
        ${stylesTags}
      </head>
      <body>
        <div id='root'>${content}</div>
        <script>
          window.__initialState__ = ${JSON.stringify(initialState)}
        </script>
        ${scriptsTags}
      </body>
    </html>
  `
}
