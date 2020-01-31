import './proFormaPage.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/proFormActions';
import brickActions from '../../redux/actions/brickActions';
import bricksActions from '../../redux/actions/bricksActions';
import EditorRowComponent from './editorRow/editorRow';
import { ProFormaProps, ProFormaSubmitData } from './model';
import ProFormComponent from './proForm/proForm';

const mapState = (state: any) => {
  return {
    submitted: state.proForm.submitted,
    data: state.proForm.data,
    bricks: state.bricks.bricks,
    brick: state.brick.brick,
  }
}

const mapDispatch = (dispatch: any) => {
  return {
    fetchProForm: (brickId: string) => dispatch(actions.fetchBrickBuildData(brickId)),
    submitProForm: (data:ProFormaSubmitData) =>  dispatch(actions.saveBrick(data)),
    fetchBricks: () => dispatch(bricksActions.fetchBricks()),
    fetchBrick: (brickId: number) => dispatch(brickActions.fetchBrick(brickId)),
  }
}

const connector = connect(
  mapState,
  mapDispatch
)

class ProFormaPage extends Component<ProFormaProps, any> {
  constructor(props: ProFormaProps) {
    super(props)
    const brickId:number = props.match.params.brickId;
    props.fetchProForm(brickId);
    if (brickId) {
      this.props.fetchBrick(brickId);
    }
  }

  render() {
    let brick = null;
    const {brickId} = this.props.match.params;
    if (brickId) {
      brick = this.props.brick;
    }

    if (this.props.data == null) {
      return (
        <div>...Loading...</div>
      )
    }

    if (brickId && brick == null) {
      return (
        <div>...Loading...</div>
      )
    }

    return (
      <div className="create-brick-page">
        <EditorRowComponent />
        <ProFormComponent parent={this.props} brick={brick} />
      </div>
    )
  }
}

export default connector(ProFormaPage);