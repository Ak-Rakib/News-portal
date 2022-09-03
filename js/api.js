// common function
const category = async(categories) =>{
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url)
    const data = await res.json();
    return data.data.news_category;
}

const getCategory = async()=> {
    const data = await category();
    const createLi = document.getElementById('create-li');
    data.forEach(datas => {
        const newLi = document.createElement('li');
        newLi.innerHTML = `
        <li><button class="dropdown-item" type="button">${datas.category_name}</button></li>
        `;
        createLi.appendChild(newLi);
        console.log(datas.category_name);

    });
}
getCategory();





// For Blog
document.getElementById('blog').addEventListener('click', function(){
    window.location = 'blog.html';
});