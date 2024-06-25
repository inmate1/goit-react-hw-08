import css from './SearchBox.module.css';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter, setNameFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const inputId = useId();

  const name = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const selectName = value => {
    dispatch(setNameFilter(value));
  };
  return (
    <div className={css.wrapper}>
      <label htmlFor={inputId}>Find contacts by name</label>
      <input
        className={css.searchInput}
        type='search'
        name='input'
        id={inputId}
        value={name}
        onChange={evt => selectName(evt.target.value)}
      />
    </div>
  );
};

export default SearchBox;
