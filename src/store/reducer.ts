import axios from "axios"

import * as actionTypes from "./actionTypes"

export const initialState: SearchState = {
  menu: [],
  posts: [],
  filteredMenu: [],
  filteredPosts: [],
  inputFilter: undefined,
  menuFilter: {label: "All", slug:"*"},
  error: undefined
}

const reducer = (
  state: SearchState = initialState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case actionTypes.SET_SEARCH:
      return {
        ...state,
        menu: action.menu ?? [],
        posts: action.posts ?? [],
      }
    case actionTypes.SET_SEARCH_ERROR:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.SET_SEARCH_INPUT_FILTER:
      return {
        ...state,
        inputFilter: action.inputFilter ?? undefined
      }
    case actionTypes.SET_SEARCH_MENU_FILTER:
      return {
        ...state,
        menuFilter: action.menuFilter ??  {label: "All", slug:"*"}
      }
    case actionTypes.FILTER_SEARCH:
      const inputFilteredPosts: IPost[] = state.posts.filter(
        post => (post.title.toLowerCase().includes(state.inputFilter?.toLowerCase() ?? "")
      ))

      const filteredMenu: IMenu[] = [];

      inputFilteredPosts.forEach(post => {
        const postType: IMenu | undefined = state.menu.find(menu => post.category === menu.label)
        if(postType && filteredMenu.indexOf(postType) < 0) {
          filteredMenu.push(postType);
        }
      })

      let filteredPosts: IPost[];

      if(state.menuFilter.label !== "All") {
        filteredPosts = inputFilteredPosts.filter(post => post.category === state.menuFilter.label)
      } else {
        filteredPosts = [...inputFilteredPosts]
      }

      console.log(filteredPosts);

      return {
        ...state,
        filteredPosts,
        filteredMenu
      }
  }
  
  return state
}

const setSearch  = ({menu, posts}: {menu: IMenu[], posts: IPost[]}) => ({
  type: actionTypes.SET_SEARCH,
  menu,
  posts
});

const setSearchError  = (error: any) => ({
  type: actionTypes.SET_SEARCH_ERROR,
  error,
});

const setSearchInputFilter  = (inputFilter: string) => ({
  type: actionTypes.SET_SEARCH_INPUT_FILTER,
  inputFilter,
});

const setSearchMenuFilter  = (menuFilter: IMenu) => ({
  type: actionTypes.SET_SEARCH_MENU_FILTER,
  menuFilter,
});

const filterSearch = () => ({
  type: actionTypes.FILTER_SEARCH
})

export const filterSearchWithInput  = (searchInput: string) => (
  dispatch: DispatchType
) => {
  dispatch(setSearchInputFilter(searchInput))
  dispatch(filterSearch());
};

export const filterSearchWithMenuOption  = (menuFilter: IMenu) => (
  dispatch: DispatchType
) => {
  dispatch(setSearchMenuFilter(menuFilter))
  dispatch(filterSearch());
};

export const fetchSearch = async(dispatch: DispatchType) => {
  try {
    const endpoint = "https://www.talkdesk.com/wp-json/external/globalsearch"

    const response = await axios.get(endpoint);

    const {menu, posts} = response.data;

    dispatch(setSearch({ menu, posts }));
  } catch (e) {
    dispatch(
      setSearchError({
        object: e,
      })
    );
  }
};

export default reducer