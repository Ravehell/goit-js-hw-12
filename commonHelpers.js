import{a as w,S as q,i as m}from"./assets/vendor-bad0427b.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const y=document.querySelector(".picture-search-form"),S=document.querySelector(".picture-search-name"),L=document.querySelector(".loader-container"),i=document.querySelector(".load-more-button"),k="41764451-f0ee5e8d00846e21c9f97a054";let a=1;const h=40;let d="";function $(){L.style.display="block"}function g(){L.style.display="none"}async function b(l,o){d=l;const c={key:k,q:d,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:h},n=new URLSearchParams(c);$();try{const e=await w.get(`https://pixabay.com/api/?${n}`);g();const{hits:t,totalHits:r}=e.data,p=document.querySelector(".gallery"),f=new q(".gallery a",{captionDelay:250,captionsData:"alt",close:!0});f.refresh(),o===1&&(p.innerHTML="");const v=t.reduce((u,s)=>u+`<a class="gallery-link" href="${s.largeImageURL}">
            <img
                class="gallery-image"
                src="${s.webformatURL}"
                alt="${s.tags}"
            />
           <ul class="info-list">
              <li class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${s.likes}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${s.views}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${s.comments}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${s.downloads}</p>
              </li>
            </ul>
        </a>`,"");if(p.insertAdjacentHTML("beforeend",v),f.refresh(),o*h>=r)i.style.display="none",m.error({title:"Error",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});else{i.style.display="block";const u=document.querySelector(".gallery-link").getBoundingClientRect().height;window.scrollBy({top:u*2,behavior:"smooth"})}}catch(e){g(),m.error({title:"Error",message:e.message,position:"topRight"})}}y.addEventListener("submit",l=>{l.preventDefault();const o=S.value.trim();a=1,i.style.display="none",b(o,a),y.reset()});i.addEventListener("click",()=>{a+=1,b(d,a)});
//# sourceMappingURL=commonHelpers.js.map
