import { rest } from 'msw';
import { ProjectInterface, UserInterface } from '@datatlas/shared/models';
import { generateFakeProject, generateFakeProjects, generateFakeUser } from './generators';

const projectHandlers = [
  rest.get('/api/projects', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<ProjectInterface[]>(generateFakeProjects()),
      ctx.delay(30)
    );
  }),
  rest.post('/api/projects', async (req, res, ctx) => {
    const payload = await req.json();
    return res(ctx.json<ProjectInterface>(generateFakeProject(payload)));
  }),
];

const userHandlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json<ProjectInterface[]>(generateFakeProjects()));
  }),

  rest.post('/login', async (req, res, ctx) => {
    const { username } = await req.json();
    return res(
      ctx.json<UserInterface>(
        generateFakeUser({
          email: username,
        })
      )
    );
  }),
];

export const handlers = [...projectHandlers, ...userHandlers];
