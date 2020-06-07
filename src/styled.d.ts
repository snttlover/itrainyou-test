import { clientTheme } from "@/application/components/layouts/themes"
import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme extends clientTheme {}
}
