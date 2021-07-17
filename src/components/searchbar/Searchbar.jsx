import PropTypes from 'prop-types';
import s from '../searchbar/searchBar.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={s.Searchbar}>
      <form
        onSubmit={e => {
          e.preventDefault();

          onSubmit(e.target.elements.inputValue.value);
        }}
        className={s.SearchForm}
      >
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          name="inputValue"
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
