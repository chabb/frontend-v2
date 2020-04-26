import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { Box } from 'rebass';
import NavMenu from 'App/shared/components/NavMenu';
import { ResponsiveBar } from '@nivo/bar';
import EntriesStream from './EntriesStream';
import Footer from '../shared/components/Footer';

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

export default function Stats() {
  return (
    <Content width={1}>
      <Box width={1}>
        <NavMenu logo="show" />
      </Box>
      <Grid className={'center aligned'}>
        <Grid.Row>
          <Grid.Column width={12} style={{ maxWidth: '50em', height: '20em' }}>
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
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={12} style={{ maxWidth: '50em', height: '25em' }}>
            <EntriesStream />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer page="stats" />
    </Content>
  );
}
