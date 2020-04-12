import React from 'react';

import { KEY_ENTER, KEY_DOWN, KEY_UP } from '../constants/keyCodes';
import './autoComplete.css';

export class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: '',
      filteredSuggestions: props.suggestions,
      suggestionsVisible: false,
      index: 0,
    }
    
    this.searchInput = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  updateValueAndSuggestions(value) {
    const suggestionFilter = term => suggestions => suggestions.toLowerCase().startsWith(term.toLowerCase())
    const filteredSuggestions = this.props.suggestions.filter(suggestionFilter(value.toLowerCase()));
    const suggestionsVisible = value !== '' && (filteredSuggestions.length > 1 || filteredSuggestions.length === 1 && value !== filteredSuggestions[0]);
    this.setState({ value, filteredSuggestions, suggestionsVisible });
  }

  handleKeyDown(event) {
    const { keyCode } = event;
    let { index, filteredSuggestions, suggestionsVisible } = this.state;

    if (!suggestionsVisible) {
      return;
    }
    
    if (keyCode === KEY_ENTER) {
      this.updateValueAndSuggestions(filteredSuggestions[index]);
      this.setState({ index: 0 });
      return;
    }

    // Loop arund the list when reaching its boundaries
    if (keyCode === KEY_UP) {
      index = index === 0 ? filteredSuggestions.length - 1 : index - 1;
    } else if (keyCode === KEY_DOWN) {
      index = index === filteredSuggestions.length - 1 ? 0 : index + 1;
    } else {
      index = 0;
    }
    document.querySelectorAll('.suggestion-list__item')[index].scrollIntoView();
    this.setState({ index });
  }

  handleChange(event) {
    this.updateValueAndSuggestions(event.target.value);
  }
  
  handleClickItem(value) {
    this.updateValueAndSuggestions(value);
    this.setState({ index: 0 });
    this.searchInput.current.focus();
  }

  render() {
    const { value, filteredSuggestions } = this.state;

    return (
      <div className="wrapper">
        <input
          ref={this.searchInput}
          className="search-input"
          type="text"
          id="auto-complete"
          placeholder="Type..."
          value={value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
        {this.state.suggestionsVisible &&
          <ul ref={this.suggestionList} className="suggestion-list">
            {filteredSuggestions.map((suggestion, index) => 
              <li
                key={`${suggestion}${index}`}
                className={`suggestion-list__item ${index === this.state.index && 'suggestion-list__item--active'}`}
                onClick={() => this.handleClickItem(suggestion)}
              >
                <span className="suggestion--matched">{suggestion.slice(0, value.length)}</span>
                <span>{suggestion.slice(value.length)}</span>
              </li>
            )}
          </ul>
        }
      </div>
    );
  }
}
