import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./store/reducer";
import Routes from './Routes';

import './index.scss';

const store: Store<SearchState, SearchAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>  
      <BrowserRouter>
        {renderRoutes(Routes as RouteConfig[])}
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
