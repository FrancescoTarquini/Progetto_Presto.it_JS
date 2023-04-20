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

fetch('./annunci.json').

then((response) => response.json())

.then((data) => {
    let categoryWrapper = document.querySelector('#categoryWrapper')
    let cardsWrapper = document.querySelector('#cardsWrapper');
   
   
    function showCards(array){
        cardsWrapper.innerHTML = ''
        array.forEach((element) => {
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-4','my-2');
            div.innerHTML = `
            <div class="card announcement-card">
            <div class="card-body">
                <h5 title="${element.name}" class="card-title fs-2">${troncate(element.name)}</h5>
                <p class="card-text fs-3">${element.price}</p>
                <p class="card-text">${element.category}</p>
                
            </div>
            </div>
            `
            cardsWrapper.appendChild(div)
        })
    }

    showCards(data)

   
    function setCategoryFilter(){
        let categories = data.map((el) => el.category);
        let uniqueCategories = [];
        categories.forEach((category) => {
            if(!uniqueCategories.includes(category)){
                uniqueCategories.push(category)
            }
        })

        uniqueCategories.forEach((uniqueCategory) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${uniqueCategory}">
            <label class="form-check-label" for="${uniqueCategory}">
              ${uniqueCategory}
            </label>
            `
            categoryWrapper.appendChild(div)

           
        })
    }

    setCategoryFilter()

    let radioBtns = document.querySelectorAll('.form-check-input');
  
   
    function filterByCategory(array){
        let category =Array.from(radioBtns).find((el) => el.checked).id;
        console.log(category);
        if(category != 'All'){
            let filtered = array.filter((el) => el.category == category)
            return filtered
        } else {
            return array
        }
    }

    filterByCategory()



    let inputRange = document.querySelector('#inputRange');
    let formLabel = document.querySelector('.form-label')
    function findMaxPrice(){
     
        let prices = data.map((el) => Number(el.price))
      
        let sorted = prices.sort((a,b) => a - b);
        let maxPrice = Math.ceil(+sorted.pop())

        inputRange.max = maxPrice 
        inputRange.value = maxPrice
        
    }

    findMaxPrice()


    function filterByPrice(array){
        let filtered = array.filter((el) => +el.price <= +inputRange.value)
        let sortedFilter = filtered.sort((a,b) => a.price - b.price)
        return sortedFilter

    }

    let inputWord = document.querySelector('#inputWord');

    function filterByWord(array){
        let name = inputWord.value
        let filtered = array.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()))
        return filtered
    }


    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory)
        let filteredByWord = filterByWord(filteredByPrice)

        showCards(filteredByWord)
    }

    function troncate(string){
        if(string.length > 20){
            return string.split(' ')[0] + '...'
        } else {
            return string
        }
    }

    radioBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            globalFilter()
        })
    })

    inputRange.addEventListener('input', () => {
        formLabel.innerHTML = '$' + inputRange.value
        globalFilter()
    })

    inputWord.addEventListener('input' , () => {
        globalFilter()
    })

})