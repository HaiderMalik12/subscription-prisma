import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

client.query({
  query: gql`
    {
      courses {
        id
        name
        description
      }
    }
  `
});
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
