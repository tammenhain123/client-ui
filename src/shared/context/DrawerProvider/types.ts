
export interface IThemeProvider {
  children: JSX.Element;
}

export interface IDrawerContext {
  isDrawerOpen: boolean
  drawerOptions: IDrawerOption[]
  setDrawerOptions : (setDrawerOptions: IDrawerOption[]) => void
  toggleDrawer: () => void
}

export interface IDrawerOption {
  icon: string
  path: string
  label: string
}

