import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import { renderPhoto } from './partalsJs/marcup.js';
import { getImages } from './partalsJs/getImages.js';
import { refreshPage } from './partalsJs/simpleBox.js';
import { makeSmoothScrolling } from './partalsJs/smoothScroll.js';

const form = document.querySelector('.submitForm');
const input = document.querySelector('.submitInput');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.loadMore');
const MY_KEY = '41590527-3cc425bd48b0e10304cc9b3d1';
axios.defaults.baseURL = 'https://pixabay.com';

form.addEventListener('submit', onSearch);

closeLoader();

loadMoreBtn.classList.add('is-hidden');
let currentPage = 1;
const numberOfImagesPerPage = 40;
let name = '';

async function onSearch(event) {
  event.preventDefault();

  currentPage = 1;
  loadMoreBtn.classList.add('is-hidden');
  gallery.innerHTML = '';
  name = input.value.trim();

  showLoader();

  errorChecking(name);

  try {
    const images = await getImages(
      name,
      MY_KEY,
      currentPage,
      numberOfImagesPerPage
    );

    if (images.hits.length === 0) {
      closeLoader();
      input.value = '';

      iziToast.error({
        title: 'Error',
        timeout: '2000',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FAFAFB',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
      return;
    }

    gallery.insertAdjacentHTML('beforeend', renderPhoto(images.hits));

    refreshPage.refresh();

    if (images.totalHits > numberOfImagesPerPage) {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      timeout: '2000',
      message: error,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  } finally {
    closeLoader();
  }
}

loadMoreBtn.addEventListener('click', isLoadMore);

async function isLoadMore() {
  event.preventDefault();

  currentPage++;

  name = input.value.trim();

  try {
    const images = await getImages(
      name,
      MY_KEY,
      currentPage,
      numberOfImagesPerPage
    );

    const totalHits = images.totalHits;
    let countPage = Math.ceil(totalHits / numberOfImagesPerPage);

    if (currentPage === countPage) {
      hiddenLoadMoreBtn();
      closeLoader();
      gallery.innerHTML += renderPhoto(images.hits);
      makeSmoothScrolling();
      input.value = '';
      iziToast.info({
        title: 'Info',
        timeout: '5000',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#FAFAFB',
        backgroundColor: '#00FF00',
        position: 'topRight',
      });
      return;
    }

    if (currentPage < countPage) {
      gallery.innerHTML += renderPhoto(images.hits);
      refreshPage.refresh();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      timeout: '2000',
      message: error,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  } finally {
    makeSmoothScrolling();
    closeLoader();
  }
}

function errorChecking(name) {
  if (name === '') {
    closeLoader();
    hiddenLoadMoreBtn();
    throw iziToast.error({
      title: 'Error',
      timeout: '1500',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  }
}

function showLoader() {
  loader.classList.remove('is-hidden');
}
function closeLoader() {
  loader.classList.add('is-hidden');
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hiddenLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}