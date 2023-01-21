export interface LoginFormData {
    username: string;
    password: string;
};

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}