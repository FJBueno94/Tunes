import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.verifySearch = this.verifySearch.bind(this);

    this.state = {
      artist: '',
      disabledButton: true,
    };
  }

  verifySearch({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });

    const { artist } = this.state;
    const minChar = 1;
    if (artist.length >= minChar) {
      this.setState({
        disabledButton: false,
      });
    }
    if (artist.length < minChar) {
      this.setState({
        disabledButton: true,
      });
    }
  }

  render() {
    const {
      artist,
      disabledButton,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <main>
          <input
            type="text"
            id="searchInput"
            name="artist"
            value={ artist }
            placeholder="Pesquise um artista"
            data-testid="search-artist-input"
            onChange={ this.verifySearch }
          />
          <button
            type="button"
            id="search"
            data-testid="search-artist-button"
            disabled={ disabledButton }
            // onClick={ this.verifyUser }
          >
            Pesquisar
          </button>
        </main>
      </div>
    );
  }
}

export default Search;
