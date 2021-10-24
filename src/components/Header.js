import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div>
        <nav>
          <Link to="/search">Pesquisa</Link>
          <Link to="/favorites">Favoritas</Link>
          <Link to="/profile">Perfil</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
