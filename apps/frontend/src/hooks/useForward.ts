import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { wrapTo } from 'kepler.gl/actions';

export function useForward() {
  const { id } = useParams();
  console.log('id', id);
  const dispatch = useAppDispatch();

  return (action) => dispatch(wrapTo(id)(action));
}
