import axiosFactory from 'axios';
import { describe, expect, it } from '@jest/globals';

const axios = axiosFactory.create();
axios.defaults.validateStatus = () => true;

describe('AUTHENTIFICATION TESTS', () => {
  /*
      TESTS TO MAKE IN THIS ORDER
      - Connecting with incorrect user.

      - Connecting with proper user admin but wrong admin password.
      - Connecting correctly with admin user.
      - Check self-profile of admin user with wrong jwt.
      - Check self-profile with correct jwt.

      - Connecting with proper user editor but wrong editor password.
      - Connecting correctly with editor user.
      - Check self-profile of editor user with wrong jwt.
      - Check self-profile with correct jwt.
   */

  /*
      SENSIBLE DATA MUST BE SENT WITH COMMAND LINE AND OVERRIDE FOLLOWING DEFAULT ONES :
   */
  let jwtUser = {};
  let idUserAdmin;
  let idUserEditor;

  /*
      TESTS
   */
  it('Auth -> Connecting with incorrect user.', async () => {
    const response = await axios.post('/api/auth/login', {
      username: 'unknown_user_toto', // todo make it random (using faker ?)
      password: 'unknown_user_pw',
    });
    expect(response.status).toBe(401);
  });
  it('Auth -> Connecting with proper user admin but wrong admin password.', async () => {
    const response = await axios.post('/api/auth/login', {
      username: 'admin', // todo make it random (using faker ?)
      password: 'unknown_user_pw',
    });
    expect(response.status).toBe(401);
  });
  it('Auth -> Connecting correctly with admin user.', async () => {
    const response = await axios.post('/api/auth/login', {
      username: 'admin', // todo make it random (using faker ?)
      password: 'admin',
    });

    jwtUser = response.data.access_token;
    idUserAdmin = response.data.user_id;
    expect(response.status).toBe(201);
  });
  it('Auth -> Check self-profile of admin user with wrong jwt.', async () => {
    const response = await axios.get(`/api/user/${idUserAdmin}`, {
      headers: { Authorization: 'Bearer incorrect_jwt' },
    });

    expect(response.status).toBe(403);
  });
  it('Auth -> Check self-profile of admin user with correct jwt.', async () => {
    const response = await axios.get(`/api/user/${idUserAdmin}`, {
      headers: { Authorization: `Bearer ${jwtUser}` },
    });

    expect(response.data.id).toEqual(idUserAdmin);
    expect(response.data.role).toEqual('ADMIN');
    expect(response.data.active).toEqual(true);
    expect(response.data.username).toEqual('admin');
    expect(response.status).toBe(200);
  });
  it('Auth -> Connecting with proper editor user but wrong password.', async () => {
    const response = await axios.post('/api/auth/login', {
      username: 'editor',
      password: 'unknown_user_pw',
    });

    expect(response.status).toBe(401);
  });
  it('Auth -> Connecting correctly with editor user.', async () => {
    const response = await axios.post('/api/auth/login', {
      username: 'editor',
      password: 'editor',
    });
    jwtUser = response.data.access_token;
    idUserEditor = response.data.user_id;
    expect(response.status).toBe(201);
  });
  it('Auth -> Check self-profile of editor user with wrong jwt.', async () => {
    const response = await axios.get(`/api/user/${idUserEditor}`, {
      headers: { Authorization: `Bearer incorrect_jwt` },
    });
    expect(response.status).toBe(403);
  });
  it('Auth -> Check self-profile of editor user with correct jwt.', async () => {
    const response = await axios.get(`/api/user/${idUserEditor}`, {
      headers: { Authorization: `Bearer ${jwtUser}` },
    });
    expect(response.data.id).toEqual(idUserEditor);
    expect(response.data.role).toEqual('EDITOR');
    expect(response.data.active).toEqual(true);
    expect(response.data.username).toEqual('editor');
    expect(response.status).toBe(200);
  });
});
