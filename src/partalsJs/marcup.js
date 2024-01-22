export function renderPhoto(photos) {
    return photos.reduce(
      (
        html,
        { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
      ) =>
        html +
        ` <li class="gallery-item">
                
                <a class="gallery-link" href="${largeImageURL}">
                    <img
                    src="${webformatURL}"
                    alt="${tags}"
                    width="360"
                    />
                </a>    
            <div class="thumb-block">
              <div class="block">
                <h2 class="tittle">Likes</h2>
                <p class="amount">${likes}</p>
              </div>
              <div class="block">
                <h2 class="tittle">Views</h2>
                <p class="amount">${views}</p>
              </div>
              <div class="block">
                <h2 class="tittle">Comments</h2>
                <p class="amount">${comments}</p>
              </div>
              <div class="block">
                <h2 class="tittle">Downloads</h2>
                <p class="amount">${downloads}</p>
              </div>
            </div>              
         </li>`,
      ''
    );
  }