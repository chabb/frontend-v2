import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Footer from 'App/shared/components/Footer';
import styled from 'styled-components';
import { Box } from 'rebass';
import NavMenu from 'App/shared/components/NavMenu';
import { ResponsiveBar } from '@nivo/bar';
import EntriesStream from './EntriesStream';
// import data from './data.json';

const data = [
  {
    source: 'LitCovid',
    PubChem: 5000
  },
  {
    source: 'CORD-19',
    Elsevier: 5000,
    medRxiv: 500,
    bioRxiv: 450,
    PubChem: 20000
  },
  {
    source: 'COVIDScholar',
    Elsevier: 20000,
    medRxiv: 1000,
    bioRxiv: 2000,
    chemRxiv: 500,
    PubChem: 20000
  }
];

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

export default function Stats() {
  return (
    <Content width={1}>
      <Box width={1}>
        <NavMenu logo="show" />
      </Box>
      <ContentGrid>
        <Container style={{ height: '25em', maxWidth: '50em' }}>
          <ResponsiveBar
            data={data}
            keys={['PubChem', 'Elsevier', 'medRxiv', 'bioRxiv', 'chemRxiv']}
            indexBy="source"
            margin={{ top: 50, right: 130, bottom: 50, left: 130 }}
            padding={0.2}
            layout="horizontal"
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            enableGridY={false}
            label={null}
            // labelSkipWidth={12}
            // labelSkipHeight={12}
            // labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: -20,
                itemWidth: 100,
                itemHeight: 17,
                itemsSpacing: 10,
                symbolSize: 20,
                itemDirection: 'left-to-right'
              }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </Container>

        <Container style={{ height: '25em', maxWidth: '50em' }}>
          <EntriesStream />
        </Container>

        {/*<Footer page="stats"/>*/}
      </ContentGrid>
    </Content>
  );
}
