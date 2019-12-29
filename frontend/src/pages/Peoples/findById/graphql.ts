import gql from 'graphql-tag';

import client from '../../../utils/graphql'

export const queryPeople = `id address blood_type date_of_birth date_of_death email gender nick_name phone profile_picture sure_name createdAt updatedAt`;

export default async (peopleID: string) => {
    try {
        const {data: {people: data}} = await client.query({
            query: gql`
                query People($peopleInput: PeopleInput) {
                    people(input: $peopleInput) {
                        ${queryPeople}
                        parent {
                            husband {
                                ${queryPeople}
                            }
                            wife {
                                ${queryPeople}
                            }
                            children {
                                child {
                                    ${queryPeople}
                                    couples {
                                        husband {
                                            ${queryPeople}
                                        }
                                        wife {
                                            ${queryPeople}
                                        }
                                        children {
                                            child {
                                                ${queryPeople}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        couples {
                            husband {
                                ${queryPeople}
                            }
                            wife {
                                ${queryPeople}
                            }
                            children {
                                child {
                                    ${queryPeople}
                                }
                            }
                        }
                    }
                }
            `,
          variables: {peopleInput: {id: peopleID}},
          fetchPolicy: 'no-cache'
        });

      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
}
