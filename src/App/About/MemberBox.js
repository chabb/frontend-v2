import React from 'react';
import { Card, CardContent, Grid, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledP = styled.p`
  && {
    font-size: 0.9rem;
    color: black;
  }
`;

function get_name_link({ name, link }) {
  if (link) {
    return (
      <a target={'_black'} href={link}>
        {name}
      </a>
    );
  }
  return <p>{name}</p>;
}

export default function MemberCard({ name, intro, pic, link }) {
  return (
    <Card style={{ width: 490 }}>
      <CardContent>
        <Grid>
          <Grid.Row style={{ padding: '1rem' }}>
            <Grid.Column width={4}>
              <Image src={pic} width={'100px'} height={'100px'} />
            </Grid.Column>
            <Grid.Column width={12}>
              {[get_name_link({ name, link }), <StyledP>{intro}</StyledP>]}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </CardContent>
    </Card>
  );
}
