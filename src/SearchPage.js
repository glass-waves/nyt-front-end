import React, { Component } from 'react'
import { getAllArticles } from './utils/api-utils'

export default class SearchPage extends Component {
    state = {
        articles: [],
        token: '',
        keyword: ''
    }
    componentDidMount = async () => {
        const articles = await getAllArticles();
        console.log(articles); 
        this.setState({
            articles
        })
    }
    render() {
        return (
            <div>
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
                            <p>{article.headline.main}</p>
                            <p>{article.byline.original}</p>
                            <img src={`http://www.nytimes.com/${article.multimedia.length > 0 && article.multimedia[0].legacy.xlarge}`} alt={article.snippet}/>
                            <p>{article.lead_paragraph}</p>
                            <a href={article.web_url}>Read entire article on nytimes.com</a>
                            <button onClick={this.handleAddToFavorites}>Add to Favorites</button>
                        </div>
                    )
                }
                </div>
                
            </div>
        )
    }
}
