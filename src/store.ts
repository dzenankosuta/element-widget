import { makeAutoObservable } from "mobx";

class ElementStore {
  selectedElements: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addElement(element: string) {
    if (
      this.selectedElements.length < 3 &&
      !this.selectedElements.includes(element)
    ) {
      this.selectedElements.push(element);
    }
  }

  removeElement(element: string) {
    this.selectedElements = this.selectedElements.filter(
      (el) => el !== element
    );
  }
}

export const elementStore = new ElementStore();
