import React, { Component } from 'react';

export default class PsychometricForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      psychometric: '',
      message: '', 
      resultMessage: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleMouseEnter = (fieldName) => {
    this.setState({ message: `אנא מלא את השדה: ${fieldName}` });
  };

  handleMouseLeave = () => {
    this.setState({ message: '' });
  };

  checkPsychometric = () => {
    const score = parseInt(this.state.psychometric, 10);
    if (score > 555) {
      this.setState({ resultMessage: 'התקבלת ללימודים!' });
    } else {
      this.setState({ resultMessage: 'תצטרך להירשם שוב בשנה הבאה.' });
    }
  };

  render() {
    const messageStyle = { color: 'red', fontWeight: 'bold' };

    const resultStyle = this.state.resultMessage.includes('התקבלת ללימודים')
      ? { color: 'green', fontWeight: 'bold', marginTop: '20px' } 
      : { color: 'red', fontWeight: 'bold', marginTop: '20px' }; 

    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <h2>טופס הרשמה</h2>

        {this.state.message && <p style={messageStyle}>{this.state.message}</p>}

        <label>שם פרטי: </label>
        <input
          type="text"
          name="firstName"
          onMouseEnter={() => this.handleMouseEnter('שם פרטי')}
          onMouseLeave={this.handleMouseLeave}
          onChange={this.handleChange}
        />
        <br />

        <label>שם משפחה: </label>
        <input
          type="text"
          name="lastName"
          onMouseEnter={() => this.handleMouseEnter('שם משפחה')}
          onMouseLeave={this.handleMouseLeave}
          onChange={this.handleChange}
        />
        <br />

        <label>ציון פסיכומטרי: </label>
        <input
          type="number"
          name="psychometric"
          onMouseEnter={() => this.handleMouseEnter('ציון פסיכומטרי')}
          onMouseLeave={this.handleMouseLeave}
          onChange={this.handleChange}
          onKeyUp={this.checkPsychometric}
        />
        <br />

        {/* הצגת ההודעה התחתונה */}
        <p style={resultStyle}>{this.state.resultMessage}</p>
      </div>
    );
  }
}
