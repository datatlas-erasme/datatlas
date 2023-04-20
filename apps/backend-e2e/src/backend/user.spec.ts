import axiosFactory from 'axios';
import { CreateUserDto, Roles } from '@datatlas/models';
import { describe, expect, it } from '@jest/globals';


const axios = axiosFactory.create();
axios.defaults.validateStatus = () => true;

describe('USER ACTIONS', () => {
  /*
      TEST TO MAKE IN THIS ORDER :
      - Test reaching API (really useful).
      - Creating, reading, updating and deleting a new user as editor wth fake jwt.
      - Creating, reading, updating and deleting a new user as editor with correct jwt.
      - Creating, reading, updating and deleting a new user as admin with fake jwt.
      - Creating, reading, updating and deleting a new user as admin with correct jwt
   */
  const user_test_editor: CreateUserDto = {
    username: 'user_test_editor_20',
    password: 'user_test_pw',
    role: Roles.EDITOR,
    active: true,
  };
  const user_test_admin: CreateUserDto = {
    username: 'user_test_admin_20',
    password: 'user_test_pw',
    role: Roles.ADMIN,
    active: true,
  };
  let jwtEditorUser;
  let idEditorUser;
  let jwtAdminUser;
  let idUserTestEditor;

  it('User -> can reach API', async () => {
    const response = await axios.get('/api/user');
    expect(response.status).toBe(200);
  });
  // // CONNECTING
  // it('Auth -> Connecting correctly with editor user.', async () => {
  //   const response = await axios.post('/api/auth/login', {
  //     username: 'editor',
  //     password: 'editor',
  //   });
  //   jwtEditorUser = response.data.access_token;
  //   idEditorUser = response.data.user_id;
  // });
  // it('Auth -> Connecting correctly with admin user.', async () => {
  //   const response = await axios.post('/api/auth/login', {
  //     username: 'admin',
  //     password: 'admin',
  //   });
  //   jwtAdminUser = response.data.access_token;
  //   expect(response.status).toBe(201);
  // });
  // // CREATING
  // it('Editor -> creation of new user -> should fail.', async () => {
  //   const response = await axios.post('/api/user', {
  //     data: user_test_editor,
  //     headers: { Authorization: `Bearer ${jwtEditorUser}` },
  //   });
  //   expect(response.status).toBe(403);
  // });
  // it('Admin -> creation of new editor user -> should not fail.', async () => {
  //   const response = await axios.post('/api/user', {
  //     data: user_test_editor,
  //     headers: { Authorization: `Bearer ${jwtAdminUser}` },
  //   });
  //   idUserTestEditor = response.data;
  //   expect(response.status).toBe(201);
  //   expect(response.data).toBeGreaterThan(0);
  // });
  // it('Admin -> creation of same new editor user -> should not fail but returns 0.', async () => {
  //   const response = await axios.post('/api/user', {
  //     data: {
  //       username: user_test_editor.username,
  //       password: 'random_string',
  //       role: 'WHATEVER',
  //       active: false,
  //     },
  //     headers: { Authorization: `Bearer ${jwtAdminUser}` },
  //   });
  //
  //   expect(response.status).toBe(201);
  //   expect(response.data).toBeGreaterThan(0);
  // });
  // it('Admin -> creation of new admin user -> should not fail.', async () => {
  //   const response = await axios.post('/api/user', {
  //     data: user_test_admin,
  //     headers: { Authorization: `Bearer ${jwtAdminUser}` },
  //   });
  //
  //   expect(response.status).toBe(201);
  //   expect(response.data).toBeGreaterThan(0);
  // });
  // // READING
  // it('Editor -> Get info about another user as an editor -> should fail.', async () => {
  //   const response = await axios.get('/api/user/' + idUserTestEditor, {
  //     headers: { Authorization: `Bearer ${jwtEditorUser}` },
  //   });
  //   expect(response.status).toBe(403);
  // });
  // it('Admin -> Get info about another user as an admin -> should not fail.', async () => {
  //   const response = await axios.get('/api/user/' + idEditorUser, {
  //     headers: { Authorization: `Bearer ${jwtAdminUser}` },
  //   });
  //   expect(response.status).toEqual(200);
  //   expect(response.data.id).toEqual(idEditorUser);
  //   expect(response.data.username).toEqual('editor');
  //   expect(response.data.role).toEqual('EDITOR');
  //   expect(response.data.active).toBe(true);
  // });
  // // UPDATING
  // it('Editor -> Modification of self is forbidden (for now)-> should fail.', async () => {
  //   const response = await axios.put('/api/user/' + idEditorUser, {
  //     data: {
  //       username: 'editor',
  //       password: 'editor_pw_modified',
  //       role: 'EDITOR',
  //       active: true,
  //     },
  //     headers: { Authorization: `Bearer ${jwtEditorUser}` },
  //   });
  //   expect(response.status).toBe(403);
  // });
  // it('Editor -> Modification of other users is forbidden -> should fail.', async () => {
  //   const response = await axios.put('/api/user/' + idUserTestEditor, {
  //     data: {
  //       username: 'editor',
  //       password: 'editor_pw_modified',
  //       role: 'EDITOR',
  //       active: true,
  //     },
  //     headers: { Authorization: `Bearer ${jwtEditorUser}` },
  //   });
  //   expect(response.status).toBe(403);
  // });
  // it('Admin -> Modification of other users with existing username -> should fail.', async () => {
  //   const response = await axios.put('/api/user/' + idUserTestEditor, {
  //     data: {
  //       username: 'editor',
  //       password: 'editor_pw_modified',
  //       role: 'EDITOR',
  //       active: true,
  //     },
  //     headers: { Authorization: `Bearer ${jwtAdminUser}` },
  //   });
  //   expect(response.status).toBe(500);
  // });
  // it('Admin -> Modification of other users -> should not fail.', async () => {
  //   const response = await axios.put('/api/user/' + idUserTestEditor, {
  //     data: {
  //       username: 'random_name_jkclsbdkj',
  //       password: 'editor_pw_modified',
  //       role: 'EDITOR',
  //       active: true,
  //     },
  //     headers: { Authorization: `Bearer ${jwtAdminUser}` },
  //   });
  //   expect(response.status).toBe(204);
  // });
  // it('Editor -> Deletion of any user -> should fail.', async () => {
  //   const response = await axios.delete('/api/user/' + idUserTestEditor, {
  //     headers: { Authorization: `Bearer ${jwtEditorUser}` },
  //   });
  //
  //   expect(response.status).toBe(403);
  // });
  // it('Admin -> Deletion of editor created for tests -> should not fail.', async () => {
  //   const response = await axios.delete('/api/user/' + idUserTestEditor, {
  //     headers: { Authorization: `Bearer ${jwtAdminUser}` },
  //   });
  //   expect(response.status).toBe(204);
  // });
});
