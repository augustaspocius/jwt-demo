interface User {
    email: string;
    password: string;
}

const mockUsers: User[] = [
    { email: 'augustas@pocius.lt', password: 'pass123' },
    { email: 'augustaspocius96@gmail.com', password: 'pass123' },
    { email: 'augustas@gmail.com', password: 'pass123' },
];

export { mockUsers };