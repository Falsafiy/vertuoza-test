import {gql} from '@apollo/client';
export const GET_ENTITIES = gql`
    query GetEntities {
        getEntities {
            ... on Contact {
                id
                name
                email
                phone
            }
            ... on Company {
                id
                name
                industry
                contactEmail
            }
        }
    }
`;