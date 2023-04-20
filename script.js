//Variabili Globali 
let customNav = document.querySelector('#NavCustom');
let customColorP = document.querySelector('.spanP');
let customColorH1 = document.querySelector('.navbar-brand');
let cardsWrapper=document.querySelector('#cardsWrapper');
let customLink = document.querySelectorAll('.nav-link');


window.addEventListener('scroll',() => {
    if (window.scrollY > 0) {
        customNav.style.backgroundColor ='var(--primary)';
        customLink.forEach((link) => {
            link.style.color='var(--text)';
            link.style.marginRight = '30px'
        })
        customColorP.style.color='var(--text)';
        customColorH1.innerHTML = '<i class="fa-solid fa-cart-shopping accent-custom"></i>';
    } else {
        customLink.forEach((link) => {
            customNav.style.backgroundColor ='var(--accent)';
            link.style.color='var(--text)';
            link.style.marginRight = '0px'
        })
        customColorP.style.color='var(--text)';
        customColorH1.innerHTML='<span class="text-accent-custom spanP">P</span>resto.it';
    }
})

let announcement=[
    {name:'Tastiera Meccanica Logitech-Pop', category:'Elettronic',price:'50,00 €',url:'https://m.media-amazon.com/images/I/710W0MmKsWL._AC_SL1500_.jpg'},
    {name:'Playstation 5', category:'Gaming',price:'550,00 €',url:'https://m.media-amazon.com/images/I/51f6iZlNnvL._AC_SX679_.jpg'},
    {name:'Samsung Galaxy Book Pro', category:'Elettronic',price:'1,750 €',url:'https://m.media-amazon.com/images/I/71VOcXtfUJL._AC_SX679_.jpg'},
]


announcement.forEach((announcement) =>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <div class="card" style="width: 18rem"> 
    <img src="${announcement.url}" class="card-img-top img-custom mx-auto" alt="...">
    <div class="card-body">
    <h5 class="card-title">${announcement.name}<i class="fa-regular fa-heart fs-4 mx-4"></i></h5>
    <p class="card-text">${announcement.category}</p>
    <p class="card-text fw-bold lead">$ ${announcement.price}</p>
    <a href="#" class="btn bg-accent-custom text-white d-block mx-auto">Vai al dettaglio</a>
    </div>
    </div> `
    cardsWrapper.appendChild(div);
})


let iconHearts = document.querySelectorAll('.fa-heart');
let cardImgs = document.querySelectorAll('.card-img-top');


iconHearts.forEach((icon) => {
    icon.addEventListener('click' , () => {
        console.log('ciao')
        icon.classList.toggle('fa-solid');
        icon.style.color = 'red' 
        icon.classList.toggle('fa-regular');
    })
})

cardImgs.forEach((img, i) => {
    img.addEventListener('dblclick', () => {
        // console.log(iconHearts[i]);
        iconHearts[i].classList.toggle('fa-solid')
        iconHearts[i].classList.toggle('fa-regular')
    })
})

let swiper = new Swiper(".mySwiper", {
    rewind: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let cardsReview = document.querySelector('#cardsReview');

let reviews = [
    {name : "Silvia" , rate : "5" , commit : "Store ultra fornito!!!!" },
    {name : "Domenico" , rate : "4.5" , commit : "Spedizione Velocissima grazie mille" },
    {name : "Salvatore" , rate : "4" , commit : "Regalo super aprezzato" },
    {name : "Vittoria" , rate : "4" , commit : "Il pacco è arrivato in ritardo pero' la merce era perfetta" },
    {name : "Giulia" , rate : "4" , commit : "Assistenza call center molto disponibile, sito approvato" },
]

reviews.forEach( (review) => {
    let div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `<div class="card card-custom bg-white border-white border-0 ">
    <div class="card-custom-img" style="background-image: url(http://res.cloudinary.com/d3/image/upload/c_scale,q_auto:good,w_1110/trianglify-v1-cs85g_cc5d2i.jpg);"></div>
    <div class="card-custom-avatar"> </div>
    <div class="card-body " style="overflow-y: auto">
    <h5 class="card-title">${review.name}</h5>
    <p class="card-text lead">${review.commit}</p>
    <div class= "stars-wrapper"> ${generateStars(review.rate)} </div>
    </div>
    <div class="card-footer" style="background: inherit; border-color: inherit;">
    
    </div>
    </div>`
    
    cardsReview.appendChild(div);
})


function generateStars(num) {
    let result = "";
    for (let i= 1; i <= 5; i++) {
        if (num == 0.5) {
            result += '<i class= "fa-regular fa-star-half-stroke"></i>'
            num = 0
        } else if (num > 0) {
            result += '<i class= "fa-solid fa-star"></i>'
            num--
        } else {
            result += '<i class= "fa-regular fa-star"></i>'
        }
        
    } 
    return result;
}

let swiperCoverFlow = new Swiper(".swiperCoverFlow", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "2",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

