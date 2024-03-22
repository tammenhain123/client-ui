import { useContext } from "react"
import { ThemeContext } from "."

export const useThemeContext = () => {
  return useContext(ThemeContext)
}