import {combineReducers} from 'redux';
import taskReducer from './reducer';

const RootReducer = combineReducers({
    data : taskReducer
})

export default RootReducer;