import gql from 'graphql-tag';

import client from '../../../utils/graphql'

export const queryPeopleDetail = `id address blood_type date_of_birth date_of_death email gender nick_name phone profile_picture sure_name createdAt updatedAt`;
const queryParentBrother = `
parent {
    children {
        child {
            ${queryPeopleDetail}
            couples {
                husband {
                    ${queryPeopleDetail}
                }
                wife {
                    ${queryPeopleDetail}
                }
                children {
                    child {
                        ${queryPeopleDetail}
                    }
                }
            }
        }
    }
}
`;

export default async (peopleID: string) => {
    try {
        const {data: {people: data}} = await client.query({
            query: gql`
                query People($peopleInput: PeopleInput) {
                    people(input: $peopleInput) {
                        ${queryPeopleDetail}
                        parent {
                            husband {
                                ${queryPeopleDetail}
                                ${queryParentBrother}
                            }
                            wife {
                                ${queryPeopleDetail}
                                ${queryParentBrother}
                            }
                            children {
                                child {
                                    ${queryPeopleDetail}
                                    couples {
                                        husband {
                                            ${queryPeopleDetail}
                                        }
                                        wife {
                                            ${queryPeopleDetail}
                                        }
                                        children {
                                            child {
                                                ${queryPeopleDetail}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        couples {
                            husband {
                                ${queryPeopleDetail}
                            }
                            wife {
                                ${queryPeopleDetail}
                            }
                            children {
                                child {
                                    ${queryPeopleDetail}
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
