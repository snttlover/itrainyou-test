const testDate = new Date(2021, 0, 17, 20, 16, 51)

if (Intl?.DateTimeFormat != null) {
  const str = testDate.toLocaleString("en-US")
  if (str.indexOf("PM") == -1 || Number.isNaN(new Date(str).valueOf())) {

    if (new Intl.DateTimeFormat("cs-CZ").formatToParts != null) {
      const original = Date.prototype.toLocaleString

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Date.prototype.toLocaleString = function (locale, opts) {
        if (locale != "en-US" || opts == null || Object.keys(opts).length != 1) {
          return original.call(this, locale, opts)
        }

        const format = new Intl.DateTimeFormat("cs-CZ", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
          timeZone: opts.timeZone
        })
        const parts = format.formatToParts(this)

        const component = (type: unknown) => {
          return parseInt(parts.filter(x => x.type == type)[0].value, 10)
        }

        return new Date(component("year"), component("month") - 1, component("day"), component("hour"), component("minute"), component("second")).toISOString()
      }
    }
  }
}
