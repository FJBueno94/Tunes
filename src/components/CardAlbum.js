import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardAlbum extends Component {
  render() {
    const {
      img,
      albumName,
      artist,
      collectionId,
    } = this.props;
    const link = `/album/${collectionId}`;

    return (
      <div>
        <img src={ img } alt={ albumName } />
        <h2>{ albumName }</h2>
        <h4>{ artist }</h4>
        <Link to={ link } data-testid={ `link-to-album-${collectionId}` }>Ver album</Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  img: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};
