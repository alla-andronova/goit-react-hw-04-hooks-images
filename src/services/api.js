import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (inputValue, imagePage) => {
  const URL_KEY = '21770963-1545f2c5612889ab40ecea89f';
  const response = await axios.get(
    `?image_type=photo&orientation=horizontal&q=${inputValue}&page=${imagePage}&per_page=12&key=${URL_KEY}`,
  );

  return response.data.hits;
};
