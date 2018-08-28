import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const client = new ApolloClient({
  uri: 'http://localhost:4000'
});
const coursesRawQuery = gql`
  {
    courseFeed {
      id
      name
      description
    }
  }
`;
console.log(coursesRawQuery);
client
  .query({
    query: gql`
      {
        courseFeed {
          id
          name
          description
        }
      }
    `
  })
  .then(result => console.log(result));
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
