const postsContainer = document.querySelector('#posts-container');
const loader = document.querySelector('.loader');

const baseURL = 'https://jsonplaceholder.typicode.com/posts';

const limit = 10;
let page = 1;
let fetchMore = false;

renderPosts(page);

// fetch and display posts while scrolling
window.addEventListener('scroll', () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight > scrollHeight - 30 && !fetchMore) {
    fetchMore = true;
    page++;
    renderPosts(page);
  }
});

// fetch and displays new posts
function renderPosts(page) {
  let posts = [];

  loader.classList.add('show');

  setTimeout(async () => {
    loader.classList.remove('show');
    posts = await fetchPosts(limit, page);

    for (let post of posts) {
      const postElem = document.createElement('article');
      postElem.classList.add('post');

      postElem.innerHTML = `
      <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
            ${post.body}
          </p>
        </div>
    `;

      postsContainer.appendChild(postElem);
    }

    fetchMore = false;
  }, 300);
}

// fetch posts from API
async function fetchPosts(limit = 5, page = 1) {
  try {
    const response = await fetch(`${baseURL}?_limit=${limit}&_page=${page}`);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
