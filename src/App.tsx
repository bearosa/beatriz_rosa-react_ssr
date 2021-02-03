
import { renderRoutes } from 'react-router-config';

const App = ({route}: {route: any}) => {
  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  )
}

const exportable = { component: App }

export default exportable;
