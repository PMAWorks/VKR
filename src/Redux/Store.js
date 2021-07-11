import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import ClientsReducer from "./ClientsReducer";
import EmployeeReducer from "./EmployeeReducer";
import Objectsreducer from "./ObjectsReducer";
import TechnicReducer from "./TechnicReducer";
import WorkerReducer from "./WorkerReducer";

let reducers = combineReducers({
    ObjectsPage : Objectsreducer,
    ClientsPage : ClientsReducer,
    TechnicPage : TechnicReducer,
    WorkerPage : WorkerReducer,
    EmployeePage : EmployeeReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store;