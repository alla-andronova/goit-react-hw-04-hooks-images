import PropTypes from 'prop-types';
import s from '../imageList/imageGallery.module.css';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onImgClick }) {
  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map(({ webformatURL, id, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            imgSrc={webformatURL}
            id={id}
            tags={tags}
            onImgClick={onImgClick}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }),
  ).isRequired,
  onImgClick: PropTypes.func.isRequired,
};
