import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../services/api';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageList/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';

class App extends Component {
  state = {
    inputValue: null,
    images: [],
    reqStatus: 'idle',
    imagePage: 1,
    openImgUrl: null,
  };

  async componentDidUpdate(_, prevState) {
    const { inputValue, imagePage, images } = this.state;

    if (
      prevState.inputValue !== inputValue ||
      prevState.imagePage !== imagePage
    ) {
      this.setState({
        reqStatus: 'loading',
      });

      try {
        const loadedImages = await fetchImages(inputValue, imagePage);

        if (loadedImages.length === 0) {
          throw new Error();
        }

        const newImagesArray = [...images, ...loadedImages];

        this.setState({
          images: newImagesArray,
          reqStatus: 'idle',
        });

        if (imagePage > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        toast.error('There are not such images');
        this.setState({
          reqStatus: 'rejected',
        });
      }
    }
  }

  handleFormSubmit = inputValue => {
    this.setState({
      inputValue,
      imagePage: 1,
      images: [],
    });
  };

  onImageClick = bigImgUrl => {
    this.setState({
      openImgUrl: bigImgUrl,
    });
  };

  increseImagePage = () => {
    this.setState(prevState => {
      return {
        imagePage: prevState.imagePage + 1,
      };
    });
  };

  closeModal = () => {
    this.setState({
      openImgUrl: null,
    });
  };

  render() {
    const { images, reqStatus, openImgUrl } = this.state;
    const showBtnLoadMore = reqStatus === 'idle' && images.length > 0;

    return (
      <div>
        <ToastContainer autoClose={2000} />
        {reqStatus === 'loading' && <Loader />}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImgClick={this.onImageClick} />

        {showBtnLoadMore && <Button onLoadMore={this.increseImagePage} />}
        {openImgUrl && (
          <Modal closeModal={this.closeModal}>
            <img src={openImgUrl} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
