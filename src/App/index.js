import React from 'react';
import { Router } from '@reach/router';
import { Box, Flex } from 'rebass';
import NavMenu from 'App/shared/components/NavMenu';
import Main from './Main';
import Search from './Search';
import Article from './Article';
// import Compound from './Compound';
import About from './About';
import Stats from './Stats';
import Error from 'App/shared/components/Error';
import 'App/shared/covidscholar.css';

function App() {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box width={1}>
        <NavMenu />
      </Box>
      <Router primary={false} component={React.Fragment}>
        <Main path="/" />
        <Search path="/search" />
        <About path="/about" />
        <Stats path="/stats" />
        <Article path="/article/:id" />
        {/*<Compound path="/compound/:id" />*/}
        <Error default />
      </Router>
    </Flex>
  );
}

export default App;
