import GlobalSearch from './pages/GlobalSearch';
import App from './App';

const Routes = [{
  ...App,
  routes: [
    {
      ...GlobalSearch,
      path: '/',
      exact: true,
    }
  ],
}];

export default Routes;