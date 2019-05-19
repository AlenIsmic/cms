export type UserGroup = {
    name: string
};

export type User = {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    groups: Array<UserGroup>,
};