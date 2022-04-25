import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class musicCard extends Component {
  render() {
    const {
      musicName,
      previewUrl,
    } = this.props;

    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

musicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
