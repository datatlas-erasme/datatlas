import React from 'react';
import Footer from '../components/footer/footer';
import { Input } from 'kepler.gl/dist/components/common/styled-components';
import { Link } from 'react-router-dom';
import Checkbox from 'kepler.gl/dist/components/common/checkbox';

export const LoginPage = () => (
  <div>
    <form>
      <label>Identifiant</label>
      <Input />
      <label>Mot de passe</label>
      <Input />
      <Link to={'#'}>Mot de passe oublié</Link>
      <button type={'submit'}>Connexion</button>
      <Checkbox>Se souvenir de moi</Checkbox>
    </form>
    <Footer />
  </div>
);
