import { rest } from 'msw';
import { ProjectDto } from '@datatlas/dtos';
import { generateFakeProjectDto } from '@datatlas/dtos/generators';
import { UserInterface } from '@datatlas/models';
import { generateArray, generateFakeUser } from '@datatlas/models/generators';

const currentUserId = 1;
const currentUser = generateFakeUser({ id: currentUserId });

const projectHandlers = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<ProjectDto[]>(generateArray().map((id) => generateFakeProjectDto({ id, owner: currentUserId }))),
      ctx.delay(30)
    );
  }),
  rest.post(`${process.env.REACT_APP_API_BASE_URL}/projects`, async (req, res, ctx) => {
    const payload = await req.json();
    return res(ctx.json<ProjectDto>(generateFakeProjectDto({ ...payload, owner: currentUserId })));
  }),
];

const userHandlers = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/me`, (req, res, ctx) => {
    return res(ctx.json<UserInterface>(currentUser));
  }),

  rest.get('/users', (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    if (!id) {
      throw new Error('Not found.');
    }

    return res(ctx.json(currentUser));
  }),

  rest.post(`${process.env.REACT_APP_API_BASE_URL}/login`, async (req, res, ctx) => {
    const { email } = await req.json();
    return res(ctx.json<UserInterface>({ ...currentUser, email }));
  }),
];

export const handlers = [...projectHandlers, ...userHandlers];
