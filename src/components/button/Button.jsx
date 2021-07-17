import PropTypes from 'prop-types';
import s from '../button/button.module.css';

export default function Button({ onLoadMore }) {
  return (
    <div className={s.wrapper}>
      <button
        className={s.Button}
        type="button"
        data-action="load-more"
        onClick={e => onLoadMore(e)}
      >
        load-more
      </button>
    </div>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
