export function debounce<T extends (...args: any[]) => void>(func: Function, wait: number, immediate?: boolean) {
  let timeout: ReturnType<typeof setTimeout> | undefined
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this
    const later = function() {
      timeout = undefined
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    timeout && clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
