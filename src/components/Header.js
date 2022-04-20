import React, { Component } from 'react';
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
            <h3 data-testid="header-user-name">
              { usuario }
            </h3>)
        }
      </header>
    );
  }
}
