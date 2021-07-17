import PropTypes from 'prop-types';
import s from '../imageGalleryItem/imageGalleryItem.module.css';

export default function ImageGalleryItem({
  imgSrc,
  tags,
  onImgClick,
  largeImageURL,
}) {
  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          src={imgSrc}
          alt={tags}
          className={s.ImageGalleryItemImage}
          onClick={e => {
            onImgClick(largeImageURL);
          }}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
