import cls from "classnames";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { filterSearchWithMenuOption } from "../../store/reducer";

import st from './menu.module.scss';

const Menu = () => {
  const menu: readonly IMenu[] = useSelector(
    (state: SearchState) => state.filteredMenu,
    shallowEqual
  )
  const activeFilter: IMenu = useSelector(
    (state: SearchState) => state.menuFilter,
    shallowEqual
  )
  
  const dispatch: Dispatch<any> = useDispatch()

  const handleOnClick = (menuOption: IMenu) => {
    dispatch(filterSearchWithMenuOption(menuOption))
  }

  return (
    <ul className={st.menu}>
      <li>
        <button 
          className={cls(st.button, {[st.active]: activeFilter.label === "All"})}
          onClick={() => handleOnClick({label: "All", slug: "*"})}>
            All
        </button>
      </li>
      {menu.map((el, index) => {
        return (
          <li key={index} >
            <button 
              className={cls(st.button, {[st.active]: activeFilter.label === el.label})} 
              onClick={() => handleOnClick(el)}>
                {el.label}
            </button>
          </li>
        )
      })}
    </ul>
  );
}

export default Menu;
