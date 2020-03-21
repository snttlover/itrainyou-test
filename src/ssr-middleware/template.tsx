import * as React from 'react'
import { HelmetData } from "react-helmet"

type TemplateOptions = {
  content?: string,
  stylesTags?: string,
  scriptsTags?: string,
  initialState?: Object | null,
  helmet: HelmetData
}

export function generateDocument(options: TemplateOptions) {
  const { content = '', stylesTags = '', scriptsTags = '', initialState = {}, helmet } = options
  return `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name=viewport>
        <link rel="stylesheet" type="text/css" href="/fonts/gilroy/fonts-list.css">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${stylesTags}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id='root'>${content}</div>
        ${initialState && `<script>
          window.__initialState__ = ${JSON.stringify(initialState)}
        </script>` || ''}
        ${scriptsTags}
      </body>
    </html>
  `
}
