export const setAuthToken = (token: string): void => {
    localStorage.setItem('token', token);
}

export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
}

export const removeAuthToken = (): void => {
    localStorage.removeItem('token');
}

export const login = (username: string, password: string) => {
  // Add your login logic here
};
