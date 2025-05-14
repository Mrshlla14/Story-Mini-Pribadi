import { getBookmarkedStories } from '../../utils/profile';
import { generateStoryItemTemplate } from '../../template';

export default class BookmarkPage {
  async render() {
    return `
      <section class="container">
        <div class="bookmark-container">
          <h1 class="section-title">Bookmarked MyStoryHub</h1>
          <div id="bookmarked-stories-container" class="bookmark-content">
            <!-- Stories will be loaded here -->
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.loadBookmarkedStories();
  }

  loadBookmarkedStories() {
    const bookmarkedStories = getBookmarkedStories();
    const container = document.getElementById('bookmarked-stories-container');

    if (!bookmarkedStories || bookmarkedStories.length === 0) {
      container.innerHTML = `
        <div class="bookmark-message">
          <h2>No Bookmarked MyStoryHub</h2>
          <p>You haven't bookmarked any stories yet. Browse some interesting stories and tap the bookmark button to save them. Happy browsing!</p>
          <a href="#/home" class="btn">Browse MyStoryHub</a>
        </div>
      `;
      return;
    }

    const html = bookmarkedStories.reduce((accumulator, story) => {
      return accumulator.concat(
        generateStoryItemTemplate({
          ...story,
          name: story.name,
        }),
      );
    }, '');

    container.innerHTML = `
      <div class="stories-list">${html}</div>
    `;
  }
}
