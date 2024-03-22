export interface IListItemMenuLink {
  label: string
  icon: string
  to: string
  onClick: (() => void) | undefined;
}

