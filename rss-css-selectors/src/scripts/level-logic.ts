import LEVELS from './data/levels';
import State from './state';
import EventEmitter from './listeners/event-emitter';
import ItemListener from './listeners/item-listener';
import HtmlListener from './listeners/code-listener';
import WinPopup from './win-popup';

import notPassedLevelIcon from '../assets/icon-not-passed-level.svg';
import passedLevelIcon from '../assets/icon-passed-level.svg';
import helpedLevelIcon from '../assets/icon-cancel-level.svg';

export default class LevelLogic extends EventEmitter {
  private state: State;
  private levelButtonsList: HTMLElement[];
  private checkButtonsList: HTMLImageElement[];
  private htmlListener: HtmlListener;
  private editorWindow: HTMLElement;

  constructor() {
    super();
    this.state = new State();
    this.htmlListener = new HtmlListener();
    this.levelButtonsList = [];
    this.checkButtonsList = [];

    this.editorWindow = <HTMLElement>document.querySelector('.editor');

    this.on('submit', (attempt: string): void => this.checkSubmit(attempt));
    this.on('win', () => this.checkTotalWin());
    this.on('closeWinPopup', () => this.changeLevel(LEVELS.length));
    this.on('reset', () => {
      this.changeLevel(1);
      this.resetCheckButtons();
    });
  }

  private renderTask(): void {
    const taskElement = <HTMLElement>document.querySelector('.main__task');
    if (taskElement) taskElement.textContent = LEVELS[this.state.getCurrentLevel() - 1].task;
  }

  private renderMarkup(): void {
    const htmlWindowEl = document.querySelector('code');

    if (htmlWindowEl) {
      const itemsMarkup = LEVELS[this.state.getCurrentLevel() - 1].markup;
      htmlWindowEl.innerHTML = '';
      itemsMarkup.forEach((item) => {
        htmlWindowEl.insertAdjacentHTML('beforeend', item);
      });

      this.htmlListener.listen(htmlWindowEl);
    }
  }

  private renderTable(): void {
    const tableEl = <HTMLElement>document.querySelector('.table');
    const currentLevel = this.state.getCurrentLevel() - 1;
    const currentTable = LEVELS[currentLevel].table;
    const itemListener = new ItemListener();
    if (tableEl) {
      tableEl.innerHTML = '';
      let id = 0;
      for (let i = 0; i < currentTable.length; i += 1) {
        const itemBlock = document.createElement('div');
        itemBlock.classList.add('item__wrapper');
        for (let j = 0; j < currentTable[i].length; j += 1) {
          id += 1;
          const [nameItem, target, ...classNames] = currentTable[i][j].split('-');
          if (nameItem) {
            const item = document.createElement(nameItem);
            item.id = `${id}`;
            if (target === 'target') {
              item.classList.add('target');
              this.on('win', () => {
                item.classList.add('item--win');
              });
            }
            if (classNames) {
              classNames.forEach((className) => {
                item.classList.add(className);
              });
            }
            itemBlock.append(item);
            itemListener.listen(item);
          }
        }
        tableEl.append(itemBlock);
      }
    }
  }

  private checkTotalWin(): void {
    if (this.state.getCurrentLevel() < LEVELS.length) {
      setTimeout(() => {
        this.changeLevel(this.state.getCurrentLevel() + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        this.changeLevelButtons();
        const winPopup = new WinPopup();
        winPopup.show();
      }, 1000);
    }
  }

  private renderLevelButtons(): void {
    const levelButtonsListEl = <HTMLElement>document.querySelector('.nav__list');
    if (levelButtonsListEl) {
      for (let i = 1; i < LEVELS.length + 1; i += 1) {
        const levelButton = document.createElement('li');
        levelButton.classList.add('nav__list-item');
        levelButton.textContent = `${i}`;
        const img = document.createElement('img');
        img.src = notPassedLevelIcon;
        img.width = 20;
        this.checkButtonsList.push(img);
        levelButton.insertAdjacentElement('afterbegin', img);
        levelButton.onclick = (): void => {
          this.changeLevel(i);
        };
        this.levelButtonsList.push(levelButton);
        levelButtonsListEl.appendChild(levelButton);
      }
    }
  }

  private changeLevelButtons(): void {
    this.levelButtonsList.forEach((button) => {
      const i = this.levelButtonsList.indexOf(button);
      if (i === this.state.getCurrentLevel() - 1) {
        button.classList.add('nav__list-item--current');
      } else {
        button.classList.remove('nav__list-item--current');
      }

      if (this.state.getCompletedLevels().includes((i + 1).toString())) {
        this.checkButtonsList[i].src = passedLevelIcon;
      }

      if (this.state.getSkippedLevels().includes((i + 1).toString())) {
        this.checkButtonsList[i].src = helpedLevelIcon;
      }
    });
  }

  private checkSubmit(inputText: string): void {
    if (LEVELS[this.state.getCurrentLevel() - 1].selectors.includes(inputText)) {
      this.emit('win');
    } else {
      this.editorWindow.classList.add('editor--shaking');
      setTimeout(() => {
        this.editorWindow.classList.remove('editor--shaking');
      }, 1000);
    }
  }

  private resetCheckButtons(): void {
    for (let i = 0; i < this.checkButtonsList.length; i += 1) {
      this.checkButtonsList[i].src = notPassedLevelIcon;
    }
  }

  private changeLevel(levelNum: number): void {
    this.emit('changeLevel');
    this.state.setCurrentLevel(levelNum);
    this.renderTask();
    this.renderMarkup();
    this.renderTable();
    this.changeLevelButtons();
  }

  public renderPage(): void {
    this.renderTask();
    this.renderMarkup();
    this.renderTable();
    this.renderLevelButtons();
    this.changeLevelButtons();
  }
}
