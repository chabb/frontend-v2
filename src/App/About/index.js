import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import Footer from 'App/shared/components/Footer';
import NavMenu from 'App/shared/components/NavMenu';
import styled from 'styled-components';
import MemberCard from './MemberBox';
import haoyan_pic from './pics/haoyan.jpg';
import amalie_pic from './pics/amalie.jpg';
import kevin_pic from './pics/kevin.jpg';
import yuxing_pic from './pics/yuxing.jpg';
import zheren_pic from './pics/zheren.jpg';
import { Box } from 'rebass';

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

    .ui.card,
    .ui.card:first-child,
    .ui.card:last-child {
      margin: 0.5em;
    }
  }
`;

export default function About() {
  return (
    <Box width={1}>
      <Box width={1}>
        <NavMenu logo="show" />
      </Box>
      <ContentGrid>
        <Container>
          <Header as="h1" style={{ marginTop: '10px' }}>
            About CovidScholar{' '}
          </Header>
          <p>
            This website uses natural language processing (NLP) to power search
            on a set of research papers related to COVID-19. It was created by
            the team behind <a href="https://www.matscholar.com">Matscholar</a>,
            a research effort led by the{' '}
            <a href="https://hackingmaterials.lbl.gov">HackingMaterials</a>,{' '}
            <a href="https://perssongroup.lbl.gov">Persson</a>, and{' '}
            <a href="https://ceder.berkeley.edu">Ceder</a> research groups at
            Lawrence Berkeley National Lab.
          </p>

          <Header as="h2" style={{ marginTop: '10px' }}>
            Our team
          </Header>
          <Grid className={'center aligned'}>
            <MemberCard
              name={'Amalie Trewartha'}
              intro={
                'Amalie is a postdoc in Gerbrand Ceders group at LBNL. She began her career as a nuclear physicist, before moving into materials science in 2019, with a focus on machine learning. Her research interests include the application of NLP techniques to scientific literature, and building thermodynamically-motivated ML models for materials property prediction.'
              }
              pic={amalie_pic}
              link={'https://github.com/amaliet'}
            />
            <MemberCard
              name={'Haoyan Huo'}
              intro={
                'Haoyan joined Ceder Group at UC Berkeley as a PhD student in 2017. He is interested in making computers read papers and learn how to cook materials using the knowledge mined from the scientific literature knowledge base.'
              }
              pic={haoyan_pic}
              link={'https://github.com/hhaoyan'}
            />
            <MemberCard
              name={'Kevin Cruse'}
              intro={
                'Kevin joined the Ceder Group at UC Berkeley as a Ph.D. student in 2019. He uses text mining and machine learning techniques to extract synthesis recipes from materials science literature.'
              }
              pic={kevin_pic}
              link={'https://www.linkedin.com/in/kevin-cruse/'}
            />
            <MemberCard
              name={'Yuxing Fei'}
              intro={
                'Yuxing joined Ceder Group at UC Berkeley in 2020 as an undergraduate intern. He avidly dabbles in machine learning (especially natural language processing) to accelerate the design of next-generation materials.'
              }
              pic={yuxing_pic}
              link={'https://yuxingfei.com/'}
            />
            <MemberCard
              name={'Zheren Wang'}
              intro={
                'Zheren joined Ceder Group at UC Berkeley and LBNL in 2018 as a Ph.D. student. He focuses on using machine learning and optimization algorithm to find material synthesis conditions.'
              }
              pic={zheren_pic}
              link={null}
            />
          </Grid>
        </Container>
        <Footer page="main" />
      </ContentGrid>
    </Box>
  );
}
