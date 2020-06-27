const fs = require("fs")
const path = require("path")
const { stringifySymbol } = require("svg-sprite-loader/lib/utils")

const path = require("path")

const matchRelativePath = /^\.\.?[/\\]/

function isAbsolutePath(str) {
  return path.posix.isAbsolute(str) || path.win32.isAbsolute(str)
}

function isRelativePath(str) {
  return matchRelativePath.test(str)
}

function stringifyRequest(loaderContext, request) {
  const splitted = request.split("!")
  const context = loaderContext.context || (loaderContext.options && loaderContext.options.context)

  return JSON.stringify(
    splitted
      .map(part => {
        // First, separate singlePath from query, because the query might contain paths again
        const splittedPart = part.match(/^(.*?)(\?.*)/)
        const query = splittedPart ? splittedPart[2] : ""
        let singlePath = splittedPart ? splittedPart[1] : part

        if (isAbsolutePath(singlePath) && context) {
          singlePath = path.relative(context, singlePath)

          if (isAbsolutePath(singlePath)) {
            // If singlePath still matches an absolute path, singlePath was on a different drive than context.
            // In this case, we leave the path platform-specific without replacing any separators.
            // @see https://github.com/webpack/loader-utils/pull/14
            return singlePath + query
          }

          if (isRelativePath(singlePath) === false) {
            // Ensure that the relative path starts at least with ./ otherwise it would be a request into the modules directory (like node_modules).
            singlePath = "./" + singlePath
          }
        }

        return singlePath.replace(/\\/g, "/") + query
      })
      .join("!")
  )
}

/**
 * Defines the runtime generator for the svg sprite loader
 *
 * @param {object} config - runtime generator context
 * @returns {string}
 */
const runtimeGenerator = ({ symbol, config, context }) => {
  const { spriteModule, symbolModule } = config

  const spriteRequest = stringifyRequest({ context }, spriteModule)
  const symbolRequest = stringifyRequest({ context }, symbolModule)

  const component = fs.readFileSync(path.resolve(__dirname, "component.js")).toString()

  return component
    .replace("'$$symbolRequest$$'", symbolRequest)
    .replace("'$$spriteRequest$$'", spriteRequest)
    .replace("$$stringifiedSymbol$$", stringifySymbol(symbol))
}

module.exports = runtimeGenerator
