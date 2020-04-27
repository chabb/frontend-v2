import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

let maxLength = 300;
let ellipses = '...';

const StyledDiv = styled.div`
  && {
    display: inline;

    .read-more,
    .read-less {
      color: #005a8e;
      cursor: pointer;
      position: relative;
      top: -0.05rem;
    }

    .read-more:hover,
    .read-less:hover {
      text-decoration: underline;
    }
  }
`;

class ReadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  showMoreLess = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  get_short = () => {
    if (this.props.short) return this.props.short;

    for (let i = maxLength; i > 0; i--) {
      if (this.props.long[i - 1] === ' ') return this.props.long.substr(0, i);
    }
    return this.props.long.substr(0, maxLength);
  };

  render() {
    console.log(this.props);
    if (this.props.long && this.props.long.length > 0) {
      if (!this.state.expanded) {
        return (
          <div>
            {this.get_short() + ellipses}
            &nbsp;
            <span
              className="read-more ui"
              onClick={this.showMoreLess}
              onTouchStart={this.showMoreLess}
            >
              {'[+]'}
            </span>
          </div>
        );
      } else {
        return (
          <div>
            {this.props.long}
            &nbsp;
            <span
              className="read-more ui"
              onClick={this.showMoreLess}
              onTouchStart={this.showMoreLess}
            >
              {'[-]'}
            </span>
          </div>
        );
      }
    } else {
      return <span />;
    }
  }
}

ReadMore.propTypes = {
  long: PropTypes.string.isRequired,
  short: PropTypes.string
};

export default ReadMore;
