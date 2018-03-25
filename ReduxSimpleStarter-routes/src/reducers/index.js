import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  //подключаем reducerForm для наших редьюсеров. Асайнить его надо для ключа form
  form: formReducer
});

export default rootReducer;
