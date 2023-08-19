const main = document.querySelector('main');
const endPage = document.getElementById('endPage');
let currentPage = 1;

const openButton = document.getElementById("open-Button");
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById('close-Button');

/*
function unlikePost(id){
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];  
    const updatedPosts = likedPosts.filter((postId) => postId !== id);
    localStorage.setItem('likedPosts'.JSON.stringify(updatedPosts));
}

function likePost(event){
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    const postIsLiked = likedPosts.find((postId) => postId == event.target.id);
    if(postIsLiked){
        event.target.textContent = 'Like'
        event.target.classList.remove('liked')
        return unlikePost(event.target.id);
    }
    event.target.textContent = 'Liked'
    event.target.classList.add('liked')

    likedPosts.push(event.target.id);
    localStorage.setItem('likedPosts',JSON.stringify('likedPosts'));

}*/
openButton.addEventListener('click', function() {
    overlay.classList.add('active');
});

closeButton.addEventListener('click', function() {
    overlay.classList.remove('active'); 
});



function unlikePost(id) {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    const updatedPosts = likedPosts.filter((postId) => postId !== id);
    localStorage.setItem('likedPosts', JSON.stringify(updatedPosts));
}

function likePost(event) {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    const postIsLiked = likedPosts.find((postId) => postId == event.target.id);

    if (postIsLiked) {
        event.target.textContent = 'Like';
        event.target.classList.remove('liked');
        return unlikePost(event.target.id);
    } else {
        event.target.textContent = 'Liked';
        event.target.classList.add('liked');
        likedPosts.push(event.target.id);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
}


function createCard(article){
    const anchorElement = document.createElement('a');
    const articleElement = document.createElement('article');
    const titleElement = document.createElement('strong');
    const descriptionElement = document.createElement('p');
    const imageElement = document.createElement('img');
    const likeButton = document.createElement('button');
    
    titleElement.textContent = article.title;
    descriptionElement.textContent = article.description;
    imageElement.src = article.social_image;
    anchorElement.href = article.url;
    anchorElement.target = '_blank';

    likeButton.textContent = 'Like';
    likeButton.className = 'likeButton';
    likeButton.id = article.id;
    //likeButton.addEventListener('click',likePost)
    
    anchorElement.appendChild(titleElement);
    anchorElement.appendChild(descriptionElement); 
    articleElement.appendChild(imageElement);
    articleElement.appendChild(anchorElement);
    articleElement.appendChild(likeButton);

    
    return articleElement;
}


function createCards(articles) {
    return articles.map((article) => createCard(article));
}




// função para trazer as publicações 
async function getPosts(){
    const response = await fetch(`https://dev.to/api/articles?per_page=10&page=${currentPage}`)

    const data = await response.json();
    const cards = createCards(data);
    cards.forEach((card) => {
        main.appendChild(card)
    })

    currentPage += 1 ;

}

// como saber o final da página
const observer = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting) getPosts()

});
observer.observe(endPage)

