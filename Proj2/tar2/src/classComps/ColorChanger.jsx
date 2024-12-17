import React, { Component } from "react";

export default class ColorChanger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "white",
    };
  }

  changeColor = (color) => {
    this.setState({ backgroundColor: color });
  };

  render() {
    const colors = ["red", "blue", "green", "yellow", "pink", "purple", "orange", "gray"];

    return (
      
      <div style={{ padding: 20 }}>
      <h1>Change Div Colors</h1>
        <div
          style={{
            width: "300px",
            height: "200px",
            backgroundColor: this.state.backgroundColor,
            border: "2px solid black",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ textAlign: "center", lineHeight: "200px" }}>
            Background Color: {this.state.backgroundColor}
          </h3>
        </div>

        <div>
          {colors.map((color) => (
            <button
              key={color}
              style={{
                margin: "5px",
                padding: "10px",
                backgroundColor: color,
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => this.changeColor(color)} // שינוי צבע
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
