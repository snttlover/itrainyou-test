import { date } from "@/application/lib/helpers/date"

export const formatISOStringToLocaleDateString = (iso: string, format: string) => {
  const localDate = date(iso)

  if (!localDate.isValid()) return "Invalid Date"

  return date(iso).format(format)
}
