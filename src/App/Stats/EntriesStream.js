import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
import {Get} from './App/shared/Fetcher';
import { Error, Loading } from './App/shared/components/Messages';
import non_summed_data from './EntriesStreamData/non_summed_data.json';
import covid19_data from './EntriesStreamData/covid19_data.json';
import non_summed_covid19_data from './EntriesStreamData/non_summed_covid19_data.json';
import data from './EntriesStreamData/data.json';
import { Responsive } from 'semantic-ui-react';

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
    console.log('hi')
    this.state = {
      display: 'daily',
      ds: 'covid19',
      dataset: dataset.covid19
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

  Mobile({ that }) {
    return(
      <Responsive
        {...Responsive.onlyMobile}
        style={{ height: '100%', width: '100%' }}
      >
        <ResponsiveStream
          data={that.state.dataset[that.state.display]}
          keys={[
            'Elsevier',
            'biorxiv',
            'COVIDScholar Submission',
            'LitCovid',
            'CORD-19',
            'medrxiv',
            'Dimensions Publications',
            'Dimensions Clinical Trials',
            'Dimensions Data Sets',
            'Lens Patents',
            'Public Health Ontario COVID-19 Synopsis'
          ]}
          margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
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
          legends={[]}
        />
      </Responsive>
    );
  }

  Desktop({ that }) {
    return (
      <Responsive
        minWidth={Responsive.onlyTablet.minWidth}
        style={{ height: '100%', width: '100%' }}
      >
        <ResponsiveStream
          data={that.state.dataset[that.state.display]}
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
      </Responsive>
    );
  }

  render() {
    /* Grab sources breakdown from stats api */
    function Sources({}) {
      const url = new URL(window.location);
      const { loading, response, error } = Get(
        `http://api-stats.covidscholar-spin.dev-cattle.stable.spin.nersc.org:55041/sources/`
      ).state();

      if (loading) return <Loading message="Loading..." />;
      if (error)
        return <Error message={error.message || `Failed to load sources data`} />;

      const full_daily_data = (response)
        .map(entry => {
          return {
            ['Elsevier']: entry['Elsevier'],
            ['biorxiv']: entry['biorxiv'],
            ['COVIDScholar Submission']: entry['COVIDScholar Submission'],
            ['LitCovid']: entry['LitCovid'],
            ['CORD-19']: entry['CORD-19'],
            ['medrxiv']: entry['medrxiv'],
            ['Dimensions Publications']: entry['Dimensions Publications'],
            ['Dimensions Clinical Trials']: entry['Dimensions Clinical Trials'],
            ['Dimensions Data Sets']: entry['Dimensions Data Sets'],
            ['Lens Patents']: entry['Lens Patents'],
            ['Public Health Ontario COVID-19 Synopsis']: entry['Public Health Ontario COVID-19 Synopsis']
          };
        });

      const full_cumulative_data = (response)
        .map(entry => {
          return {
            ['Elsevier']: entry['Elsevier_sum'],
            ['biorxiv']: entry['biorxiv_sum'],
            ['COVIDScholar Submission']: entry['COVIDScholar Submission_sum'],
            ['LitCovid']: entry['LitCovid_sum'],
            ['CORD-19']: entry['CORD-19_sum'],
            ['medrxiv']: entry['medrxiv_sum'],
            ['Dimensions Publications']: entry['Dimensions Publications_sum'],
            ['Dimensions Clinical Trials']: entry['Dimensions Clinical Trials_sum'],
            ['Dimensions Data Sets']: entry['Dimensions Data Sets_sum'],
            ['Lens Patents']: entry['Lens Patents_sum'],
            ['Public Health Ontario COVID-19 Synopsis']: entry['Public Health Ontario COVID-19 Synopsis_sum']
          };
        });

      const covid19_daily_data = (response)
        .map(entry => {
          return {
            ['Elsevier']: entry['Elsevier_covid19'],
            ['biorxiv']: entry['biorxiv_covid19'],
            ['COVIDScholar Submission']: entry['COVIDScholar Submission_covid19'],
            ['LitCovid']: entry['LitCovid_covid19'],
            ['CORD-19']: entry['CORD-19_covid19'],
            ['medrxiv']: entry['medrxiv_covid19'],
            ['Dimensions Publications']: entry['Dimensions Publications_covid19'],
            ['Dimensions Clinical Trials']: entry['Dimensions Clinical Trials_covid19'],
            ['Dimensions Data Sets']: entry['Dimensions Data Sets_covid19'],
            ['Lens Patents']: entry['Lens Patents_covid19'],
            ['Public Health Ontario COVID-19 Synopsis']: entry['Public Health Ontario COVID-19 Synopsis_covid19']
          };
        });

      const covid19_cumulative_data = (response)
      .map(entry => {
        return {
          ['Elsevier']: entry['Elsevier_covid19_sum'],
          ['biorxiv']: entry['biorxiv_covid19_sum'],
          ['COVIDScholar Submission']: entry['COVIDScholar Submission_covid19_sum'],
          ['LitCovid']: entry['LitCovid_covid19_sum'],
          ['CORD-19']: entry['CORD-19_covid19_sum'],
          ['medrxiv']: entry['medrxiv_covid19_sum'],
          ['Dimensions Publications']: entry['Dimensions Publications_covid19_sum'],
          ['Dimensions Clinical Trials']: entry['Dimensions Clinical Trials_covid19_sum'],
          ['Dimensions Data Sets']: entry['Dimensions Data Sets_covid19_sum'],
          ['Lens Patents']: entry['Lens Patents_covid19_sum'],
          ['Public Health Ontario COVID-19 Synopsis']: entry['Public Health Ontario COVID-19 Synopsis_covid19_sum']
        };
      });

      const dataset = {
        full: {
          cumulative: full_cumulative_data,
          daily: full_daily_data
        },
        covid19: {
          cumulative: covid19_cumulative_data,
          daily: covid19_daily_data
        }
      };
    };

    return (
      <div style={{ height: '300px' }} className={'ui center aligned grid'}>
        <Sources/>
        <this.Mobile that={this} />
        <this.Desktop that={this} />
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

          <span>&nbsp;</span>

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
