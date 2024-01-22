import axios from 'axios';

export async function getImages(
  name,
  MY_KEY,
  currentPage,
  numberOfImagesPerPage
) {
  const searchParams = new URLSearchParams({
    key: MY_KEY,
    per_page: numberOfImagesPerPage,
    page: currentPage,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return await axios
    .get(`/api/?${searchParams}`)
    .then(response => {
      return response.data;
    })
    .then(photos => {
      return photos;
    });
}