import express from 'express';
import { matchRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Routes from '../Routes.ts';

import reducer from "../store/reducer.ts";
import renderer from './renderer';

const app = express();

const port = process.env.PORT || 3001;


app.use(express.static('dist'));

app.get('*', (req, res) => {
  const store = createStore(reducer, applyMiddleware(thunk));
  const { dispatch } = store;
  const routes = matchRoutes(Routes, req.path);
  const promises = routes.map(
    ({ route }) => (route.loadData ? route.loadData(dispatch) : null),
  );
  Promise.all(promises).then(() => {
    const content = renderer(req, store);

    res.send(content);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});