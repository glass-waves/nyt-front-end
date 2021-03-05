const USER = 'USER';

export function storeTokenInLocalStorage(token){
    localStorage.setItem(USER, token)
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem(USER);
} 