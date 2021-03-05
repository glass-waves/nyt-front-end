import React, { Component } from 'react'
import { getFavorites, removeFavorite } from './utils/api-utils'

export default class FavoritesPage extends Component {
    state = {
        favorites: []
    }
    componentDidMount = async () => {
        await this.fetchFavorites()
    }
    handleRemove = async(_id) => {
        await removeFavorite(_id, this.props.token)
        await this.fetchFavorites()

    } 
    fetchFavorites = async () => {
        const favorites = await getFavorites(this.props.token);
        this.setState({
            favorites
        })
    }
    render() {
        return (
            <div>
                {this.state.favorites.length === 0 && <p className="noFavs">No favorites to show yet!</p>}
                {this.state.favorites.length > 0 && this.state.favorites.map(favorite => {
                    return <div className='articleDiv' key={favorite.id}>
                        <div>
                            <h3>{favorite.headline}</h3>
                            <p className="byline">{favorite.byline}</p>
                        </div>
                        <div>
                            <img src={`http://www.nytimes.com/${favorite.image}`} alt={favorite.snippet} />
                            <p>{favorite.paragraph}</p>
                        </div>
                        <div>
                            <a href={favorite.url}>Read entire article on nytimes.com</a>
                            <button onClick={() => this.handleRemove(favorite.id)}>Remove from Favorites</button>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}
 