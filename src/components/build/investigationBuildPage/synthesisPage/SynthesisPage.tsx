import React from 'react'

import './SynthesisPage.scss';
import { Grid, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';


export interface SynthesisProps {
  synthesis: string;
  onSynthesisChange(text: string): void
  onReview(): void
}

const SynthesisPage: React.FC<SynthesisProps> = ({ synthesis, onSynthesisChange, onReview }) => {
  document.title = "Synthesis";
  let history = useHistory();

  return (
    <div className="question-type synthesis-page">
      <div className="inner-question-type">
        <Grid container direction="row">
          <Grid item md={9}>
            <textarea
              value={synthesis}
              placeholder="Synthesis"
              onChange={(e) => onSynthesisChange(e.target.value)}></textarea>
          </Grid>
          <Grid container item md={3}>
            <div style={{width: '100%'}}>
              <div className="finish-text">Finished?</div>
              <div style={{textAlign: 'center'}}>
                <Button className="submit-button" onClick={() => onReview()}>
                  <div>
                    <div>Review</div>
                    <div>&</div>
                    <div>Submit</div>
                  </div>
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SynthesisPage
