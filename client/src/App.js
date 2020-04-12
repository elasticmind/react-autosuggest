import React from 'react';
import './App.css';
import { AutoComplete } from './AutoComplete';

const API_URL = 'http://localhost:9000';

export class App extends React.Component {
  constructor() {
    super()

    this.state = {
      suggestions: [],
    }
  }

  async componentDidMount() {
    const request = await fetch(`${API_URL}/search`);
    const suggestions = await request.json()
    this.setState({ suggestions });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="header" >
            Name your child with ease!
          </h1>
          <h3 className="header" >
            Search for names below...
          </h3>
          <AutoComplete suggestions={this.state.suggestions} />
        </header>
      </div>
    );
  }
}
