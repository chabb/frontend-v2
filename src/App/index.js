import React from 'react';
import { Router } from '@reach/router';
import { Flex } from 'rebass';
import Main from './Main';
import Search from './Search';
import Article from './Article';
// import Compound from './Compound';
import About from './About';
import Stats from './Stats';
import Error from 'App/shared/components/Error';
import 'App/shared/covidscholar.css';
import Privacy from './Privacy';

function App() {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Router primary={false} component={React.Fragment}>
        <Main path="/" z />
        <Search path="/search" />
        <About path="/about" />
        <Stats path="/stats" />
        <Privacy path="/privacy" />
        <Article path="/article/:id" />
        {/*<Compound path="/compound/:id" />*/}
        <Error default />
      </Router>
    </Flex>
  );
}

export default App;
