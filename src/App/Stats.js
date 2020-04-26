import React from 'react';
import { Grid, List, Image } from 'semantic-ui-react';
import { Container, Header } from 'semantic-ui-react';
import Footer from 'App/shared/components/Footer';
import styled from 'styled-components';
import { Box } from 'rebass';
import NavMenu from 'App/shared/components/NavMenu';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveStream } from '@nivo/stream';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import data from './data.json';
import covid19_data from './covid19_data.json';
import non_summed_data from './non_summed_data.json';
import non_summed_covid19_data from './non_summed_covid19_data.json';


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

const full_dataset = [data, non_summed_data];

const covid19_dataset = [covid19_data, non_summed_covid19_data];

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
        <Footer page="main" />
      </ContentGrid>
    </Content>
  );
}

class EntriesStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cumulative : true,
      dataset : full_dataset
    };
  }

  handleClick(chosen_dataset) {
    this.setState({
      dataset : chosen_dataset
    })
    return;
  }

  isCumulative(choice) {
    this.setState({
      cumulative : choice
    })
    return;
  }


  render() {
    const dataset = this.state.cumulative ? this.state.dataset[0] : this.state.dataset[1]
    return (
      <div style={{ height: 400 }} >
        <ResponsiveStream
          data={dataset}
          keys={[
            'Elsevier',
            'biorxiv',
            'COVIDScholar Submission',
            'LitCovid',
            'CORD-19',
            'medrxiv',
            'Dimensions',
            'Lens Patents',
            'Public Health Ontario COVID-19 Synopsis'
          ]}
          margin={{ top: 50, right: 200, bottom: 50, left: 70 }}
          axisTop={null}
          axisRight={null}
          xScale={{
            type: 'time',
            format: '%m/%d',
            precision: 'day'
          }}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
          }}
          axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Number of Articles', legendOffset: -54}}
          offsetType="diverging"
          colors={{ scheme: 'nivo' }}
          fillOpacity={0.85}
          borderColor={{ theme: 'background' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#2c998f',
              size: 4,
              padding: 2,
              stagger: true
            },
            {
              id: 'squares',
              type: 'patternSquares',
              background: 'inherit',
              color: '#e4c912',
              size: 6,
              padding: 2,
              stagger: true
            }
          ]}
          fill={[
            {
              match: {
                id: 'date'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'user submission'
              },
              id: 'squares'
            }
          ]}
          dotSize={8}
          dotColor={{ from: 'color'}}
          dotBorderWidth={2}
          dotBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.7 ] ] }}
          animate={true}
          motionstiffness={90}
          motionDamping={15}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 100,
              itemWidth: 80,
              itemHeight: 20,
              itemTextcolor: '#999999',
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000000'
                  }
                }
              ]
            }
          ]}
        />
        <div className='Title'>COVIDScholar Datastream Breakdown</div>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton
            value={1}
            onClick={() => this.handleClick(full_dataset)} >
            All Data
          </ToggleButton>
          <ToggleButton
            value={2}
            onClick={() => this.handleClick(covid19_dataset)} >
            COVID-19 Only
          </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <ToggleButtonGroup type="radio" name="cummulative" defaultValue={3}>
          <ToggleButton
            value={3}
            onClick={() => this.isCumulative(true)} >
            Cummulative
          </ToggleButton>
          <ToggleButton
            value={4}
            onClick={() => this.isCumulative(false)} >
            Not Cummulative
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  }
}
