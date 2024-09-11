'use client';

import { ReactNode } from 'react';
import {ApolloProvider} from '@apollo/client';

import client from '@/graphql/client';

interface ApolloProviderProps  {
    children: ReactNode;
}

const ApolloProviderWrapper = ({ children }: ApolloProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
