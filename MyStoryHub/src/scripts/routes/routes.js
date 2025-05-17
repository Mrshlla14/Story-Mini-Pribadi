import RegisterPage from '../pages/profile/register/register-page';
import LoginPage from '../pages/profile/login/login-page';
import HomePage from '../pages/home/home-page';
import NewPage from '../pages/add/add-page';
import WelcomePage from '../pages/beranda/beranda-page';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/profile';

export const routes = {
  '/': () => new WelcomePage(),
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/home': () => checkAuthenticatedRoute(new HomePage()),
  '/new': () => checkAuthenticatedRoute(new NewPage()),
};
