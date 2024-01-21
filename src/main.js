import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

function showNotificationError(message) {
    iziToast.error({
    message: message,
    position: 'topRight',
    timeout: 2000,
    close: false,
    overlay: false,
    displayMode: 'once',
    color: '#EF4040',
    messageColor: '#FFFFFF',
    messageSize: '16px',
    iconColor: '#FFFFFF',
    theme: 'dark',
    messageLineHeight: '24px',
    });
}

const API_KEY = '38212376-ffcb529addc704f756c0c7d48';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`;
axios.defaults.baseURL = BASE_URL;

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const perPage = 40;
let page = 1;

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
    captionClass: 'caption-style',
    close: true,
    closeText: '×',
    fadeSpeed: 250,
    animationSpeed: 250,
},);


form.addEventListener('submit', onSearch);

loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) { 
    e.preventDefault();
    gallery.innerHTML = '';
    loader.classList.add('loader-show');
    page = 1;
    const searchQuery = input.value;
    searchImages(searchQuery);
}

function onLoadMore() {
    loadMoreBtn.classList.remove('load-more-btn-show');
    loader.classList.add('loader-show');
    const searchQuery = input.value;
    searchMoreImages(searchQuery);
}

async function searchMoreImages(searchQuery) { 
        const url = `&q=${searchQuery}&per_page=${perPage}&page=${page}`;
        return await axios.get(url)
            .then(response => {
                const totalHits = response.data.totalHits;
                const totalPage = Math.ceil(totalHits / perPage);
                if (page > totalPage) {
                    showNotificationError("We're sorry, but you've reached the end of search results.");
                    loader.classList.remove('loader-show');
                    lightbox.refresh();
                } else {
                    page = page + 1;
                    const markup = createGalleryMarkup(response.data.hits);
                    gallery.insertAdjacentHTML('beforeend', markup);
                    loader.classList.remove('loader-show');
                    loadMoreBtn.classList.add('load-more-btn-show');
                    const photoCard = document.querySelector('.photo-card');
                    const photoCardHeight = photoCard.getBoundingClientRect().height;
                    window.scrollBy({
                        top: photoCardHeight * 2,
                        behavior: 'smooth',
                    });
                    lightbox.refresh();
                }

            })
            .catch(error => console.log(error));
}

async function searchImages(searchQuery) { 
    
    const url = `&q=${searchQuery}&per_page=${perPage}&page=${page}`;
    
    return await axios.get(url)
        .then(response => {
            if (response.data.hits.length === 0) {
                showNotificationError('Sorry, there are no images matching your search query. Please try again!');
                loader.classList.remove('loader-show');
            } else {
                page = page + 1;
                const markup = createGalleryMarkup(response.data.hits);
                gallery.insertAdjacentHTML('beforeend', markup);
                loader.classList.remove('loader-show');
                loadMoreBtn.classList.add('load-more-btn-show');
                lightbox.refresh();
            }
        })
        .catch(error => console.log(error));
}

function createGalleryMarkup(images) { 
    return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, user }) => {
        return `
        <li class="photo-card">
            <a href="${largeImageURL}" class="gallery__item">
                <img src="${webformatURL}" alt="Author: ${user}, tags: ${tags}" class="gallery__image" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <span>${likes}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${views}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${comments}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <span>${downloads}</span>
                </p>
            </div>
        </li>
        `;
    }).join('');
}