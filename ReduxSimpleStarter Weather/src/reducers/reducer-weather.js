import { FETCH_WEATHER } from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_WEATHER:
            //concat не меняет существующий array, он возвращает новый
            //return state.concat([action.payload.data]);
            return [action.payload.data, ...state];//тоже самое что и concat

    }
    return state;
}