import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';

const http = createHttpLink({
  uri: `${process.env.REACT_APP_BASE_URL}/graphql`,
  credentials: 'include',
});

const error = onError(() => {
  // global error handling
});

const auth = setContext((_, {headers}) => ({
  headers: {
    ...headers,
  },
}));

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([auth, error, http]),
  cache,
});

export default client;
