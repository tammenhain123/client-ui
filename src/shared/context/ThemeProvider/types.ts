
export interface IThemeProvider {
  children: JSX.Element;
}

export interface IThemeContext {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

