import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchItem: '',
      isSaveButtonDisabled: true,
      loading: false,
      searchResults: [],
      notFound: false,
      artist: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderSearchForm = this.renderSearchForm.bind(this);
    this.renderNotFound = this.renderNotFound.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value }, () => {
      const { searchItem, isSaveButtonDisabled } = this.state;
      const minLength = 2;
      if (searchItem.length < minLength
       || isSaveButtonDisabled === '') {
        this.setState({ isSaveButtonDisabled: true });
      } else {
        this.setState({ isSaveButtonDisabled: false });
      }
    });
  }

  searchArtist = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    }, async () => {
      const { searchItem } = this.state;
      const results = await searchAlbumsAPI(searchItem);
      if (results.length) {
        this.setState({
          artist: searchItem,
          searchResults: results,
        });
      } else {
        this.setState({
          notFound: true,
          artist: false,
          searchResults: false });
      }
      this.setState({
        searchItem: '',
        loading: false,

      });
    });
  }

  renderSearchForm() {
    const { isSaveButtonDisabled, searchItem } = this.state;
    return (
      <div>
        <p>Faça sua pesquisa</p>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="searchItem"
            value={ searchItem }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ isSaveButtonDisabled }
            onClick={ this.searchArtist }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }

  renderResults() {
    const { searchResults, artist, notFound } = this.state;
    return (
      <div>
        { (artist) && <p>{`Resultado de álbuns de: ${artist}`}</p> }
        { (searchResults) && searchResults
          .map(({ collectionId, collectionName, artistName, artworkUrl100 }) => (
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
              key={ collectionId }
            >
              <img src={ artworkUrl100 } alt="album" />
              <p>{ collectionName }</p>
              <p>{ artistName }</p>
            </Link>))}
        { (notFound) && this.renderNotFound() }
      </div>
    );
  }

  renderNotFound() {
    return (
      <span>Nenhum álbum foi encontrado</span>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        { this.renderSearchForm() }
        { loading ? <Loading /> : this.renderResults() }
      </div>
    );
  }
}

export default Search;
