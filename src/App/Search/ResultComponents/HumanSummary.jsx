import React from 'react';
import { Label, Popup } from 'semantic-ui-react';

export function HumanSummarySection({ summary }) {
  return summary && summary.length ? (
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
      <span className="msweb-is-darkcyan-txt">{summary}</span>
    </div>
  ) : (
    ''
  );
}
