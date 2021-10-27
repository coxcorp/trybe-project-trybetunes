// import React from 'react';
// import PropTypes from 'prop-types';
// import Loading from './Loading';
// import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

// class MusicCard extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       loading: false,
//       checked: false,
//     };

//     this.renderMusicCard = this.renderMusicCard.bind(this);
//     // this.renderFavoriteCheckbox = this.renderFavoriteCheckbox.bind(this);
//     // this.handleCheckbox = this.handleCheckbox.bind(this);
//   }

//   // componentDidMount() {
//   //   this.verifyFavoritedList();
//   // }

//   // async handleCheckbox(e) {
//   //   this.setState({
//   //     loading: true,
//   //   });
//   //   await addSong(e);
//   //   const { checked } = this.state;
//   //   if (checked) {
//   //     this.setState({ checked: !checked });
//   //     removeSong(e);
//   //   } else {
//   //     this.setState({ checked: true });
//   //   }
//   //   await getFavoriteSongs();
//   //   this.setState({ loading: false });
//   // }

//   // async verifyFavoritedList() {
//   //   const favoritedSongs = await getFavoriteSongs();
//   //   const { trackId } = this.props;
//   //   favoritedSongs.forEach((songObj) => {
//   //     if (songObj.trackId === trackId) this.setState({ checked: true });
//   //   });
//   // }

//   renderFavoriteCheckbox() {
//     const { trackName } = this.props;
//     // const { loading } = this.state;
//     return (
//       <label htmlFor={ trackName }>
//         Favorita
//         <input
//           data-testid={ `checkbox-music-${trackId}` }
//           type="checkbox"
//           id={ trackName }
//           name={ trackName }
//           // disabled={ loading }
//           onChange={ this.handleCheckbox }
//           checked={ checked }
//           // checked={ favoriteSongs
//           //   .filter((song) => song.trackId === trackId).length > 0 }
//         />
//       </label>
//     );
//   }

//   renderMusicCard() {
//     const { trackName, previewUrl } = this.props;
//     const { loading } = this.state;
//     return (
//       <div>
//         <p>{ trackName }</p>
//         <audio data-testid="audio-component" src={ previewUrl } controls>
//           <track kind="captions" />
//           O seu navegador não suporta o elemento
//           <code>audio</code>
//         </audio>
//         {/* { loading ? <Loading /> : this.renderFavoriteCheckbox() } */}
//       </div>
//     );
//   }

//   render() {
//     const { loading } = this.state;
//     return (
//       <div>
//         { loading ? <Loading /> : this.renderMusicCard() }
//       </div>
//     );
//   }
// }

// MusicCard.propTypes = {
//   previewUrl: PropTypes.string.isRequired,
//   trackName: PropTypes.string.isRequired,
// };

// export default MusicCard;
import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.favoritar = this.favoritar.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    const { trackName, favorites } = this.props;
    if (favorites.some((element) => element.trackName === trackName)) {
      this.setState({ checked: true });
    }
  }

  async favoritar({ target: { name } }) {
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
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            name={ trackId }
            id={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ this.favoritar }
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
