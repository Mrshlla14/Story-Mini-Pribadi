import LoginPresenter from './login-present';
import * as StoryAPI from '../../../data/api';
import * as AuthModel from '../../../utils/profile';

export default class LoginPage {
  #presenter = null;

  async render() {
    return `
      <section class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1 class="auth-title">Login Account</h1>
          </div>

          <form id="login-form" class="auth-form">
            <div class="form-control">
              <label for="email-input" class="form-label" style="display: flex; align-items: center; gap: 10px;">
                <span><i class="fas fa-envelope"></i></span>
                Email
              </label>
              <div style="display: flex; align-items: center;">
                <input 
                  id="email-input" 
                  type="email" 
                  name="email" 
                  placeholder="example@email.com" 
                  aria-describedby="email-help"
                  required 
                >
              </div>
            </div>
            
            <div class="form-control">
              <label for="password-input" class="form-label" style="display: flex; align-items: center; gap: 10px;">
              <span><i class="fas fa-lock input-icon"></i></span>
              Password
              </label>
              <div style="display: flex; align-items: center;">
                <input 
                  id="password-input" 
                  type="password" 
                  name="password" 
                  placeholder="Enter your password" 
                  aria-describedby="password-help"
                  required
                >
              </div>
            </div>
            
            <div class="form-buttons auth-form-buttons">
            <div id="submit-button-container" style="text-align: center;">
              <p class="auth-alternate-action">Don't have an account? <a href="#/register">Register</a></p>
              <button class="btn auth-submit-btn" type="submit" aria-label="Login">Login</button>
            </div>
          </div>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: StoryAPI,
      authModel: AuthModel,
    });

    this.#setupForm();
  }

  #setupForm() {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        email: document.getElementById('email-input').value,
        password: document.getElementById('password-input').value,
      };
      await this.#presenter.getLogin(data);
    });
  }

  loginSuccessfully(message) {
    console.log(message);

    location.hash = '/home';
  }

  loginFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn auth-submit-btn" type="submit" disabled aria-label="Logging in">
        <i class="fas fa-spinner loader-button"></i> Login
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn auth-submit-btn" type="submit" aria-label="Login">Login</button>
    `;
  }
}
