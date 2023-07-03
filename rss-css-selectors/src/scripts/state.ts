import EventEmitter from './listeners/event-emitter';
import { getLocalStorage, setLocalStorage, setObjLocalStorage, getObjLocalStorage } from './localStorage';

export default class State extends EventEmitter {
  private currentLevel: number;
  private completedLevels: string[];
  private skippedLevels: string[];

  constructor() {
    super();

    this.currentLevel = 1;
    this.completedLevels = [];
    this.skippedLevels = [];

    this.getLocalStor();

    this.on('win', () => this.setCompletedLevels(this.currentLevel));
    this.on('help', () => this.setSkippedLevels(this.currentLevel));
    this.on('reset', () => this.resetProgress());
  }

  private getLocalStor(): void {
    if (!getLocalStorage('currentLevel')) setLocalStorage('currentLevel', '1');
    this.currentLevel = Number(getLocalStorage('currentLevel'));

    const skippedLevelsLocal = getObjLocalStorage('skippedLevels');
    if (skippedLevelsLocal) this.skippedLevels = skippedLevelsLocal;

    const completedLevelsLocal = getObjLocalStorage('completedLevels');
    if (completedLevelsLocal) this.completedLevels = completedLevelsLocal;
  }

  private setSkippedLevels(level: number | []): void {
    if (!this.skippedLevels.includes(level.toString())) this.skippedLevels.push(level.toString());
    setObjLocalStorage('skippedLevels', this.skippedLevels);
  }

  private setCompletedLevels(level: number | []): void {
    if (!this.completedLevels.includes(level.toString())) this.completedLevels.push(level.toString());
    setObjLocalStorage('completedLevels', this.completedLevels);
  }

  private resetProgress(): void {
    this.setCurrentLevel(1);
    this.skippedLevels = [];
    this.completedLevels = [];
    setObjLocalStorage('completedLevels', []);
    setObjLocalStorage('skippedLevels', []);
  }

  public getCompletedLevels(): string[] {
    return this.completedLevels;
  }

  public getSkippedLevels(): string[] {
    return this.skippedLevels;
  }

  public getCurrentLevel(): number {
    return this.currentLevel;
  }

  public setCurrentLevel(level: number): void {
    this.currentLevel = level;
    setLocalStorage('currentLevel', level.toString());
  }
}
