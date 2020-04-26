import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'rebass';
import NavMenu from 'App/shared/components/NavMenu';
import { Grid, Image, List } from 'semantic-ui-react';
import { shuffle } from 'lodash';
import SearchForm from 'App/shared/components/SearchForm';
import Link from 'App/shared/components/Link';
import { onSearch } from './Search/Utils';
import Footer from 'App/shared/components/Footer';
import COVIDScholarLogo from 'App/shared/img/COVIDScholarLogo.png';

const sampleQueries = [
  '+covid-19 +temperature impact on viral transmission',
  'basic reproduction numbers for covid-19 in +"California"',
  'Impact of school closure to handle COVID-19 pandemic',
  '+title:"reproduction number" +abstract:MERS',
  '+authors.name:"Neil M Ferguson"',
  '+("SARS-COV-2" "coronavirus 2" "novel coronavirus")',
  '+("spike protein" "(S) protein" "S protein") +ACE2 +(covid-19 coronavirus)'
];

const Content = styled(Box)`
  // background-image: linear-gradient(0deg, #98c1db 7%, #005a8e 100%);
  min-height: calc(100vh - 66px);
`;

const ContentGrid = styled(Grid)`
  &&& {
    margin-top: calc((max(600px, 100vh) - 600px) / 2);
    color: #4e4e4e;
    font-size: 1.1rem;

    #logo {
      width: 300px;
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
      padding: 0 2rem;
    }

    a {
      color: #2b8182 !important;
      font-weight: 600;
      font-weight: normal;
    }

    a:hover {
      color: #1b4b4c !important;
    }
  }
`;

function SearchSuggestions() {
  return (
    <>
      <h4>Try searching for...</h4>
      <List>
        {shuffle(sampleQueries)
          .slice(0, 3)
          .map((query, i) => (
            <List.Item key={i}>
              <Link to={'/search?query=' + encodeURIComponent(query)}>
                {query}
              </Link>
            </List.Item>
          ))}
      </List>
    </>
  );
}

function COVIDScholarDescription() {
  return (
    <Box my={4}>
      <Text mt={3}>
        A knowledge portal for COVID-19 research built using
        <Link to="https://vespa.ai">Vespa.ai.</Link>
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
        <Grid.Row>
          <Image src={COVIDScholarLogo} id={'logo'} />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            <SearchForm onSearch={onSearch} />
            <SearchSuggestions />
            <COVIDScholarDescription />
          </Grid.Column>
        </Grid.Row>
      </ContentGrid>
      <Footer page="main" />
    </Content>
  );
}

export default Main;
