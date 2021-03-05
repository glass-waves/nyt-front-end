import React, { Component } from 'react'
import { getAllArticles, getAllArticlesByKeyword, getFavorites, saveFavorite } from './utils/api-utils'

export default class SearchPage extends Component {
    state = {
        articles: [],
        favorites: [],
        token: '',
        keyword: ''
    }
    componentDidMount = async () => {
        const articles = await getAllArticles();
        const favorites = await getFavorites(this.props.token);
        this.setState({
            articles: articles,
            favorites: favorites,
            token: this.props.token
        })
    }
    handleInputChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }
    submitHandler = async (e) => {
        e.preventDefault();
        const searchedArticles = await getAllArticlesByKeyword(this.state.keyword);
        console.log('searched articles', searchedArticles)
        this.setState({
            articles: searchedArticles
        })
    }
    handleAddToFavorites = async (article, token) => {
        const favObj = {
            article_id: article._id || 'N/A',
            headline: article.headline.main || 'N/A',
            byline: article.byline.original || 'N/A',
            image: article.multimedia[0].legacy.xlarge || '',
            snippet: article.snippet,
            paragraph: article.lead_paragraph || 'N/A',
            url: article.web_url || 'N/A',
        }
        saveFavorite(favObj, token);
        const favorites = await getFavorites(this.props.token);
        this.setState({
            favorites
        })
    }
    favoriteAlready = (article) => {
        if (!this.state.token) return true;

        const isFav = this.state.favorites.find(favorite => favorite.article_id === article._id)

        return isFav
    }
    render() {
        console.log(this.state)
        return (
            <div className="searchPage">
                <form onSubmit={this.submitHandler}>
                    <label>
                        Search by Keyword
                        <input type="text" onChange={this.handleInputChange} value={this.state.keyword} />
                        <button>Search</button>
                    </label>
                </form>
                <div className="articleCont">
                    {
                        this.state.articles.map(article =>
                            <div className='articleDiv' key={article._id}>
                                <div>
                                    <h3>{article.headline.main}</h3>
                                    <p className="byline">{article.byline.original}</p>
                                </div>
                                <div>
                                    <img src={`http://www.nytimes.com/${article.multimedia.length > 0 && article.multimedia[0].legacy.xlarge}`} alt={article.snippet} />
                                    <p>{article.lead_paragraph}</p>
                                </div>
                                <div>
                                    <a href={article.web_url}>Read entire article   on nytimes.com</a>
                                    <>{

                                        !this.favoriteAlready(article) ?

                                            <button onClick={() => this.handleAddToFavorites(article, this.state.token)}>Add to Favorites</button> : <p></p>
                                    }</>
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
        )
    }
}
