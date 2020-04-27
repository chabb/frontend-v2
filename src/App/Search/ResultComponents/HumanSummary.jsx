import React from 'react';
import { Label, Popup } from 'semantic-ui-react';

export function HumanSummarySection({ summary_human }) {
  return summary_human && summary_human.length ? (
    <div>
      <Popup
        position="top center"
        content="Thus summary was submitted to COVIDScholar by a human expert."
        trigger={
          <Label as="h5" horizontal>
            User-submitted summary:
          </Label>
        }
      />
      <span className="msweb-is-darkcyan-txt">{summary_human}</span>
    </div>
  ) : (
    ''
  );
}
