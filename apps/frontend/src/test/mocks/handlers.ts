import { rest } from 'msw';
import {
  ProjectInterface,
  UserInterface,
  generateFakeProject,
  generateFakeUser,
  generateFakeProjects,
} from '@datatlas/models';

const projectHandlers = [
  rest.get('/api/projects', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<ProjectInterface[]>(generateFakeProjects()), ctx.delay(30));
  }),
  rest.post('/api/projects', async (req, res, ctx) => {
    const payload = await req.json();
    return res(ctx.json<ProjectInterface>(generateFakeProject(payload)));
  }),
];

const currentUserId = 1;

const userHandlers = [
  rest.get('/api/me', (req, res, ctx) => {
    return res(ctx.json<UserInterface>(generateFakeUser({ id: currentUserId })));
  }),

  rest.get('/users', (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    if (!id) {
      throw new Error('Not found.');
    }

    return res(ctx.json(generateFakeUser({ id: parseInt(id, 10) })));
  }),

  rest.post('/api/login', async (req, res, ctx) => {
    const { email } = await req.json();
    return res(
      ctx.json<UserInterface>(
        generateFakeUser({
          id: currentUserId,
          email: email,
        })
      )
    );
  }),
];

export const handlers = [...projectHandlers, ...userHandlers];
