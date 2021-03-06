import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core';
import MediaQuery from 'react-responsive';

import './dragBox.scss';
import { QuestionComponentTypeEnum } from 'model/question';


const HoverBox = ({ marginTop, label }: any) => {
  return (
    <Fragment>
      <MediaQuery minDeviceWidth={1280}>
        <div className="drag-box-hover" style={{ marginTop }}>{label}</div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1280}>
        <div className="drag-box-hover" style={{ marginTop }}>{label}</div>
      </MediaQuery>
    </Fragment>
  );
}

export interface BoxProps {
  locked: boolean,
  name?: string,
  value: QuestionComponentTypeEnum,
  isImage?: boolean,
  label?: string,
  src?: string,
  fontSize?: string,
  letterSpacing?: string,
  marginTop?: any,
  marginLeft?: any,
  hoverMarginTop?: any,
  fontFamily?: string,
}

const DragBox: React.FC<BoxProps> = ({
  name, fontSize, isImage, src, label, marginTop, marginLeft, hoverMarginTop, fontFamily, locked, letterSpacing
}) => {
  const renderContent = () => {
    if (isImage) {
      return <div>
        <img alt="" style={{ width: '35%' }} src={src} />
        <HoverBox label={label} marginTop={hoverMarginTop} />
      </div>
    }
    return (
      <div>
        <div className="drag-box-name" style={{fontFamily, letterSpacing, marginLeft }}>{name}</div>
        <HoverBox label={label} marginTop={hoverMarginTop} />
      </div>
    );
  }

  return (
    <Grid container item xs={12} className="drag-box-item" style={{ fontSize: fontSize, marginTop }}>
      {renderContent()}
    </Grid>
  )
}

export default DragBox
