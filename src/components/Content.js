import React from 'react';
import { Route } from 'react-router';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

class Content extends React.Component {
//   constructor() {
//     super();
//   }

  render() {
    return (
      <main className="Content">
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/" component={ Login } />
        <Route path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/search" component={ Search } />
        <Route path="*" component={ NotFound } />
      </main>
    );
  }
}

export default Content;
