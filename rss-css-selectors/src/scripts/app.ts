import mainContent from '../html/main-content.html';
import navContent from '../html/nav-content.html';
import AppView from './app-view';

export default class App {
  private container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  public start(): void {
    this.container.insertAdjacentHTML('afterbegin', mainContent);
    this.container.insertAdjacentHTML('beforeend', navContent);
    const appView = new AppView();
    appView.renderContent();
  }
}
