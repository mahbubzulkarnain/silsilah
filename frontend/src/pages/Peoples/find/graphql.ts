import gql from 'graphql-tag';

import client from '../../../utils/graphql'

export default async () => {
    const {data: {peoples: {edges: data}}} = await client.query({
        query: gql`
            query {
                peoples {
                    edges {
                        id
                        address
                        blood_type
                        date_of_birth
                        date_of_death
                        email
                        gender
                        nick_name
                        phone
                        profile_picture
                        sure_name
                        createdAt
                        updatedAt
                    }
                }
            }
        `,
      fetchPolicy: 'no-cache'
    });

  return data;
}
