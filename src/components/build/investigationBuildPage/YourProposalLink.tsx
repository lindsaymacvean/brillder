import React from 'react'

import './YourProposalLink.scss';
import { TutorialStep } from './tutorial/TutorialPanelWorkArea';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';


export interface YourProposalButtonProps {
  tutorialStep: TutorialStep;
  saveBrick(): void;
  isTutorialPassed(): boolean;
}

const YourProposalLink: React.FC<YourProposalButtonProps> = ({
  tutorialStep, saveBrick, isTutorialPassed
}) => {
  const history = useHistory();
  const [buttonState, setState] = React.useState(true);

  const editProposal = () => {
    if (!isTutorialPassed()) {
      
    } else {
      saveBrick();
      history.push(`/build/new-brick/proposal`);
    }
  }

  const renderZapTooltip = () => {
    if (!isTutorialPassed() && tutorialStep === TutorialStep.Additional) {
      let className="additional-tooltip"
      if (buttonState === false) {
        className += " tooltip-off";
      }
  
      return (
        <div className={className}>
          <div className="tooltip-text">Tool Tips</div>
          <button onClick={() => setState(!buttonState)}>
            <img
              alt="" className="additional-tooltip-icon"
              src={
                buttonState === true
                  ? "/feathericons/zap-white.png"
                  : "/feathericons/zap-off-light-blue.png"
              }
            />
          </button>
        </div>
      );
    }
    return "";
  }

  let className = "proposal-container";

  if (!isTutorialPassed()) {
    if (tutorialStep === TutorialStep.Proposal) {
      className += " white proposal";
    }
  }

  return (
    <div className={className}>
      <Grid container justify="center" className="your-proposal-container">
        <div onClick={editProposal} className="proposal-link">
          <div className="proposal-edit-icon"/>
          <div className="proposal-text">
            <div style={{lineHeight: 0.9}}>YOUR</div>
            <div style={{lineHeight: 2}}>PROP</div>
            <div style={{lineHeight: 0.9}}>OSAL</div>
          </div>
        </div>
      </Grid>
      {renderZapTooltip()}
    </div>
  );
}

export default YourProposalLink;
