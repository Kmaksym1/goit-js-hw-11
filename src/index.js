import Notiflix from 'notiflix'
import {fetchArr} from './fetch'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Повідомлення
// Після першого запиту з кожним новим пошуком отримувати повідомлення, 
// в якому буде написано, скільки всього знайшли зображень (властивість totalHits). 
// Текст повідомлення - "Hooray! We found totalHits images."

const formEL = document.querySelector('.search-form')
const galleryListEL = document.querySelector('.gallery-list')
const loadMoreEl = document.querySelector('.load-more')
// const target = document.querySelector('.js-guard')
loadMoreEl.style.display='none';
formEL.addEventListener('submit', onSubmit)


//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>IntersectionObserver
// let currentPage = 1
// let options = {
//     root: null,
//     rootMargin: "300px",
//     threshold: 1.0,
//   };
  
//   let observer = new IntersectionObserver(onLoad, options);
//   function onLoad(entries, observer){
        
// entries.forEach((entry) => {
// if(entry.isIntersecting){
//         console.log(entries)
// currentPage+=1

// fetchArr(input)
// .then((data)=>{
//     if(data.total===0){
//         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//     }
//     galleryListEL.innerHTML=(createMarkupCards(data))
//     gallery.refresh()
    
//     Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
// }).catch(err=>{
//         console.log(err)

// }
// )
// 
//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>IntersectionObserver





let input;
let page;
function onSubmit(e){
    e.preventDefault();
    page = 1
let {searchQuery} = e.target;
input = searchQuery.value;
loadMoreEl.style.display='none';
    setTimeout(()=>{
        loadMoreEl.style.display='block';
    },500)


console.log(fetchArr(input)
.then((data)=>{
    if(data.total===0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    galleryListEL.innerHTML=(createMarkupCards(data))
    if(data.total>=1){
        Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
    }
        gallery.refresh()
}).catch(err=>{
    Notiflix.Notify.failure(err);
        console.log(err)
}
))
}


function createMarkupCards(arr){
    return arr.hits.map(({webformatURL,tags,likes,views,comments,downloads,largeImageURL})=>
        `<li class='card-li'>
        <div class="photo-card">
          <a class="gallery__link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" height='247px' loading="lazy" /></a>
          <div class="info">
            <p class="info-item">
              <b>Likes <br><span style="font-weight: normal">${likes}</span></b>
            </p>
            <p class="info-item">
              <b>Views <br><span style="font-weight: normal">${views}</span></b>
            </p>
            <p class="info-item">
              <b>Comments <br><span style="font-weight: normal">${comments}</span></b>
            </p>
            <p class="info-item">
              <b>Downloads<br> <span style="font-weight: normal">${downloads}</span></b>
            </p>
          </div>
        </div>
      </li>`
    ).join('')
}

loadMoreEl.addEventListener('click', onLoadEL)
let dataTotalCurrent
function onLoadEL(){
    
    page+=1;
    fetchArr(input, page)
        .then((data)=>{
            dataTotalCurrent = data.totalHits
            dataTotalCurrent+=data.totalHits
            let hit = Number(page*40);
            if(hit >=data.totalHits){
                loadMoreEl.style.display='none';
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
            }


                    galleryListEL.insertAdjacentHTML('beforeend', createMarkupCards(data))
                    gallery.refresh();
                    Notiflix.Notify.success(`Hooray! We found ${dataTotalCurrent} images.`)
            })
}





    
    var gallery = new SimpleLightbox('.card-li a', {
    captionsData: 'alt',
    captionDelay: 250
});
