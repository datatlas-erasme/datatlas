import axios from 'axios';
import { describe, expect, it } from '@jest/globals';
describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
  });
});
