import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import App from './App';

//REdux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from 'src/redux/store';

(async () => {
    ReactDOM.render(
        <React.StrictMode>
             <Provider store={store}>
                <PersistGate persistor={persistor}> 
                    <App />
                </PersistGate>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
})();