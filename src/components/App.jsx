import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../services/api';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageList/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';

export default function App() {
  const [inputValue, setInputValue] = useState(null);
  const [images, setImages] = useState([]);
  const [reqStatus, setReqStatus] = useState('idle');
  const [imagePage, setImagePage] = useState(1);
  const [openImgUrl, setOpenImgUrl] = useState(null);

  useEffect(() => {
    if (inputValue === null) return;
    setReqStatus('loading');

    async function getImages() {
      try {
        const loadedImages = await fetchImages(inputValue, imagePage);

        if (loadedImages.length === 0) {
          throw new Error();
        }

        const newImagesArray = [...images, ...loadedImages];
        setImages(newImagesArray);
        setReqStatus('idle');

        if (imagePage > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        toast.error('There are not such images');
        setReqStatus('rejected');
      }
    }
    getImages();
  }, [inputValue, imagePage]);

  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
    setImagePage(1);
    setImages([]);
  };

  const onImageClick = bigImgUrl => {
    setOpenImgUrl(bigImgUrl);
  };

  const increseImagePage = () => {
    setImagePage(prevState => prevState + 1);
  };

  const closeModal = () => {
    setOpenImgUrl(null);
  };

  const showBtnLoadMore = reqStatus === 'idle' && images.length > 0;

  return (
    <div>
      <ToastContainer autoClose={2000} />
      {reqStatus === 'loading' && <Loader />}
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImgClick={onImageClick} />

      {showBtnLoadMore && <Button onLoadMore={increseImagePage} />}
      {openImgUrl && (
        <Modal closeModal={closeModal}>
          <img src={openImgUrl} alt="" />
        </Modal>
      )}
    </div>
  );
}
