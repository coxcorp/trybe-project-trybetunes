import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchItem: '',
      isSaveButtonDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchForm = this.searchForm.bind(this);
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

  searchForm() {
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
            // onClick={ this.handleUser }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div data-testid="page-search">
        { this.searchForm() }
      </div>
    );
  }
}

export default Search;
