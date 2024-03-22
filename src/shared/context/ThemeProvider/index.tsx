import { createContext, useCallback, useMemo, useState } from "react"
import { IThemeContext, IThemeProvider } from "./types"
import { Box, ThemeProvider } from "@mui/material"
import { DarkTheme, LighTheme } from "../../themes"

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)


export const ThemeBaseProvider = ({ children }: IThemeProvider ) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
  }, [])

  

  const theme = useMemo(()=>{
    if(themeName === 'light') 
      return LighTheme
    
    return DarkTheme
  }, [themeName])
 
  return (
    <ThemeContext.Provider value={{themeName, toggleTheme}}>
      <ThemeProvider theme={theme}>
        <Box height='100vh' bgcolor={theme.palette.background.default}>
          {children}

        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}