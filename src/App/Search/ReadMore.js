import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

let maxWords = 75;
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
    let short = props.short;
    if (!short) {
      short = [];
      let words = 0,
        i = 0;
      while (words < maxWords && i < props.long.length) {
        let next = props.long[i++];
        let content = next instanceof Object ? next.toString() : next;
        let n_words = content.trim().split(/\s+/).length;
        short.push(
          words + n_words > maxWords && !(next instanceof Object)
            ? next
                .split(/\s/)
                .slice(0, maxWords - words)
                .join(' ')
            : next
        );
        words += n_words;
      }
    }

    super(props);
    this.state = {
      expanded: false,
      short: short
    };
  }

  showMoreLess = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  get_short = () => {
    return this.state.short;
  };

  render() {
    if (this.props.long && this.props.long.length > 0) {
      if (!this.state.expanded) {
        return (
          <StyledDiv>
            {this.get_short()}
            {ellipses}
            &nbsp;
            <span
              className="read-more ui"
              onClick={this.showMoreLess}
              onTouchStart={this.showMoreLess}
            >
              {'[+]'}
            </span>
          </StyledDiv>
        );
      } else {
        return (
          <StyledDiv>
            {this.props.long}
            &nbsp;
            <span
              className="read-more ui"
              onClick={this.showMoreLess}
              onTouchStart={this.showMoreLess}
            >
              {'[-]'}
            </span>
          </StyledDiv>
        );
      }
    } else {
      return <span />;
    }
  }
}

ReadMore.propTypes = {
  long: PropTypes.arrayOf(PropTypes.any),
  short: PropTypes.arrayOf(PropTypes.any)
};

export default ReadMore;
