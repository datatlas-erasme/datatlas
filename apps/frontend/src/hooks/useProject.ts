import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { selectProjectById } from '../store/selectors';
import { getProject } from '../store/api';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/reducers';
import { LoadingProjectInterface } from '@datatlas/models';

export function useProject() {
  const { id } = useParams();
  getProject.useQuery(id ? +id : skipToken);
  return useSelector<RootState, LoadingProjectInterface | undefined>((state) => selectProjectById(state, id));
}
