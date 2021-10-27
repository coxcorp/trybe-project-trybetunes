import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

// Fonte: https://github.com/tryber/sd-015-a-project-trybetunes/pull/4/files
class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: [],
      tracks: [],
      loading: true,
    };

    this.requestAlbumMusic = this.requestAlbumMusic.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);
  }

  componentDidMount() {
    this.requestAlbumMusic();
  }

  requestAlbumMusic = async () => {
    const { match: { params: { id } } } = this.props;
    await getMusics(id)
      .then((result) => {
        this.setState({
          // Primeiro objeto do array results
          artist: result[0],
          // Demais objetos do array results
          tracks: result.slice(1),
          loading: false,
        });
      });
  }

  renderAlbum() {
    const { artist, tracks } = this.state;
    return (
      <div>
        <p>Album</p>
        ;
        <h2 data-testid="album-name">{ artist.collectionName }</h2>
        <img src={ artist.artworkUrl100 } alt="ImageAlbum" />
        <h4 data-testid="artist-name">{ artist.artistName }</h4>
        {tracks.map(({ trackName, previewUrl, trackId }) => (
          <MusicCard
            key={ trackName }
            trackName={ trackName }
            previewUrl={ previewUrl }
            trackId={ trackId }
          />
        ))}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        { loading ? <Loading /> : this.renderAlbum() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
