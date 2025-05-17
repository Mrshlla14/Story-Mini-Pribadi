//import '../styles/styles.css';
import '../styles/beranda.css';
import '../styles/home.css';
import '../styles/profile.css';
import App from './pages/app';
import Camera from './utils/camera';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
    drawerButton: document.getElementById('drawer-button'),
    drawerNavigation: document.getElementById('navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();

    // Stop all active media
    Camera.stopAllStreams();
  });
});
