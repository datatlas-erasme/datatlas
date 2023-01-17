import { rest } from 'msw';

export const handlers = [
  rest.post('/api/projects', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: 'Dummy project',
        },
      ])
    );
  }),
];
