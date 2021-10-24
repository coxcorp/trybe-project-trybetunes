import React from 'react';

class NotFound extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div data-testid="page-not-found">
        <p>Page not found</p>
      </div>
    );
  }
}

export default NotFound;
