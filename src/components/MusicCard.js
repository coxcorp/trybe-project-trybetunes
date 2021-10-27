import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };

    this.favoriteList = this.favoriteList.bind(this);
    this.favs = this.favs.bind(this);
  }

  componentDidMount() {
    this.favs();
  }

  favs() {
    const { trackName, favorites } = this.props;
    if (favorites.some((element) => element.trackName === trackName)) {
      this.setState({ checked: true });
    }
  }

  async favoriteList({ target: { name } }) {
    const { checked } = this.state;
    const { getFavorite } = this.props;
    if (checked) {
      this.setState({ checked: false, loading: true });
      const result = await getMusics(name);
      await removeSong(result[0]);
      this.setState({ loading: false });
      getFavorite();
    } else {
      this.setState({ loading: true, checked: true });
      const result = await getMusics(name);
      await addSong(result[0]);
      this.setState({ loading: false });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            name={ trackId }
            checked={ checked }
            onChange={ this.favoriteList }
          />
        </label>
        {(loading) && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFavorite: PropTypes.func,
};

MusicCard.defaultProps = {
  getFavorite: () => null,
};

export default MusicCard;
