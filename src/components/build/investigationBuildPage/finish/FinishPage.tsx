import React, { Component } from "react";
import { User } from 'model/user';
import { Grid, CircularProgress } from "@material-ui/core";
// @ts-ignore
import { connect } from 'react-redux';

import "./FinishPage.scss";
import { ReduxCombinedState } from "redux/reducers";


interface FinishBrickProps {
  history: any;
  match: any;
  user: User;
  forgetBrick(): void;
  logout(): void;
}

enum ButtonStatus {
  Start,
  Pressed,
  Wider
}

interface FinishBrickState {
  status: ButtonStatus;
  progress: number;
  failedRequest: boolean;
  myRef: any;
}

class FinishBrickPage extends Component<FinishBrickProps, FinishBrickState> {
  constructor(props: FinishBrickProps) {
    super(props);

    this.state = {
      status: ButtonStatus.Start,
      myRef: React.createRef(),
      failedRequest: false,
      progress: 0
    };
  }

  animate(e: any) {
    let target = e.currentTarget;
    target.style.width = "7vw";
    target.style.background = "white";
    target.style.color = "#3FCA79";
    target.borderRadius = "20vw";
    e.target.style.fontSize = "3vw";
    e.target.innerHTML = `<img alt="tick" src="/images/tick-white.png" />`;

    setTimeout(() => {
      this.setState({ ...this.state, status: ButtonStatus.Pressed });
      let counter = setInterval(() => {
        if (this.state.progress < 100) {
          this.setState({ ...this.state, progress: this.state.progress + 4 });
        } else {
          clearInterval(counter);
          this.setState({ ...this.state, status: ButtonStatus.Wider });
        }
      }, 40);
    }, 400);
  }

  componentDidUpdate() {
    if (this.state.status === ButtonStatus.Wider) {
      let button = this.state.myRef.current;
      setTimeout(() => {
        button.style.width = '25vw';
      }, 200);
    }
  }

  render() {
    const { status } = this.state;
    return (
      <Grid
        container
        direction="row"
        className="submit-brick-page"
        justify="center"
        alignContent="center"
      >
        {status === ButtonStatus.Start ? (
          <button
            className="submit-brick-button"
            onClick={e => this.animate(e)}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignContent="center"
            >
              FINISH
            </Grid>
          </button>
        ) : (
          ""
        )}
        {status === ButtonStatus.Pressed ? (
          <div className="brick-spinner">
            <CircularProgress
              variant="static"
              value={100}
              color="secondary"
              className="spinner spinner-background"
            />
            <CircularProgress
              variant="determinate"
              value={this.state.progress}
              color="secondary"
              className="spinner front-spinner"
            />
          </div>
        ) : (
          ""
        )}
        {status === ButtonStatus.Wider ? (
          <button
            className="submit-brick-button"
            ref={this.state.myRef}
            style={{width: '7vw'}}
            onClick={() => this.props.history.push('/build')}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignContent="center"
            >
              <img alt="tick" src="/images/tick-white.png" />
            </Grid>
          </button>
        ) : (
          ""
        )}
      </Grid>
    );
  }
}

const mapState = (state: ReduxCombinedState) => ({
  user: state.user.user,
})

const connector = connect(mapState)

export default connector(FinishBrickPage);
