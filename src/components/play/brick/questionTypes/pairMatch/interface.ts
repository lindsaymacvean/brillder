import {CompQuestionProps} from '../types';


export interface PairMatchChoice {
  value: string;
  index: number;
  hint: string;
  option: string;
}
  
export interface PairMatchComponent {
  type: number;
  list: PairMatchChoice[];
  choices: any[];
  options: any[];
}

export enum DragAndDropStatus {
  None,
  Init,
  Changed
}

export interface PairMatchProps extends CompQuestionProps {
  component: PairMatchComponent;
  answers: number;
}
  
export interface PairMatchState {
  status: DragAndDropStatus;
  userAnswers: any[];
}
