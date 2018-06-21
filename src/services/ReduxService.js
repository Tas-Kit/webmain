import { createStore, combineReducers } from 'redux';
import reducers from '../reducers';

const dev = process.env.NODE_ENV !== 'production';
class ReduxService {
  constructor() {
    const reducer = combineReducers(reducers);
    /* eslint-disable no-underscore-dangle */
    this.store = createStore(reducer, dev && (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
    /* eslint-enable */
  }

  dispatch = (action) => {
    this.store.dispatch(action);
  }
}

const reduxStore = new ReduxService();

export const { dispatch } = reduxStore;
export default reduxStore;
