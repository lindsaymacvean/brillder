import React from 'react';
import { Grid } from '@material-ui/core';

import './Live.scss';
import { Brick } from 'model/brick';
import { QuestionTypeEnum, QuestionComponentTypeEnum } from "components/model/question";
import QuestionsComponent from './QuestionsComponent';

function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface IntroductionProps {
  brick: Brick;
}

const LivePage: React.FC<IntroductionProps> = ({ brick, ...props }) => {
  let { questions } = brick;
  let initAttempts:any[] = [];
  questions.forEach(question => {
    initAttempts.push({});
    if (question.type === QuestionTypeEnum.ChooseOne || question.type === QuestionTypeEnum.ChooseSeveral) {
      question.components.forEach(c => {
        if (c.type == QuestionComponentTypeEnum.Component) {
          c.list = shuffle(c.list);
        }
      });
    }
  });

  const [attempts, setAttempts] = React.useState(initAttempts);
  const [liveQuestions] = React.useState(questions);

  const updateAttempts = (attempt:any, index:number) => {
    attempts[index] = attempt;
    setAttempts(attempts);
    console.log(attempts);
  }

  return (
    <Grid container direction="row" justify="center">
      <QuestionsComponent questions={liveQuestions} updateAttempts={updateAttempts} brickId={brick.id} />
    </Grid>
  );
}

export default LivePage;