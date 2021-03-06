
import React from 'react';
import {  Hidden, Grid } from '@material-ui/core';

import './PhoneQuestionPreview.scss';
import QuestionPlay from "components/play/brick/questionPlay/QuestionPlay";


export interface PhonePreviewProps {
  question: any
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ question }) => {
  return (
    <Hidden only={['xs', 'sm']}>
      <div className="phone-question-preview-box">
        <Grid container alignContent="center" justify="center" style={{height: '100%'}}>
          <div className="phone-question-preview">
            <div className="phone">
              <div className="phone-border">
                <div className="volume volume1"></div>
                <div className="volume volume2"></div>
                <div className="volume volume3"></div>
                <div className="sleep"></div>
                <div className="screen">
                  <div className="custom-component mobile-question-component" style={{background: "white"}}>
                    <QuestionPlay question={question} isPhonePreview={true} answers={[]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </Hidden>
  );
}

export default PhonePreview;
