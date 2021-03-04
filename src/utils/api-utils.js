import request from "superagent"

const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`
// const backURL = '';

//get all articles

export async function getAllArticles() {
    const response = await request.get(`${URL}?api-key=F3LeGHx8D4U6mHajI5pkGzltZXTtsCp9`)

    return response.body.response.docs;
}
export async function getAllArticlesByKeyword(keyword) {
    const response = await request.get(`${URL}?api-key=${process.env.REACT_APP_NYT_API_KEY}&q=${keyword}`)

    return response.body.response.docs;
}
