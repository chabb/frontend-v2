import React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';
import {
  Menu,
  Container,
  Responsive,
  Icon,
  Dropdown,
  Image
} from 'semantic-ui-react';
import Link from 'App/shared/components/Link';
import COVIDScholarLogoWide from '../img/COVIDScholarLogoWide.png';

const Header = styled(Box)`
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  a {
    cursor: pointer;
    font-weight: 600;
  }
`;

const NavBar = styled(Menu)`
  &&& {
    height: 55px;
    margin: 0;

    border-bottom: 1px solid rgba(63, 157, 216, 0.25);

    .item.header {
      font-weight: bold;
      font-size: 1.4em;
    }

    .item,
    .item > a,
    .item > a:not(.ui) {
      color: #4e4e4e;
      font-weight: bold;
    }

    .item > a:hover {
      color: #7d7d7d;
    }

    .item:last-child {
      padding-right: 0 !important;
      margin-right: 0 !important;
    }

    .ui.image {
      width: 250px;
    }

    span {
      color: #ffc43c;
    }

    .dropdown.item .menu {
      box-shadow: none;
    }

    .header {
      height: 100%;
    }

    .header > img {
      margin-top: 5px;
      margin-left: 30px;
      height: 100%;
    }
  }
`;

const logo = (
  <Link to="/">
    <Image src={COVIDScholarLogoWide} />
  </Link>
);

const items = [
  { content: <Link to="/about">About</Link> },
  { content: <Link to="/stats">Our Data</Link> }
];

function Nav({ children, hidelogo }) {
  return (
    <NavBar secondary inverted fluid>
      {hidelogo.hidelogo.hidelogo === 'hide' ? (
        <Menu.Item header fitted />
      ) : (
        <Menu.Item header fitted>
          {logo}
        </Menu.Item>
      )}
      {children}
    </NavBar>
  );
}

function Mobile(hidelogo) {
  return (
    <Responsive {...Responsive.onlyMobile}>
      <Nav hidelogo={hidelogo}>
        <Menu.Menu position="right">
          <Dropdown item icon={null} trigger={<Icon name="bars" />}>
            <Dropdown.Menu items={items}>
              {items.map((item, idx) => (
                <Dropdown.Item key={idx} {...item} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Nav>
    </Responsive>
  );
}

function Desktop(hidelogo) {
  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Nav hidelogo={hidelogo}>
        <Menu.Menu position="right">
          {items.map((item, idx) => (
            <Menu.Item key={idx} {...item} />
          ))}
        </Menu.Menu>
      </Nav>
    </Responsive>
  );
}

function NavMenu(hidelogo) {
  return (
    <Header sx={{ paddingLeft: '0px', paddingRight: '0px' }} width={1}>
      <Container>
        <Desktop hidelogo={hidelogo} />
        <Mobile hidelogo={hidelogo} />
      </Container>
    </Header>
  );
}

export default NavMenu;
