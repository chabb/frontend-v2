import React from 'react';
import { Grid, List, Image } from 'semantic-ui-react';
import { Container, Header } from 'semantic-ui-react';
import Footer from 'App/shared/components/Footer';
import styled from 'styled-components';
import { Box } from 'rebass';

const Content = styled(Box)`
  // background-image: linear-gradient(0deg, #98c1db 7%, #005a8e 100%);
  min-height: calc(100vh - 66px);
`;

const ContentGrid = styled(Grid)`
  &&& {
    min-height: calc(100vh - 130px);
    color: #4e4e4e;
    font-size: 1.1rem;
    margin-top: 0;

    .column {
      padding: 0;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 300;
    }

    .title {
      margin-bottom: 0;
      margin-left: 10px;
      margin-right: 10px;
    }

    .subtitle {
      margin-top: 0;
      margin-left: 10px;
      margin-right: 10px;
    }

    h4 {
      font-size: 1.1rem;
      margin: 3rem 0 0;
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

export default function About() {
  return (
    <ContentGrid>
      <Container text>
        <Header as="h1" style={{ 'margin-top': '10px' }}>
          About CovidScholar{' '}
        </Header>
        <p>
          This website uses natural language processing (NLP) to power search on
          a set of research papers related to COVID-19. It was created by the
          team behind <a href="https://www.matscholar.com">Matscholar</a>, a
          research effort led by the{' '}
          <a href="https://hackingmaterials.lbl.gov">HackingMaterials</a>,{' '}
          <a href="https://perssongroup.lbl.gov">Persson</a>, and{' '}
          <a href="https://ceder.berkeley.edu">Ceder</a> research groups at
          Lawrence Berkeley National Lab.
        </p>
      </Container>
      <Footer page="main" />
    </ContentGrid>
  );
}
