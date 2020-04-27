import React from 'react';
import { Card, CardContent, Grid, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledP = styled.p`
  && {
    font-size: 0.9rem;
    color: black;
  }
`;

const StyledCard = styled(Card)`
  && {
    width: min(83vw, 490px);

    .ui.grid {
      margin: 0;
    }

    .content {
      padding: 0;
    }

    .member {
      width: 100%;
      height: auto;
    }
  }
`;

function get_name_link({ name, link }) {
  if (link) {
    return (
      <a key={0} target={'_black'} href={link}>
        {name}
      </a>
    );
  }
  return <p key={0}>{name}</p>;
}

export default function MemberCard({ name, intro, pic, link }) {
  return (
    <StyledCard>
      <CardContent>
        <Grid>
          <Grid.Row style={{ padding: '1rem' }}>
            <Grid.Column width={4}>
              <Image className={'member'} src={pic} />
            </Grid.Column>
            <Grid.Column width={12} style={{ paddingLeft: '1rem' }}>
              {[
                get_name_link({ name, link }),
                <StyledP key={1}>{intro}</StyledP>
              ]}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </CardContent>
    </StyledCard>
  );
}
