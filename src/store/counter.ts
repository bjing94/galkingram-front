import { makeAutoObservable } from "mobx";

class Counter {
  count = 0;
  constructor() {
    makeAutoObservable(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.count = this.count + 1;
    console.log("inc");
  }
  decrement() {
    this.count = this.count - 1;
  }
}

export default new Counter();
