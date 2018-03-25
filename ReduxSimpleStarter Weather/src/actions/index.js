import axios from 'axios';

const API_KEY = "c7c96cb0e97cd6904defa36ab9a0895c";
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);

    //при возвращении данного объекта, произойдет следующее
    //в файле index.js нашего app мы написали следующею строку const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
    //то есть мы в качестве middleware определили ReduxPromise. При возвращении данного объекта в reducer, мы получаем объект со свойством payload = результату промиса request
    //то есть не сам промис объект, а его результат
    //Если убрать ReduxPromise из const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore); то payload будет хранить промис
    return {
        type: FETCH_WEATHER,
        payload: request
    };
}