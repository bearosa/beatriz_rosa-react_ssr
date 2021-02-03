interface IMenu {
  label: string,
  slug: string
}

interface IPost {
  category: string,
  date: string,
  description: string,
  id: string,
  slug: string,
  target: string,
  title: string,
  type: string,
  url: string
}

type SearchState =  {
  menu: IMenu[],
  posts: IPost[],
  filteredMenu: IMenu[],
  filteredPosts: IPost[],
  inputFilter: string | undefined,
  menuFilter: IMenu,
  error: any
}

type SearchAction =  {
  type: string,
  searchInput?: string,
  menu?: IMenu[],
  posts?: IPost[],
  inputFilter?: string,
  menuFilter?: IMenu,
  error?: any
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

type DispatchType = (args: SearchAction) => SearchAction