import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

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

export default function Comparison() {
  return (
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
  );
}
