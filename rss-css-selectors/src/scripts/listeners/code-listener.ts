import ItemListener from './item-listener';

export default class HtmlListener {
  private itemListener: ItemListener;
  private elem: HTMLElement | undefined;

  constructor() {
    this.itemListener = new ItemListener();
  }

  private mouseOver(): void {
    if (this.elem) {
      this.elem.addEventListener('mouseover', (event: MouseEvent) => {
        const targetElement = <HTMLElement>event.target;
        targetElement.classList.add('editor--hover');

        const targetID = targetElement.getAttribute('data-number');
        if (targetID) {
          const tableElem = document.getElementById(targetID);
          if (tableElem) {
            tableElem.classList.add('item--hover');
            let text;
            if (targetElement.tagName === 'PLATE') {
              text = '&lt;plate&gt;&lt;/plate&gt;';
            } else if (targetElement.tagName === 'BOX') {
              text = '&lt;box&gt;&lt;/box&gt;';
            } else {
              text = targetElement.innerHTML;
            }
            this.itemListener.showTooltip(tableElem, text);
          }
        }
      });
    }
  }

  private mouseOut(): void {
    if (this.elem) {
      this.elem.addEventListener('mouseout', (event: MouseEvent) => {
        const targetElement = <HTMLElement>event.target;
        targetElement.classList.remove('editor--hover');

        const targetID = targetElement.getAttribute('data-number');
        if (targetID) {
          const tableElem = document.getElementById(targetID);
          if (tableElem) {
            tableElem.classList.remove('item--hover');
            this.itemListener.hideTooltip();
          }
        }
      });
    }
  }

  public listen(elem: HTMLElement): void {
    this.elem = elem;
    this.mouseOver();
    this.mouseOut();
  }
}
