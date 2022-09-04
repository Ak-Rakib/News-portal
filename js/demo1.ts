const loadNewses = () => {
    spinner(true)
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => displayCategories(error))



}
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        console.log(category)


        const newsList = document.createElement('li');
        newsList.classList.add("nav-item")
        newsList.innerHTML = `
        <a onclick="loadCategoryNews('${category.category_id}')"class="nav-link active">${category.category_name}</a>
      
        `;


        categoriesContainer.appendChild(newsList)

    });

}

loadCategoryNews = (id) => {
    spinner(true)

    // console.log(id)
    const url = https://openapi.programming-hero.com/api/news/category/${id}
    //console.log(id)
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetailes(data.data))
        .catch(error => displayNewsDetailes(error))

}

const displayNewsDetailes = details => {

    displayNewsCount(details.length)
    const newsDetail = document.getElementById('news-detail');
    newsDetail.innerHTML = ''
    details.forEach(detail => {
        // console.log(detail);
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="card mb-3 p-4" >
                <div class="row g-0">
                    <div class="col-md-4">
                    <img class="w-100"src="${detail.thumbnail_url ? detail.thumbnail_url : 'No img found'}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                    <h4 class="card-title">${detail.title}</h4>
                    <p class="card-text my-3">${detail.details.slice(0, 700)}...</p>
                    <div class="row">
                    <div class="col-md-4 d-flex justify-content-between"">
                        <img class="w-25 rounded-circle me-3" src="${detail.author.img}" alt="">
                        <div>
                        <h6>${detail.author.name ? detail.author.name : 'NO Name Found'}</h6>
                        <p> ${detail.author.published_date ? detail.author.published_date : 'NO Date Found'}</p>
                         </div>
                       
                    </div>
                    <div class="col-md-4">
                        <h4> ${detail.total_view ? detail.total_view : 'No viers'}  M</h4>
                    </div>
                     
                   >
                    <div class="col-lg-2">
                    <button type="button" onclick="viewClickDetails('${detail._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    more view</button>
                    </div>
                   
                    

                </div>
            </div>
                `;
        newsDetail.appendChild(cardDiv);





    })


    spinner(false)
}

// spinner function

function spinner(isLoading) {
    const loderSection = document.getElementById("loader");


    if (isLoading) {
        loderSection.classList.remove("d-none");
    }
    else {
        loderSection.classList.add("d-none");
    }
}

const displayNewsCount = (newslength) => {
    const newsLenthCounter = document.getElementById('newslength-container');
    newsLenthCounter.innerText = newslength;
}

loadCategoryNews('08')


//modal section
const viewClickDetails = (id) => {
    fetch(https://openapi.programming-hero.com/api/news/${id})
        .then(res => res.json())
        .then(data => viewClickDetailsDisplay(data))
        .catch(error => viewClickDetailsDisplay(error))

}

const viewClickDetailsDisplay = details => {

    console.log(details)
    const modal = document.getElementById('exampleModalLabel');
    modal.innerHTML = ''

    try {
        const creatediv = document.createElement('div');

        creatediv.innerHTML = `
                            <div class="row">
                                 <div class="col-lg-12">
                                         <img class="w-100"  src="${details.data[0].image_url}" alt="" >
                                         <h3 class="card-text my-3">${details.data[0].title}</h3>
                                         <p>${details.data[0].details.slice(0, 300) + ' ' + 'more.....'}</p>
                                         <h5 h5 > ${details.data[0].author.published_date}</h5 >
                                         <div class= "d-flex align-items-center justify-content-center ">
                                           <div class = "mx-auto">
                                           <img class="w-25 rounded-circle my-2 d-block"  src="${details.data[0].author.img}" alt="" >
                                           <p class = 'text '>${details.data[0].author.name ? details.data[0].author.name : 'No author Name!'}</p>
                                           </div>
                                         </div>
                                         <div class="col-md-3 d-flex ">
                                          <h5 class='mx-2 class= "py-2"' ><i class="fa-regular fa-eye"></i></h5>
                                         <h5 > ${details.data[0].total_view ? details.data[0].total_view : 'not view'} M</h5>
                                 </div>
                             </div>
                             </div>
     `;
        modal.appendChild(creatediv);

    } catch (err) {
    }

}

viewClickDetailsDisplay()





loadNewses();