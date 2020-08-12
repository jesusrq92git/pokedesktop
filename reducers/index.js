import { homeReducer } from './homeReducer';
import { combineReducers } from 'redux';
import { createStore } from 'redux';

function saveToLocalStorage(state){
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(e){
        console.log(e)
    }
}

function loadFromLocalStorage(){
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return undefined;
        } else {
            return JSON.parse(serializedState);
        }
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

const allReducer = combineReducers({
    homeReducer: homeReducer
});

const myStore = createStore(
    allReducer,
    loadFromLocalStorage(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

myStore.subscribe(() => saveToLocalStorage(myStore.getState()));

export default myStore;