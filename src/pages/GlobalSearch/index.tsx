import cls from "classnames";
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Menu from '../../components/Menu';
import { fetchSearch, filterSearchWithInput } from "../../store/reducer";

import st from './global-search.module.scss';
import PostsList from "../../components/PostsList";

const loadData = (dispatch: any) => (
  fetchSearch(dispatch)
);

const GlobalSearch = () => {

  const [showButton, setShowButton] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const posts: readonly IPost[] = useSelector(
    (state: SearchState) => state.posts,
    shallowEqual
  )

  const menu: readonly IMenu[] = useSelector(
    (state: SearchState) => state.filteredMenu,
    shallowEqual
  )

  const dispatch = useDispatch()

  useEffect(() => {
    loadData(dispatch)
  }, [dispatch]);

  const handleInputChange = (ev: React.FormEvent<EventTarget>): void => {
    setShowButton(true);
    let target = ev.target as HTMLInputElement;
    setSearchInput(target.value);
  }

  const handleOnSubmit = (ev: React.FormEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    setShowButton(false);
    dispatch(filterSearchWithInput(searchInput ??  ""))
  }

  return (
    <div className={cls(st.globalSearch, {[st.fadeIn]: posts?.length > 0})}>
      <form onSubmit={handleOnSubmit} className={st.searchContainer}>
        <input className={st.searchInput} type="text" placeholder="Type to search" value={searchInput} onChange={handleInputChange} />
        <input type="submit" className={cls(st.searchButton, {[st.show]: showButton})} value="search" />
      </form>
      <div className={st.menuResultsContainer}>
        {menu?.length > 0 && <Menu />}
        <PostsList className={st.resultsContainer} />
      </div>
    </div>
  )
}

const exportable = { component: GlobalSearch, loadData }

export default exportable;
