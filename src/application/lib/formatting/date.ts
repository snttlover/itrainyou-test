import * as dayjs from "dayjs"

export const formatISOStringToLocaleDateString = (
  iso: string,
  format: string
) => {
  const date = dayjs(iso)

  if (!date.isValid()) return 'Invalid Date'

  return dayjs(iso).format(format)
}
