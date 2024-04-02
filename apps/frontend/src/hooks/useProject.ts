import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { selectProjectById } from '../store/selectors';
import { getProject } from '../store/api';
import { useAppSelector } from '../store/reducers';

export function useProject() {
  const { id } = useParams();
  getProject.useQuery(id ? +id : skipToken);
  return useAppSelector((state) => selectProjectById(state, id));
}
