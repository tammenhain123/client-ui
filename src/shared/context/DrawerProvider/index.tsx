import { createContext, useCallback, useState } from "react"
import { IDrawerContext, IDrawerOption, IThemeProvider } from "./types"

export const DrawerContext = createContext<IDrawerContext>({} as IDrawerContext)


export const DrawerProvider = ({ children }: IThemeProvider ) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([])

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
  }, [])

  const updateDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);


  
  return (
    <DrawerContext.Provider value={{drawerOptions, isDrawerOpen, toggleDrawer, setDrawerOptions: updateDrawerOptions}}>
      {children}
    </DrawerContext.Provider>
  )
}