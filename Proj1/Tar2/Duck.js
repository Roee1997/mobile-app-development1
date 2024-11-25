export class Duck {
    constructor(name, color, age, weight, image) {
      this.name = name;
      this.color = color;
      this.age = age;
      this.weight = weight;
      this.image = image;
    }
  
    // Show all duck details
    Show() {
      return `
        <p>Name: ${this.name}</p>
        <p>Color: ${this.color}</p>
        <p>Age: ${this.age} years</p>
        <p>Weight: ${this.weight} kg</p>
        <img src="${this.image}" alt="${this.name}" style="width: 150px;">
      `;
    }
  
    // Quack method
    Quack() {
      const quackText = "Quack ".repeat(this.age * (this.weight / 2)).trim();
      return `<p>${quackText}</p>`;
    }
  }
  