import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { Box } from 'rebass';
import NavMenu from 'App/shared/components/NavMenu';
import EntriesStream from './EntriesStream';
import Footer from '../shared/components/Footer';
import Comparison from './Comparison';

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
      <Grid
        className={'center aligned'}
        style={{ marginTop: '50px', marginBottom: '50px' }}
      >
        <Grid.Row>
          <Grid.Column width={12} style={{ maxWidth: '50em', height: '18em' }}>
            <h5>Comparison with other COVID-19 search sites</h5>
            <Comparison />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={12} style={{ maxWidth: '50em', height: '25em' }}>
            <h5>Daily paper statistics of our site</h5>
            <EntriesStream />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer page="stats" />
    </Content>
  );
}
