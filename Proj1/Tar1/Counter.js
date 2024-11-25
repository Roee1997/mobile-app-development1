export class Counter {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  Initialize(value) {
    this.value = value;
  }

  Increment() {
    this.value += 1;
  }

  Go() {
    for (let i = 0; i < this.value + 1; i++) {
      console.log(i);
    }
  }
}
