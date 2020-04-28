import React from 'react';
import styled from 'styled-components';
import { Box, Text } from 'rebass';
import NavMenu from 'App/shared/components/NavMenu';
import { Button, Grid, Image, Modal } from 'semantic-ui-react';
import SearchForm from 'App/shared/components/SearchForm';
import Link from 'App/shared/components/Link';
import { onSearch } from './Search/Utils';
import Footer from 'App/shared/components/Footer';
import COVIDScholarLogo from 'App/shared/img/COVIDScholarLogo.png';
import { shuffle } from 'lodash';

const sampleQueries = [
  '+covid-19 +temperature impact on viral transmission',
  'basic reproduction numbers for covid-19 in +"California"',
  'grocery store worker infection rates',
  '+title:"reproduction number" +abstract:MERS',
  'Clinical trial data of COVID-19 in +("China" "Europe")',
  '+("SARS-COV-2" "coronavirus 2" "novel coronavirus")',
  '+("spike protein" "(S) protein" "S protein") +ACE2 +(covid-19 coronavirus)'
];

const Content = styled(Box)`
  // background-image: linear-gradient(0deg, #98c1db 7%, #005a8e 100%);
  min-height: calc(100vh - 66px);
`;

const ContentGrid = styled(Grid)`
  &&& {
    margin-top: calc((max(600px, 100vh) - 700px) / 2);
    color: #4e4e4e;
    font-size: 1.1rem;

    #logo {
      max-width: min(500px, 90vw);
    }

    .column {
      padding: 0;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 300;
    }

    & .ui.list {
      margin: 0.5rem 0;
    }

    .ui.form {
      max-width: 800px;
      padding: 0 0;
    }

    a {
      color: #2b8182 !important;
      font-weight: 600;
      font-weight: normal;
    }

    a:hover {
      color: #1b4b4c !important;
    }

    .margin-bottom-0 {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .margin-top-0 {
      margin-top: 0;
      padding-top: 0;
    }

    .button {
      margin-top: 10px;
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

function SearchSyntaxModal() {
  return (
    <Modal trigger={<Button size={'tiny'}>Search Syntax</Button>} closeIcon>
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

// function SearchSuggestions() {
//   return (
//     <>
//       <h4>Try searching for...</h4>
//       <List>
//         {shuffle(sampleQueries)
//           .slice(0, 3)
//           .map((query, i) => (
//             <List.Item key={i}>
//               <Link to={'/search?query=' + encodeURIComponent(query)}>
//                 {query}
//               </Link>
//             </List.Item>
//           ))}
//       </List>
//     </>
//   );
// }

function COVIDScholarDescription() {
  return (
    <Box my={4}>
      <Text mt={3}>
        <span> Using technology based on the </span>
        <Link to="https://vespa.ai">Vespa.ai</Link>
        <span> open source project.</span>
        <Text mt={1}>
          Licenced under{' '}
          <Link to="https://github.com/vespa-engine/cord-19/blob/master/LICENSE">
            Apache 2.0 License.{' '}
          </Link>
        </Text>
      </Text>
    </Box>
  );
}

function Main() {
  return (
    <Content width={1}>
      <Box width={1}>
        <NavMenu hidelogo="hide" />
      </Box>
      <ContentGrid textAlign="center">
        <Grid.Row className="margin-bottom-0">
          <div id={'logo'}>
            <Image src={COVIDScholarLogo} />
          </div>
        </Grid.Row>
        <Grid.Row className="margin-top-0 margin-bottom-0">
          <h3 size="huge" className="subtitle twelve wide column">
            COVID-19 literature search powered by advanced NLP algorithms.
          </h3>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            <SearchForm
              onSearch={onSearch}
              placeholder_query={shuffle(sampleQueries)[0]}
            />
            <div style={{ marginBottom: '80px' }}></div>
            {SearchSyntaxModal()}
            <COVIDScholarDescription />
          </Grid.Column>
        </Grid.Row>
      </ContentGrid>
      <Footer page="main" />
    </Content>
  );
}

export default Main;
