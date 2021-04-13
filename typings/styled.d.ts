import { clientTheme } from "@/oldcomponents/layouts/themes"
import "styled-components"

declare module "styled-components" {
  type ApplicationTheme = typeof clientTheme
  export interface DefaultTheme extends ApplicationTheme {}
}
