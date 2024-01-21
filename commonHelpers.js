import{a as h,S as L,i as w}from"./assets/vendor-89feecc5.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();function f(s){w.error({message:s,position:"topRight",timeout:2e3,close:!1,overlay:!1,displayMode:"once",color:"#EF4040",messageColor:"#FFFFFF",messageSize:"16px",iconColor:"#FFFFFF",theme:"dark",messageLineHeight:"24px"})}const v="38212376-ffcb529addc704f756c0c7d48",S=`https://pixabay.com/api/?key=${v}&image_type=photo&orientation=horizontal&safesearch=true`;h.defaults.baseURL=S;const $=document.querySelector(".search-form"),g=document.querySelector(".search-input"),m=document.querySelector(".gallery"),c=document.querySelector(".loader"),l=document.querySelector(".load-more-btn"),u=40;let n=1;const p=new L(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom",captionClass:"caption-style",close:!0,closeText:"×",fadeSpeed:250,animationSpeed:250});$.addEventListener("submit",F);l.addEventListener("click",q);function F(s){s.preventDefault(),m.innerHTML="",c.classList.add("loader-show"),n=1;const a=g.value;_(a)}function q(){l.classList.remove("load-more-btn-show"),c.classList.add("loader-show");const s=g.value;M(s)}async function M(s){const a=`&q=${s}&per_page=${u}&page=${n}`;return await h.get(a).then(t=>{const r=t.data.totalHits,e=Math.ceil(r/u);if(n>e)f("We're sorry, but you've reached the end of search results."),c.classList.remove("loader-show"),p.refresh();else{n=n+1;const o=y(t.data.hits);m.insertAdjacentHTML("beforeend",o),c.classList.remove("loader-show"),l.classList.add("load-more-btn-show");const d=document.querySelector(".photo-card").getBoundingClientRect().height;window.scrollBy({top:d*2,behavior:"smooth"}),p.refresh()}}).catch(t=>console.log(t))}async function _(s){const a=`&q=${s}&per_page=${u}&page=${n}`;return await h.get(a).then(t=>{if(t.data.hits.length===0)f("Sorry, there are no images matching your search query. Please try again!"),c.classList.remove("loader-show");else{n=n+1;const r=y(t.data.hits);m.insertAdjacentHTML("beforeend",r),c.classList.remove("loader-show"),l.classList.add("load-more-btn-show"),p.refresh()}}).catch(t=>console.log(t))}function y(s){return s.map(({webformatURL:a,largeImageURL:t,tags:r,likes:e,views:o,comments:i,downloads:d,user:b})=>`
        <li class="photo-card">
            <a href="${t}" class="gallery__item">
                <img src="${a}" alt="Author: ${b}, tags: ${r}" class="gallery__image" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <span>${e}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${o}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${i}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <span>${d}</span>
                </p>
            </div>
        </li>
        `).join("")}
//# sourceMappingURL=commonHelpers.js.map
