import React, { Component } from 'react'
import { getAllArticles, saveFavorite } from './utils/api-utils'

export default class SearchPage extends Component {
    state = {
        articles: [],
        token: '',
        keyword: ''
    }
    componentDidMount = async () => {
        const articles = await getAllArticles();
        this.setState({
            articles: articles,
            token: this.props.token
        })
        console.log('state in search', this.state)
    }
    handleInputChange = (e) => {
        this.setState({
            keyword: e.target.value
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
        console.log(favObj);
        saveFavorite(favObj, token);
    }
    render() {
        console.log(this.state)
        return (
            <div className="searchPage">
                <form onSubmit={this.submitHandler}>
                    <label>
                        Search by Keyword
                        <input type="text" onChange={this.handleInputChange} value={this.state.keyword}/>
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
                                <img src={`http://www.nytimes.com/${article.multimedia.length > 0 && article.multimedia[0].legacy.xlarge}`} alt={article.snippet}/>
                                <p>{article.lead_paragraph}</p>
                            </div>
                            <div>
                                <a href={article.web_url}>Read entire article on nytimes.com</a>
                                <button onClick={() => this.handleAddToFavorites(article, this.state.token)}>Add to Favorites</button>
                            </div>
                        </div>
                    )
                }
                </div>
                
            </div>
        )
    }
}
