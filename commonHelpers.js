import{a as b,S as C,i as u}from"./assets/vendor-40038228.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();function f(o){return o.reduce((r,{webformatURL:s,largeImageURL:i,tags:e,likes:t,views:l,comments:S,downloads:w})=>r+` <li class="gallery-item">
                
                <a class="gallery-link" href="${i}">
                    <img
                    src="${s}"
                    alt="${e}"
                    width="360"
                    />
                </a>    
            <div class="thumb-block">
              <div class="block">
                <h2 class="tittle">Likes</h2>
                <p class="amount">${t}</p>
              </div>
              <div class="block">
                <h2 class="tittle">Views</h2>
                <p class="amount">${l}</p>
              </div>
              <div class="block">
                <h2 class="tittle">Comments</h2>
                <p class="amount">${S}</p>
              </div>
              <div class="block">
                <h2 class="tittle">Downloads</h2>
                <p class="amount">${w}</p>
              </div>
            </div>              
         </li>`,"")}async function v(o,r,s,i){const e=new URLSearchParams({key:r,per_page:i,page:s,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});return await b.get(`/api/?${e}`).then(t=>t.data).then(t=>t)}const p=new C(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0});p.refresh();function y(){const o=document.querySelector(".gallery li").getBoundingClientRect().height;window.scrollBy({top:o*2,left:0,behavior:"smooth"})}const A=document.querySelector(".submitForm"),h=document.querySelector(".submitInput"),m=document.querySelector(".gallery"),L=document.querySelector(".loader"),d=document.querySelector(".loadMore"),F="41590527-3cc425bd48b0e10304cc9b3d1";b.defaults.baseURL="https://pixabay.com";A.addEventListener("submit",E);n();d.classList.add("is-hidden");let a=1;const g=40;let c="";async function E(o){o.preventDefault(),a=1,d.classList.add("is-hidden"),m.innerHTML="",c=h.value.trim(),q(),P(c);try{const r=await v(c,F,a,g);if(r.hits.length===0){n(),h.value="",u.error({title:"Error",timeout:"2000",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}m.insertAdjacentHTML("beforeend",f(r.hits)),p.refresh(),r.totalHits>g&&B()}catch(r){u.error({title:"Error",timeout:"2000",message:r,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{n()}}d.addEventListener("click",M);async function M(){event.preventDefault(),a++,c=h.value.trim();try{const o=await v(c,F,a,g),r=o.totalHits;let s=Math.ceil(r/g);if(a===s){k(),n(),m.innerHTML+=f(o.hits),y(),h.value="",u.info({title:"Info",timeout:"5000",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#00FF00",position:"topRight"});return}a<s&&(m.innerHTML+=f(o.hits),p.refresh())}catch(o){u.error({title:"Error",timeout:"2000",message:o,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{y(),n()}}function P(o){if(o==="")throw n(),k(),u.error({title:"Error",timeout:"1500",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}function q(){L.classList.remove("is-hidden")}function n(){L.classList.add("is-hidden")}function B(){d.classList.remove("is-hidden")}function k(){d.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
