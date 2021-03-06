import React from "react";
import { Grid } from "@material-ui/core";

import { Question } from "model/question";
import { ComponentAttempt } from "../model/model";

import sprite from "../../../../assets/img/icons-sprite.svg";

interface ReviewStepperProps {
  attempts: ComponentAttempt[];
  questions: Question[];
  isEnd?: boolean;
  handleStep(questionIndex: number): any;
}

const ReviewStepper: React.FC<ReviewStepperProps> = ({
  isEnd,
  questions,
  handleStep,
  attempts,
}) => {
  let colWidth = 4;
  if (questions.length > 27) {
    colWidth = 3;
  }

  let questionIndex = 0;

  const renderQuestionStep = (
    key: number,
    colWidth: any
  ) => {
    const attempt = attempts[questionIndex];

    questionIndex++;
    let index = questionIndex;
    return (
      <Grid
        item
        xs={colWidth}
        key={key}
        className="step svgOnHover"
        onClick={handleStep(index - 1)}
      >
        <span className={isEnd ? "blue" : ""}>{questionIndex}</span>
        <svg className="svg w-2 h-2 active m-l-02">
          <use
            href={attempt.correct ? sprite + "#ok" : sprite + "#cancel"}
            className={
              attempt.correct ? "text-theme-green" : "text-theme-orange"
            }
          />
        </svg>
      </Grid>
    );
  };

  return (
    <Grid container direction="row" className="stepper">
      {questions.map((question, index) =>
        renderQuestionStep(index, colWidth)
      )}
    </Grid>
  );
};

export default ReviewStepper;
