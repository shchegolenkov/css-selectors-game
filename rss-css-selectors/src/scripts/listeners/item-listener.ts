export default class ItemListener {
  private tooltipEl: HTMLDivElement;

  constructor() {
    this.tooltipEl = document.createElement('div');
  }

  public showTooltip(target: HTMLElement, data: string): void {
    this.tooltipEl.className = 'tooltip';
    this.tooltipEl.innerHTML = data;
    document.body.append(this.tooltipEl);

    const coords = target.getBoundingClientRect();
    let left = coords.left + (target.offsetWidth - this.tooltipEl.offsetWidth) / 2;
    if (left < 0) left = 0;
    let top = coords.top - this.tooltipEl.offsetHeight - 5;
    if (top < 0) top = coords.top + target.offsetHeight + 5;
    this.tooltipEl.style.left = left + 'px';
    this.tooltipEl.style.top = top + 'px';
  }

  private mouseOver(item: HTMLElement): void {
    item.addEventListener('mouseover', (event: Event) => {
      const targetElement = <HTMLElement>event.target;
      targetElement.classList.add('item--hover');

      const targetID = targetElement.getAttribute('id');
      if (targetID) {
        const codeElem = document.querySelector(`[data-number='${targetID}']`);
        if (codeElem) codeElem.classList.add('editor--hover');
        let text;
        if (targetElement.tagName === 'PLATE') {
          text = '&lt;plate&gt;&lt;/plate&gt;';
        } else if (targetElement.tagName === 'BOX') {
          text = '&lt;box&gt;&lt;/box&gt;';
        } else {
          text = codeElem ? codeElem.innerHTML : '';
        }
        this.showTooltip(targetElement, text);
      }
    });
  }

  private mouseOut(item: HTMLElement): void {
    item.addEventListener('mouseout', (event: Event) => {
      const targetElement = <HTMLElement>event.target;
      targetElement.classList.remove('item--hover');

      const targetID = targetElement.getAttribute('id');
      if (targetID) {
        const codeElem = document.querySelector(`[data-number='${targetID}']`);
        if (codeElem) codeElem.classList.remove('editor--hover');
        this.hideTooltip();
      }
    });
  }

  public hideTooltip(): void {
    if (this.tooltipEl) {
      this.tooltipEl.remove();
    }
  }

  public listen(item: HTMLElement): void {
    this.mouseOver(item);
    this.mouseOut(item);
  }
}
