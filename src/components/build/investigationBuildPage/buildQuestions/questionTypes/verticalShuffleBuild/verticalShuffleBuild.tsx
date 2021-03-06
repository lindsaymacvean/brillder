import React, {useEffect} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import AddAnswerButton from '../../baseComponents/addAnswerButton/AddAnswerButton';

import './verticalShuffleBuild.scss'
import { UniqueComponentProps } from '../types';
import DocumentWirisCKEditor from 'components/baseComponents/ckeditor/DocumentWirisEditor';


export interface VerticalShuffleBuildProps extends UniqueComponentProps {
}

const VerticalShuffleBuildComponent: React.FC<VerticalShuffleBuildProps> = ({
  locked, data, validationRequired, save, updateComponent
}) => {
  const [height, setHeight] = React.useState('0%');

  useEffect(() => calculateHeight());

  const newAnswer = () => ({value: ""});
  
  if (!data.list) {
    data.list = [newAnswer(), newAnswer(), newAnswer()];
  } else if (data.list.length < 3) {
    data.list.push(newAnswer());
    updateComponent(data);
  }

  const [state, setState] = React.useState(data);

  useEffect(() => { setState(data) }, [data]);

  const update = () => {
    setState(Object.assign({}, state));
    updateComponent(state);
    calculateHeight();
  }

  const changed = (answer: any, value: string) => {
    if (locked) { return; }
    answer.value = value;
    update();
  }

  const addAnswer = () => {
    if (locked) { return; }
    state.list.push({ value: ""});
    update();
    save();
  }

  const removeFromList = (index: number) => {
    if (locked) { return; }
    state.list.splice(index, 1);
    update();
    save();
  }

  const calculateHeight = () => {
    let showButton = true;
    for (let answer of state.list) {
      if (answer.value === "") {
        showButton = false;
      }
    }
    showButton === true ? setHeight('auto') : setHeight('0%');
  }

  const renderAnswer = (answer: any, key: number) => {
    return (
      <div className="vertical-answer-box" key={key}>
        {
          (state.list.length > 3) ? <DeleteIcon className="right-top-icon" onClick={() => removeFromList(key)} /> : ""
        }
        <DocumentWirisCKEditor
          disabled={locked}
          data={answer.value}
          toolbar={['mathType', 'chemType']}
          placeholder={"Enter Answer " + (key + 1) + "..."}
          onBlur={() => save()}
          onChange={value => changed(answer, value)}
        />
      </div>
    );
  }

  return (
    <div className="vertical-shuffle-build">
      <div className="component-title">
        <div>Enter Answers below in order.</div>
        <div>These will be randomised in the Play Interface.</div>
      </div>
      {
        state.list.map((answer:any, i:number) => renderAnswer(answer, i))
      }
      <AddAnswerButton
        locked={locked}
        addAnswer={addAnswer}
        height={height}
        label="+ &nbsp;&nbsp; A &nbsp; N &nbsp; S &nbsp; W &nbsp; E &nbsp; R" />
    </div>
  )
}

export default VerticalShuffleBuildComponent
