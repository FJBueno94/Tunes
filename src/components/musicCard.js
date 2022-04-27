import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class musicCard extends Component {
  constructor() {
    super();
    this.favoriteEvent = this.favoriteEvent.bind(this);
    this.state = {
      loading: false,
      checked: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    const favoriteList = await getFavoriteSongs();
    const { trackId } = this.props;
    this.setState({
      favorites: favoriteList.filter((e) => e.trackId === trackId),
    });
    const { favorites } = this.state;
    favorites.forEach((e) => {
      if (e.trackId === trackId) {
        this.setState({
          checked: true,
        });
      }
    });
  }

  async favoriteEvent() {
    const { checked } = this.state;
    if (checked === false) {
      this.setState({
        loading: true,
        checked: true,
      });
      await addSong(this.props);
    } else {
      this.setState({
        loading: true,
        checked: false,
      });
      await removeSong(this.props);
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const {
      musicName,
      previewUrl,
      trackId,
    } = this.props;

    const {
      loading,
      checked,
    } = this.state;

    return (
      <div>
        {
          loading ? (
            <Carregando />
          ) : (
            <>
              <p>{musicName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <form>
                <label htmlFor="favorita">
                  Favorita
                  <input
                    type="checkbox"
                    id="favorita"
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ this.favoriteEvent }
                    checked={ checked }
                  />
                </label>
              </form>
            </>
          )
        }

      </div>
    );
  }
}

musicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
