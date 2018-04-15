import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
        //сделали объект вместо массива, где свойства являются id а значения - объекты
        //в таком случае значения-объекты с объетка можно получать по id (как индексатор в C#)
        //posts[id]
        console.log('reducer doing');
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            /*const post = action.payload.data;
            const newState = { ...state };
            newState[post.id] = post;
            return newState;*/
            return { ...state, [action.payload.data.id]: action.payload.data };
        case DELETE_POST:
        //если state объект содержит свойство с id = action.payload, то удалить это свойство
        //_.omit не правит текущий объект, он возвращает новый
        //не смотря на то, что при попадании на index страницу, приложение подает запрос на получение всех постов
        //лучше добавить код, для удаления поста из локальной памяти, на тот случай если интернет слабый и не успеет обновить state, пока не срендерится страница
        //в таком случае пользователь увидет список states с тем стейтом, который он только что удалил и через секунду, сервер вернет ответ, компонент перерендерится и тот пост пропадет со списка
        //но сама ситуация не очень хорошая, поэтому локально тоже лучше удалять
            return _.omit(state, action.payload);
        default:
            return state;
    }
}