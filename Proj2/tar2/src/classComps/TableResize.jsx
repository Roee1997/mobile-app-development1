import React, { Component } from "react";

export default class TableResize extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableWidth: "100%", 
    };
  }

  handleSingleClick = () => {
    this.setState({ tableWidth: "50%" });
  };

  handleDoubleClick = () => {
    this.setState({ tableWidth: "100%" });
  };

  render() {
    const { tableWidth } = this.state;

    return (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <h3>טבלה עם שינוי רוחב</h3>
        <table
          style={{
            width: tableWidth,
            border: "2px solid black",
            borderCollapse: "collapse",
            transition: "width 0.5s ease", 
          }}
          onClick={this.handleSingleClick} 
          onDoubleClick={this.handleDoubleClick}
        >
          <tbody>
            <tr>
              <td style={cellStyle}>שורה 1, עמודה 1</td>
              <td style={cellStyle}>שורה 1, עמודה 2</td>
              <td style={cellStyle}>שורה 1, עמודה 3</td>
            </tr>
            <tr>
              <td style={cellStyle}>שורה 2, עמודה 1</td>
              <td style={cellStyle}>שורה 2, עמודה 2</td>
              <td style={cellStyle}>שורה 2, עמודה 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const cellStyle = {
  border: "1px solid black",
  padding: "10px",
  textAlign: "center",
};
