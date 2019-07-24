import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './app';
import history from './history';
import { persistor, store } from './store';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { PersistGate } from 'redux-persist/lib/integration/react';

import LoadingView from './components/loadingView'


const link = createHttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'same-origin'
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
})

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
            <ApolloProvider client={client}>
                <Router history={history}>
                    <Route path ="/" component={App} />
                </Router>
            </ApolloProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('app')
)