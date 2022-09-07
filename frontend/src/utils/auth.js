export const baseUrl = 'http://localhost:3000';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

// const checkResponse = (res) => {
//     return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
//     }


    export const register = ({email, password}) => {
        return fetch(`${baseUrl}/signup`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
    .then(checkResponse);
};

export const login = ({email, password}) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(checkResponse);
};

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(checkResponse)
};


