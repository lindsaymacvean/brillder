import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import { ReactSortable } from "react-sortablejs";
import { Grid } from '@material-ui/core';

import './DragableTabs.scss';
import { validateQuestion } from '../questionService/ValidateQuestionService';
import DragTab from './dragTab';
import LastTab from './lastTab';
import SynthesisTab from './SynthesisTab';
import { TutorialStep } from '../tutorial/TutorialPanelWorkArea';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      flexWrap: 'nowrap',
      margin: '0 !important',
      overflow: 'hidden',
      transform: 'translateZ(0)',
    },
    gridListTile: {
      'text-align': 'center'
    }
  }),
);

interface Question {
  id: number;
  active: boolean;
  type: number;
}

interface DragTabsProps {
  questions: Question[];
  synthesis: string;
  isSynthesisPage: boolean;
  validationRequired: boolean;
  tutorialStep: TutorialStep;
  createNewQuestion(): void;
  moveToSynthesis(): void;
  setQuestions(questions: any): void;
  selectQuestion(e: any): void;
  removeQuestion(e: any): void;
}

const DragableTabs: React.FC<DragTabsProps> = ({
  questions, isSynthesisPage, synthesis, ...props
}) => {
  let isSynthesisPresent = true;

  const renderQuestionTab = (questions: Question[], question: Question, index: number, comlumns: number) => {
    let titleClassNames = "drag-tile-container";
    let cols = 2;
    if (question.active) {
      titleClassNames += " active";
      cols = 3;
    }

    let nextQuestion = questions[index + 1];
    if (nextQuestion && nextQuestion.active) {
      titleClassNames += " pre-active";
    }

    let width = (100 * 2) / (comlumns - 2);
    if (question.active) {
      width = (100 * 3) / (comlumns - 2);
    }

    if (isSynthesisPage) {
      width = (100 * 2) / (comlumns - 2);
    }

    let isValid = true;
    if (props.validationRequired) {
      isValid = validateQuestion(question as any);
    }

    return (
      <GridListTile className={titleClassNames} key={index} cols={cols} style={{ display: 'inline-block', width: `${width}%` }}>
        <div className={isValid ? "drag-tile valid" : "drag-tile invalid"}>
          <DragTab
            index={index}
            id={question.id}
            active={question.active}
            isValid={isValid}
            selectQuestion={props.selectQuestion}
            removeQuestion={props.removeQuestion}
          />
        </div>
      </GridListTile>
    )
  }

  const classes = useStyles();

  let columns = (questions.length * 2) + 3;

  if (isSynthesisPage) {
    columns = (questions.length * 2) + 2;
  }

  return (
    <div className={classes.root + " drag-tabs"}>
      <GridList cellHeight={40} className={classes.gridList} cols={columns}>
        <ReactSortable
          list={questions}
          className="drag-container"
          group="tabs-group"
          setList={props.setQuestions}>
          {
            questions.map((question, i) => renderQuestionTab(questions, question, i, columns))
          }
        </ReactSortable>
        <GridListTile
          onClick={props.createNewQuestion}
          className={"drag-tile-container"}
          cols={(isSynthesisPresent || isSynthesisPage) ? 1.5555 : 2}
        >
          <Grid className={"drag-tile"} container alignContent="center" justify="center">
            <LastTab tutorialStep={props.tutorialStep} />
          </Grid>
        </GridListTile>
        {
          (isSynthesisPresent || isSynthesisPage) ?
            <GridListTile
              onClick={props.moveToSynthesis}
              className={"drag-tile-container " + (isSynthesisPage ? "synthesis-tab" : "")}
              cols={1.5555}
            >
              <SynthesisTab
                columns={columns}
                tutorialStep={props.tutorialStep}
                validationRequired={props.validationRequired}
                synthesis={synthesis}
              />
            </GridListTile>
            : ""
        }
      </GridList>
    </div>
  )
}

export default DragableTabs
