export function makeSmoothScrolling() {
    const galleryItemHeight = document
      .querySelector('.gallery li')
      .getBoundingClientRect().height;
  
    window.scrollBy({
      top: galleryItemHeight * 2,
      left: 0,
      behavior: 'smooth',
    });
  }