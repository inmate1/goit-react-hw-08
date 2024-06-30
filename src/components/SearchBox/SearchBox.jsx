import css from './SearchBox.module.css';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter, selectNumberFilter } from '../../redux/filters/selectors';
import { setNameFilter, setNumberFilter } from '../../redux/filters/slice';


const SearchBox = () => {
  const inputNameId = useId();
  const inputNumberId = useId();

  const name = useSelector(selectNameFilter);
  const number = useSelector(selectNumberFilter);
  const dispatch = useDispatch();

  const selectName = value => {
    dispatch(setNameFilter(value));
  };

  const selectNumber = value => {
    dispatch(setNumberFilter(value))
  }
  return (
    <div className={css.wrapper}>
      <label htmlFor={inputNameId}>Find contacts by name</label>
      <input
        className={css.searchInput}
        type='search'
        name='input'
        id={inputNameId}
        value={name}
        onChange={evt => selectName(evt.target.value)}
      />
      <label htmlFor={inputNumberId}>Find contacts by number</label>
      <input
        className={css.searchInput}
        type='search'
        name='input'
        id={inputNumberId}
        value={number}
        onChange={evt => selectNumber(evt.target.value)}
      />
    </div>
  );
};

export default SearchBox;
