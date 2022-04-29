import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.REACT_APP_HASURA_ENDPOINT,
    cache: new InMemoryCache(),
    headers: { "x-hasura-admin-secret": process.env.REACT_APP_HASURA_ADMIN_SECRET },
});

export default client;
