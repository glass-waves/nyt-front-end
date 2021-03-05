import request from "superagent"

const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`
const backURL = 'https://salty-tundra-66520.herokuapp.com';

//get all articles

export async function getAllArticles() {
    const response = await request.get(`${URL}?api-key=F3LeGHx8D4U6mHajI5pkGzltZXTtsCp9`)

    return response.body.response.docs;
}
export async function getAllArticlesByKeyword(keyword) {
    const response = await request.get(`${URL}?api-key=F3LeGHx8D4U6mHajI5pkGzltZXTtsCp9&q=${keyword}`)
    return response.body.response.docs;
}

export async function getFavorites(token) {
    const response = await request.get(`${backURL}/api/favorites`).set('Authorization', token);
    return response.body;
}

export async function saveFavorite(favoriteObj, token) {
    const response = await request.post(`${backURL}/api/favorites`).set('Authorization', token).send(favoriteObj);
    return response.body;
}
export async function removeFavorite(_id, token) {
    const response = await request.delete(`${backURL}/api/favorites/${_id}`).set('Authorization', token);
    return response.body;
}


export async function signupUser(email, password) {
    const response = await request.post(`${backURL}/auth/signup`).send({email, password});

    return response.body;
}

export async function loginUser(email, password) {
    const response = await request.post(`${backURL}/auth/signin`).send({email, password});

    return response.body;
}