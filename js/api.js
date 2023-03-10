// ----------------
const category = async() =>{
    try {
        const url = "https://openapi.programming-hero.com/api/news/categories"
        // console.log('Hello',url);
        const res = await fetch(url)
        const data = await res.json();
        getCategory(data.data.news_category); 
    } catch (error) {
       console.log(`Error is: ${error}`); 
    }
}
// ----------------



// ---------------
const getCategory = datas => {
    const navItems = document.getElementById('nav-items');
        for(const category of datas){
            // console.log(category);
            const newItems = document.createElement('div');
            // console.log(newItems);
        newItems.classList.add('navbar-nav');
        newItems.innerHTML = `
        <div onclick = "categoryDetailsApi('${category.category_id}')" class="nav-link be-5 addpadding" href="#">${category.category_name}</div> 
        `;
        navItems.appendChild(newItems);
        // console.log(category.category_name);
        }
}
// --------------




// --------------
const categoryDetailsApi =async id =>{
    loader(true);
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        // console.log(url);
        const res = await fetch(url)
        const data = await res.json()
        displayCategories(data.data)
    } catch (error2) {
        console.log(`Error is: ${error2}`)
    }
}
// --------------



// --------------
const displayCategories =async details => {
    console.log(details);
    const detailsId = document.getElementById('display-details');
    detailsId.innerHTML = '';



 //--------------
    const blankPage = document.getElementById('no-phone-found');
    if(details.length === 0){
        blankPage.classList.remove('d-none');
    } else{
        blankPage.classList.add('d-none');
    }
 
 

    for(const detail of details){
        // console.log(detail);
        const detailsDiv = document.createElement('div');
        // detailsDiv.classList.add('row');
        detailsDiv.innerHTML = `
        <div class="row shadow-lg  mb-5 bg-body rounded">
        <div class="col-md-4">
            <img src="${detail.thumbnail_url}" class="img-fluid" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${detail.title? detail.title : 'Data not Found'}</h5>
              <p class="card-text">${detail.details.slice(0,140) + '...'}</p>
              <span><img src="${detail.author.img}" class="img-fluid img" alt="..."></span>
              <span>${detail.author.name? detail.author.name : 'Unknown'}</span>
              <span class="ms-3">Views: ${detail.total_view? detail.total_view : 'Emphty'}</span>
              <span class="ms-5"><button onclick = "modalDetailsApi('${detail.category_id}')" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Details</button></span>
              <small>${detail.author.published_date}<small>
            </div>
          </div>
          </div>
        `;
        detailsId.appendChild(detailsDiv);
    }
    loader(false);
}
// --------------


// --------------
const loader = isSpiner => {
    const loaderSection = document.getElementById('loader');
    if(isSpiner){
        loaderSection.classList.remove('d-none')
    }
    else{
      loaderSection.classList.add('d-none');
    }
}
// -------------
// categoryDetailsApi();


const modalDetailsApi =async id =>{
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        // console.log(url);
        const res = await fetch(url)
        const data = await res.json()
        displayModalDetails(data.data)
    } catch (error3) {
        console.log(`Error is: ${error3}`)
    }
}



const displayModalDetails =async modals => {
    console.log(modals);
    const modalDetails = document.getElementById('newsDetailsModallabel');
    modalDetails.innerText = modals[0].title;

    const exploreImg = document.getElementById('explore-img');
    exploreImg.innerHTML = `
        <div><img src = "${modals[0].image_url}" class="img-fluid"></div>
        <p>Author:${modals[0].author.name}</p>
        <p>Publish:${modals[0].author.published_date}</p>
    `;
}
category();   


//------------
document.getElementById('blog').addEventListener('click', function(){
    window.location = 'blog.html';
});
// -----------