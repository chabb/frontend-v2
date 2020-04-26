import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
import non_summed_data from './EntriesStreamData/non_summed_data.json';
import covid19_data from './EntriesStreamData/covid19_data.json';
import non_summed_covid19_data from './EntriesStreamData/non_summed_covid19_data.json';
import data from './EntriesStreamData/data.json';

const dataset = {
  full: {
    cumulative: data,
    daily: non_summed_data
  },
  covid19: {
    cumulative: covid19_data,
    daily: non_summed_covid19_data
  }
};

class EntriesStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'cumulative',
      ds: 'full',
      dataset: dataset.full
    };
  }

  setDatasetName(ds) {
    if (ds !== 'full' && ds !== 'covid19')
      throw Object(["choice must be either 'cumulative' or 'daily"]);
    this.setState({
      ds: ds,
      dataset: dataset[ds]
    });
  }

  setDisplayName(choice) {
    if (choice !== 'cumulative' && choice !== 'daily')
      throw Object(["choice must be either 'cumulative' or 'daily"]);
    this.setState({
      display: choice
    });
  }

  render() {
    return (
      <div style={{ height: '300px' }} className={'ui center aligned grid'}>
        <ResponsiveStream
          data={this.state.dataset[this.state.display]}
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
            legendOffset: 36
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of Articles',
            legendOffset: -54
          }}
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
          dotColor={{ from: 'color' }}
          dotBorderWidth={2}
          dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
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
        <div
          style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}
        >
          {/*<h5>COVIDScholar Datastream Breakdown</h5>*/}
        </div>

        <div>
          <div className="ui tiny buttons">
            <button
              className={
                'ui button ' + (this.state.ds === 'full' ? ' active ' : '')
              }
              value={1}
              onClick={() => this.setDatasetName('full')}
            >
              All Data
            </button>
            <div className="or">&nbsp;</div>
            <button
              className={
                'ui button ' + (this.state.ds === 'covid19' ? ' active ' : '')
              }
              value={2}
              onClick={() => this.setDatasetName('covid19')}
            >
              COVID-19 Only
            </button>
          </div>

          <div className="ui tiny buttons">
            <button
              className={
                'ui button ' +
                (this.state.display === 'cumulative' ? ' active ' : '')
              }
              value={3}
              onClick={() => this.setDisplayName('cumulative')}
            >
              Cumulative
            </button>
            <div className="or">&nbsp;</div>
            <button
              className={
                'ui button ' +
                (this.state.display === 'daily' ? ' active ' : '')
              }
              value={4}
              onClick={() => this.setDisplayName('daily')}
            >
              Daily
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EntriesStream;
