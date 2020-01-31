import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Brick } from '../../proFormaPage/model';

type InvestigationBuildProps = {
  brick: Brick,
  data: {
    editor: string,
    author: string,
    iteration: string
  }
}

type InvestigationBuildState = {
  subject: string,
  topic: string,
  subTopic: string,
  alternativeTopics: string,
  proposedTitle: string,
  investigationBrief: string,
  preparationBrief: string
}

const mapState = (state: any) => {
  return {
    data: state,
    brick: state.brick.brick
  }
}

class BuildPageHeaderComponent extends Component<InvestigationBuildProps, InvestigationBuildState> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const {brick, data} = this.props;
    if (!brick) {
      return "";
    }
    return (
      <div className="page-header">
        <Grid container direction="row">
          <Grid container item xs={3} sm={1} lg={1}>
            <div>Subject:</div>
          </Grid>
          <Grid container item xs={4} sm={8} lg={9}>
            <div>{brick.subject}</div>
          </Grid>
          <Grid container item xs={2} sm={1} lg={1}>
            <div><b>Author:</b></div>
          </Grid>
          <Grid container item xs={3} sm={2} lg={1}>
            <div><b>{data.author}</b></div>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid container item xs={3} sm={1} lg={1}>
            <div>Topic:</div>
          </Grid>
          <Grid container item xs={4} sm={8} lg={9}>
            <div>{brick.topic}</div>
          </Grid>
          <Grid container item xs={2} sm={1} lg={1}>
            <div>Editor:</div>
          </Grid>
          <Grid container item xs={3} sm={2} lg={1}>
            <div>{data.editor}</div>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid container item xs={3} sm={1} lg={1}>
            <div>Title:</div>
          </Grid>
          <Grid container item xs={4} sm={8} lg={9}>
            <div>{brick.title}</div>
          </Grid>
          <Grid container item xs={2} sm={1} lg={1}>
            <div>Iteration:</div>
          </Grid>
          <Grid container item xs={3} sm={2} lg={1}>
            <div>{data.iteration}</div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default connect(mapState)(BuildPageHeaderComponent);