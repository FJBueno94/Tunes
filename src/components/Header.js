import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      usuario: '',
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      loading: false,
      usuario: user.name,
    });
    console.log(user.name);
  }

  render() {
    const {
      loading,
      usuario,
    } = this.state;

    return (
      <header data-testid="header-component">
        {
          loading ? (<Carregando />) : (
            <>
              <div>
                <h3 data-testid="header-user-name">
                  {usuario}
                </h3>
              </div>
              <div>
                <Link to="/search" data-testid="link-to-search">Pesquisar </Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favoritos </Link>
                <Link to="/profile" data-testid="link-to-profile">Perfil </Link>
              </div>

            </>)
        }
      </header>
    );
  }
}
