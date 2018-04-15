import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import PostIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsNewMaterialUI from './components/posts_new_materialUI';
import PostsShow from './components/posts_show';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/posts/newMUI" component={PostsNewMaterialUI} />
            <Route path="/posts/:id" component={PostsShow} />
            <Route path="/" component={PostIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('.container'));
