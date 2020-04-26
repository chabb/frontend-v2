import React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';
import { Container, Segment } from 'semantic-ui-react';

const FooterBox = styled(Box)`
  &&& {
    width: 100%;
    margin: auto 0 0;
    background-color: transparent;
    border: none;
    box-shadow: none;
  }

  .ui {
    margin: 0;
    border: 0;
    box-shadow: none;
  }

  .ui.segment {
    padding: 2em 0em;
  }

  .ui.segment.sides {
    width: 200px;
    padding: 0;
  }

  a {
    font-weight: bold;
    color: white;
  }

  a:hover {
    color: #ffc43c;
  }

  .ui.image {
    width: 100px;
    margin: auto;
  }
`;

function Footer({ page = null }) {
  return page === 'main' ? (
    ''
  ) : (
    <FooterBox page={page}>
      <Container>
        <Segment.Group size="small">
          <Segment basic textAlign="center">
            {/*<div>*/}
            {/*  <Link to="https://vespa.ai">*/}
            {/*    <Image src={logo} />*/}
            {/*  </Link>*/}
            {/*</div>*/}
            {/*<Link to="https://pages.semanticscholar.org/coronavirus-research">*/}
            {/*  COVID-19 Open Research Dataset (CORD-19)*/}
            {/*</Link>*/}
            {/*. 2020. Version 2020-04-10. Accessed 2020-04-11.{' '}*/}
            {/*<Link to="https://doi.org/10.5281/zenodo.3727291">*/}
            {/*  doi:10.5281/zenodo.3727291*/}
            {/*</Link>*/}
            {/*<br />*/}
            <span>Copyright 2020 COVIDScholar</span>
            <br />
            <span>Icon made by Freepik from www.flaticon.com</span>
          </Segment>
          {page !== 'main' && <Segment className="sides" basic></Segment>}
        </Segment.Group>
      </Container>
    </FooterBox>
  );
}

export default Footer;
