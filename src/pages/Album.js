import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/musicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicas: [],
      album: [],
    };
  }

  componentDidMount() {
    this.getAlbumMusics();
  }

  async getAlbumMusics() {
    const { match: { params: { id } } } = this.props;
    const retornoApi = await getMusics(id);
    this.setState({
      // ajuda do Jhonatan com o segundo parametro de filter para "excluir" o indice 0
      musicas: retornoApi.filter((e, i) => i !== 0),
      album: retornoApi[0],
    });
  }

  render() {
    const {
      musicas,
      album,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">
          { album.artistName }
        </h2>
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <h3 data-testid="album-name">
          { album.collectionName }
        </h3>
        {
          musicas.map((e) => (
            <MusicCard
              key={ e.trackId }
              musicName={ e.trackName }
              previewUrl={ e.previewUrl }
              trackId={ e.trackId }
            />
          ))
        }
      </div>
    );
  }
}

// desestruturação necessaria para as props e junto a validação do proptypes, Ronan me ajudou aqui!!
Album.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  params: PropTypes.string,
  id: PropTypes.string,
};
Album.defaultProps = {
  match: '',
  params: '',
  id: '',
};

export default Album;
