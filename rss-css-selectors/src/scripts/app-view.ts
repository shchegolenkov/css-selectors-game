import LevelLogic from './level-logic';
import MobileMenu from './listeners/mobile-menu';
import ResetProgress from './listeners/reset-progress';
import HelpButton from './listeners/help-button';
import InputCss from './listeners/input-css';

export default class AppView {
  public renderContent(): void {
    const levelLogic = new LevelLogic();
    levelLogic.renderPage();

    const mobileMenu = new MobileMenu();
    mobileMenu.listen();

    const reset = new ResetProgress();
    reset.listen();

    const inputCss = new InputCss();
    inputCss.listen();

    const helpButton = new HelpButton();
    helpButton.listen();
  }
}
