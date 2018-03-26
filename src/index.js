import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware , compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/orders';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
const logger = () => {
    return next => {
        return action => {
            console.log('[middleware] Dispatching', action);
            const result = next(action);
            console.log('[middleware] next state', store.getState());
            return result;
        }
    }
}
const rootReducers = combineReducers({
    bbrreducer : burgerBuilderReducer,
    orderreducer : orderReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers,composeEnhancers(applyMiddleware(logger, thunk)));
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
