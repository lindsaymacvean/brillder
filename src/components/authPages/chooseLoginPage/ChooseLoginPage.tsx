import React from "react";
import { History } from 'history'
import { Grid, Hidden } from "@material-ui/core";
import sprite from "../../../assets/img/icons-sprite.svg";

import './ChooseLoginPage.scss';


interface ChooseLoginProps {
  history: History;
}

const ChooseLoginPage: React.FC<ChooseLoginProps> = (props) => {
  const moveToLogin = () => props.history.push('/login');

  const renderLogo = () => {
    return (
      <Grid container style={{ height: '100%' }} justify="center" alignItems="center">
        <div>
          <img alt="Logo" src="/images/choose-login/logo.png" className="logo-image" />
          <Grid container justify="center">
            <img alt="Logo" src="/images/choose-user/brillder-white-text.svg" className="logo-text-image" />
          </Grid>
        </div>
      </Grid>
    );
  }
  let googleLink = `${process.env.REACT_APP_BACKEND_HOST}/auth/google/login/build`;


  const renderButtons = () => {
    return (
      <Grid container style={{ height: '100%' }} justify="center" alignItems="center">
        <div className="button-box">
          <button className="email-button svgOnHover" onClick={moveToLogin}>
            <svg className="svg active">
              <use href={sprite + "#email"} />
            </svg>
            <span>Register &nbsp;|&nbsp; Sign in with email</span>
          </button>
          <a className="google-button svgOnHover" href={googleLink}>
            <svg className="svg active">
              <use href={sprite + "#gmail"} />
            </svg>
            <span>Register &nbsp;|&nbsp; Sign in with Google</span>
          </a>
        </div>
      </Grid>
    );
  }

  return (
    <Grid className="auth-page pre-login-page" container item justify="center" alignItems="center">
      <Hidden only={['xs']}>
        <div className="choose-login-desktop">
          <Grid container direction="row" className="first-row">
            <div className="first-col"></div>
            <div className="second-col"></div>
            <div className="third-col"></div>
          </Grid>
          <Grid container direction="row" className="second-row">
            <div className="first-col">{renderLogo()}</div>
            <div className="second-col">{renderButtons()}</div>
          </Grid>
          <Grid container direction="row" className="third-row">
            <div className="first-col"></div>
            <div className="second-col"></div>
            <div className="third-col"></div>
          </Grid>
        </div>
      </Hidden>
      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <div className="back-col">
          <div className="back-box">
            <svg className="svg active back-button" onClick={() => props.history.push('/choose-login')}>
              <use href={sprite + "#arrow-down"} />
            </svg>
          </div>
        </div>
        <div className="first-col">
          <div className="first-item">
          </div>
          <div className="second-item">
            <Grid>
              <div className="logo-box">
                <img alt="Logo" src="/images/choose-login/logo.png" className="logo-image" />
              </div>
            </Grid>
            <div className="button-box">
              <button className="email-button svgOnHover" onClick={moveToLogin}>
                <svg className="svg active">
                  <use href={sprite + "#email"} />
                </svg>
                <span>Register &nbsp;|&nbsp; Sign in with email</span>
              </button>
              <button className="google-button svgOnHover">
                <svg className="svg active">
                  <use href={sprite + "#gmail"} />
                </svg>
                <span>Register &nbsp;|&nbsp; Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
        <div className="second-col">
          <div className="first-item"></div>
          <div className="second-item"></div>
        </div>
      </Hidden>
    </Grid>
  );
}

export default ChooseLoginPage
