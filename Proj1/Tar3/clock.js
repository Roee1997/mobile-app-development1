console.log("Clock module loaded");
export class Clock {
    constructor(hours, minutes, seconds, country) {
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      this.country = country;
    }
  
    ConvertToSeconds() {
      return this.hours * 3600 + this.minutes * 60 + this.seconds;
    }
  
    Show() {

      const pad = (num) => String(num).padStart(2, "0");
      return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
  }
  