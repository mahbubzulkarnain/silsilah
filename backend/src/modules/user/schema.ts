import gql from "graphql-tag";

export default gql`
    enum Roles {
        ADMIN
        USER
        GUEST
    }

    type User {
        displayName: String
        email: String!
        phoneNumber: String
        photoURL: String
        providerId: String
        uid: String
    }

    type UserMetadata {
        creationTime: String
        lastSignInTime: String
    }

    type MeResponse {
        edges: User
        message: String
        pageInfo: PageInfo
        totalCount: Int
    }

    input UserInput {
        displayName: String
        email: String!
        password: String!
        photoURL: String
        phoneNumber: String
    }

    extend type Query {
        me: MeResponse @auth(roles: [ USER ])
    }
`;
