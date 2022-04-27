import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import CardAlbum from '../components/CardAlbum';

class Search extends React.Component {
  constructor() {
    super();
    this.verifySearch = this.verifySearch.bind(this);
    this.getAlbuns = this.getAlbuns.bind(this);

    this.state = {
      artistInput: '',
      disabledButton: true,
      loading: false,
      nome: '',
      albuns: [],
      firstSearch: false,
    };
  }

  async getAlbuns() {
    this.setState({
      loading: true,
    });
    const { artistInput } = this.state;
    const retornoApi = await searchAlbumsAPIs(artistInput);
    this.setState((prevState) => ({
      loading: false,
      nome: prevState.artistInput,
      artistInput: '',
      albuns: retornoApi,
      firstSearch: true,
    }));
  }

  verifySearch({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });

    const { artistInput } = this.state;
    const minChar = 1;
    if (artistInput.length >= minChar) {
      this.setState({
        disabledButton: false,
      });
    }
    if (artistInput.length < minChar) {
      this.setState({
        disabledButton: true,
      });
    }
  }

  render() {
    const {
      artistInput,
      disabledButton,
      loading,
      albuns,
      nome,
      firstSearch,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div>
          {
            loading ? (<Carregando />) : (
              <form>
                <input
                  type="text"
                  id="searchInput"
                  name="artistInput"
                  value={ artistInput }
                  placeholder="Pesquise um artista ou banda"
                  data-testid="search-artist-input"
                  onChange={ this.verifySearch }
                />
                <button
                  type="button"
                  id="search"
                  data-testid="search-artist-button"
                  disabled={ disabledButton }
                  onClick={ this.getAlbuns }
                >
                  Pesquisar
                </button>
              </form>)
          }
        </div>
        <main>

          { albuns.length > 0 && (
            <p>
              { `Resultado de álbuns de: ${nome}` }
            </p>)}
          <div>
            {
              albuns.length > 0
                && (
                  albuns.map((e) => (
                    <CardAlbum
                      key={ e.collectionId }
                      collectionId={ e.collectionId }
                      img={ e.artworkUrl100 }
                      albumName={ e.collectionName }
                      artist={ e.artistName }
                    />
                  )))
            }
            {
              firstSearch && albuns.length === 0 ? ('Nenhum álbum foi encontrado') : ('')
            }
          </div>
        </main>
      </div>
    );
  }
}

export default Search;
