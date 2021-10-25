import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      isSaveButtonDisabled: true,
      redirect: false,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value }, () => {
      const { userName, isSaveButtonDisabled } = this.state;
      const minLength = 3;
      if (userName.length < minLength
       || isSaveButtonDisabled === '') {
        this.setState({ isSaveButtonDisabled: true });
      } else {
        this.setState({ isSaveButtonDisabled: false });
      }
    });
  }

  async handleUser() {
    this.setState(
      { loading: true, redirect: false },
      async () => {
        const { userName } = this.state;
        await createUser({ name: userName });
        this.setState({
          redirect: true,
        });
      },
    );
  }

  renderLogin() {
    const { isSaveButtonDisabled, userName } = this.state;
    return (
      <div data-testid="page-login">
        <p>Faça seu Login</p>
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            name="userName"
            value={ userName }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ isSaveButtonDisabled }
            onClick={ this.handleUser }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }

  renderLoading() {
    return (
      <span>Carregando...</span>
    );
  }

  render() {
    const { redirect, loading } = this.state;

    return (
      <div>
        { loading ? <Loading /> : this.renderLogin() }
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
