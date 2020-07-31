const postContainer = document.querySelector('#posts-container');
const loader = document.querySelector('.loader');

const baseURL = 'https://jsonplaceholder.typicode.com/posts';

renderPosts();

// display posts
async function renderPosts() {
  loader.classList.add('show');
  const posts = await fetchPosts(5, 1);
  loader.classList.remove('show');

  postContainer.innerHTML = `
    ${posts
      .map(
        (post) => `
      <article class="post">
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
            ${post.body}
          </p>
        </div>
      </article>
    `
      )
      .join('')}
  `;
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
