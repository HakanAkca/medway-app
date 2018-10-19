import React, { Component } from 'react';
import { AsyncStorage, NetInfo, Alert } from 'react-native';
import { ApolloClient } from 'apollo-client-preset';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { persistCache } from 'apollo-cache-persist';

import RootContainer from './RootContainer'
import { get } from "../Api/Util";

import { YellowBox } from 'react-native';
import AppConfig from '../Config/AppConfig'
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: [
                {
                    "kind": "UNION",
                    "name": "MedicalFile",
                    "possibleTypes": [
                        {
                            "name": "Ordonnance"
                        },
                        {
                            "name": "ConsultationReport"
                        },
                        {
                            "name": "Appointment"
                        }
                    ]
                },
            ],
        },
    }
})

const cache = new InMemoryCache( { fragmentMatcher } );

const httpLink = createHttpLink({
    uri: AppConfig.urls.dev.hakan + '/graphql',
});

const authLink = setContext(async(_, { headers }) => {
    const token = await get('AUTH_TOKEN');
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
});

persistCache({
    cache,
    storage: AsyncStorage
});

class App extends Component {

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({ status: isConnected }); }
        );

        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
        MessageBarManager.unregisterMessageBar();
    }

    handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        console.log(`is connected: ${this.state.status}`);
        if (this.state.status === false) {
            MessageBarManager.showAlert({
                title: 'Signal réseaux',
                message: 'Votre réseaux internet est faible ou inexistant ',
                alertType: 'error'
            });
        }
    };

  render() {
    return (
      <ApolloProvider client={client}>
        <RootContainer  />
        <MessageBarAlert ref="alert" />
      </ApolloProvider>
    );
  }
}

export default App;