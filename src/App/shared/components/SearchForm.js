import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Icon, Input, Modal } from 'semantic-ui-react';
import Link from './Link';
import { shuffle } from 'lodash';

const StyledSearchForm = styled(Form)`
  &&& {
    font-size: 1.1rem;
    margin: 0 auto;

    input[type='text'] {
      border-radius: 1.3rem;
    }
  }
`;

function pinkCodeLink(code) {
  return (
    <Link to={`/search?query=${code.replace('+', '%2B')}`}>
      <code style={{ color: 'lightcoral' }}>{code}</code>
    </Link>
  );
}

const StyledFakeButton = styled.a`
  && {
    cursor: pointer;
    text-decoration: underline;
    color: #2b8182 !important;
  }

  &&:hover {
    color: #1b4b4c !important;
  }
`;

function SearchSyntaxModal() {
  return (
    <Modal
      trigger={<StyledFakeButton>Search Syntax</StyledFakeButton>}
      closeIcon
    >
      <Modal.Header>COVIDScholar Search Syntax</Modal.Header>
      <Modal.Content>
        <ul>
          <li>
            <div> Use quotes to search for a specivid multi-word phrase.</div>
            <div className="center-block">
              {' '}
              e.g. {pinkCodeLink('"spike protein"')}
            </div>
          </li>
          <li>
            <div>
              {' '}
              Use <code>+query_term</code> to specify that the result must
              include the term and -query_term for must not.
            </div>
            <div className="center-block">
              {' '}
              e.g. {pinkCodeLink('+coronavirus -COVID-19')}
            </div>
          </li>
          <li>
            <div>
              {' '}
              Use {pinkCodeLink('()')} to specify OR, matches any of the terms
              inside.
            </div>
            <div>
              {' '}
              e.g.{' '}
              {pinkCodeLink(
                'symptoms +(COVID-19 SARS-COV-2 "novel coronavirus")'
              )}
            </div>
          </li>
          <li>
            <div> To search specific fields use fieldname:query_term.</div>
            <div className="center-block">
              {' '}
              e.g. {pinkCodeLink('title:"ACE2 inhibitor" tag:Treatment')}
            </div>
          </li>
        </ul>
      </Modal.Content>
    </Modal>
  );
}

const sampleQueries = [
  '+covid-19 +temperature impact on viral transmission',
  'basic reproduction numbers for covid-19 in +"California"',
  'grocery store worker infection rates',
  '+title:"reproduction number" +abstract:MERS',
  'Clinical trial data of COVID-19 in +("China" "Europe")',
  '+("SARS-COV-2" "coronavirus 2" "novel coronavirus")',
  '+("spike protein" "(S) protein" "S protein") +ACE2 +(covid-19 coronavirus)'
];

function SearchForm({ onSearch, query = '', show_button = false }) {
  const [currentQuery, setCurrentQuery] = useState(query);
  useEffect(() => {
    if (query !== currentQuery) setCurrentQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  const handleSearch = () => onSearch({ query: currentQuery });

  let input_obj = {};

  return (
    <>
      <StyledSearchForm onSubmit={handleSearch}>
        <Input
          fluid
          icon={<Icon name="search" link onClick={handleSearch} />}
          placeholder={'Search...'}
          autoFocus={true}
          className="input"
          onChange={(e, { value }) => setCurrentQuery(value)}
          ref={ref => (input_obj.input = ref)}
          value={currentQuery}
        />
      </StyledSearchForm>
      {show_button ? (
        <>
          <Button
            onClick={() => {
              setCurrentQuery(shuffle(sampleQueries)[0]);
              input_obj.input.focus();
            }}
          >
            Example
          </Button>
          &nbsp;
          {SearchSyntaxModal()}
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default SearchForm;

// import _ from 'lodash'
// import faker from 'faker'
// import React, { Component } from 'react'
// import { Search, Grid, Header, Segment } from 'semantic-ui-react'
//
// const initialState = { isLoading: false, results: [], value: '' }
//
// const source = _.times(5, () => ({
//     title: faker.company.companyName(),
//     description: faker.company.catchPhrase(),
//     image: faker.internet.avatar(),
//     price: faker.finance.amount(0, 100, 2, '$'),
// }))
//
// export default class SearchExampleStandard extends Component {
//     state = initialState
//
//     handleResultSelect = (e, { result }) => this.setState({ value: result.title })
//
//     handleSearchChange = (e, { value }) => {
//         this.setState({ isLoading: true, value })
//
//         setTimeout(() => {
//             if (this.state.value.length < 1) return this.setState(initialState)
//
//             const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
//             const isMatch = (result) => re.test(result.title)
//
//             this.setState({
//                 isLoading: false,
//                 results: _.filter(source, isMatch),
//             })
//         }, 300)
//     }
//
//     render() {
//         const { isLoading, value, results } = this.state
//
//         return (
//             <Grid>
//                 <Grid.Column width={6}>
//                     <Search
//                         loading={isLoading}
//                         onResultSelect={this.handleResultSelect}
//                         onSearchChange={_.debounce(this.handleSearchChange, 500, {
//                             leading: true,
//                         })}
//                         results={results}
//                         value={value}
//                         {...this.props}
//                     />
//                 </Grid.Column>
//                 <Grid.Column width={10}>
//                     <Segment>
//                         <Header>State</Header>
//                         <pre style={{ overflowX: 'auto' }}>
//               {JSON.stringify(this.state, null, 2)}
//             </pre>
//                         <Header>Options</Header>
//                         <pre style={{ overflowX: 'auto' }}>
//               {JSON.stringify(source, null, 2)}
//             </pre>
//                     </Segment>
//                 </Grid.Column>
//             </Grid>
//         )
//     }
// }
