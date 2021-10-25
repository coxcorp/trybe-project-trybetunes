import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser()
      .then((response) => this.setState({
        userName: response.name,
        loading: false,
      }));
  }

  renderUserName() {
    const { userName } = this.state;
    return (
      <span data-testid="header-user-name">{ userName }</span>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        { loading ? <Loading /> : this.renderUserName() }
      </header>
    );
  }
}

export default Header;
