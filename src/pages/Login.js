import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.verifyLogin = this.verifyLogin.bind(this);

    this.state = {
      loginName: '',
      disabledButton: true,
      loading: false,
      redirect: false,
    };
  }

    verifyUser = async () => {
      const { loginName } = this.state;
      this.setState({
        loading: true,
      });
      await createUser({ name: loginName });
      this.setState({
        loading: false,
        redirect: true,
      });
    }

    verifyLogin({ target }) {
      const { name } = target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        [name]: value,
      });

      const { loginName } = this.state;
      const minChar = 2;
      if (loginName.length >= minChar) {
        this.setState({
          disabledButton: false,
        });
      }
      if (loginName.length < minChar) {
        this.setState({
          disabledButton: true,
        });
      }
    }

    render() {
      const {
        loginName,
        disabledButton,
        loading,
        redirect,
      } = this.state;

      if (redirect) {
        return (
          <Redirect to="/search" />
        );
      }
      return (
        <div data-testid="page-login">
          {
            loading ? <Carregando /> : (
              <form>
                <label htmlFor="login">
                  Nome:
                  <input
                    type="text"
                    id="login"
                    name="loginName"
                    value={ loginName }
                    placeholder="Insira seu nome"
                    onChange={ this.verifyLogin }
                    data-testid="login-name-input"
                  />
                </label>
                <button
                  type="button"
                  id="login"
                  data-testid="login-submit-button"
                  disabled={ disabledButton }
                  onClick={ this.verifyUser }
                >
                  Entrar
                </button>
              </form>
            )
          }
        </div>
      );
    }
}

export default Login;
