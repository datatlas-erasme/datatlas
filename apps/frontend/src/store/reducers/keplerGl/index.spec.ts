import { generateFakeProjectDto } from '@datatlas/dtos';
import { addProjectToKeplerState } from './index';

describe('addProjectToState', () => {
  it('add a project as new KeplerState slice in the state', () => {
    const id = 1;
    const projectDto = generateFakeProjectDto({ id });
    const state = addProjectToKeplerState({}, projectDto);

    expect(state).not.toBe({});
    expect(state[id]).toBeDefined();

    const projectDto2 = generateFakeProjectDto();
    const nextState = addProjectToKeplerState(state, projectDto2);
    expect(Object.keys(nextState).length).toBe(2);
  });

  it('may be used with an array of projects', () => {
    const state = [generateFakeProjectDto(), generateFakeProjectDto()].reduce((previousState, projectDto) => {
      return addProjectToKeplerState(previousState, projectDto);
    }, {});
    expect(Object.keys(state).length).toBe(2);
  });
});
