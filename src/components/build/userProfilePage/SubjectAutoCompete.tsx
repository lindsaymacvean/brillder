import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import './UserProfile.scss';
import { Subject } from 'model/brick';


interface SubjectAutoCompleteProps {
  selected: any[];
  onSubjectChange(subjects: any[]): void;
}

interface SubjectAutoCompleteState {
  subjects: Subject[];
  selected: any[];
  autoCompleteOpen: boolean;
}

class SubjectAutoComplete extends Component<SubjectAutoCompleteProps, SubjectAutoCompleteState> {
  constructor(props: SubjectAutoCompleteProps) {
    super(props)
    let selectedSubjects = [];

    if (this.props.selected) {
      selectedSubjects = this.props.selected;
    }

    this.state = {
      subjects: [],
      selected: selectedSubjects,
      autoCompleteOpen: false,
    };

    axios.get(
      process.env.REACT_APP_BACKEND_HOST + '/subjects', {withCredentials: true}
    ).then(res => {
      this.setState({...this.state, subjects: res.data });
    }).catch(error => {
      alert('Can`t get subjects');
    });
  }

  onSubjectChange(event: any, newValue: any[]) {
    this.setState({...this.state, selected: newValue});
    this.props.onSubjectChange(newValue);
  }

  onSubjectInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {value} = event.target;

    if (value && value.length >= 2) {
      this.setState({...this.state, autoCompleteOpen: true});
    } else {
      this.setState({...this.state, autoCompleteOpen: false});
    }
  }

  hide() {
    this.setState({...this.state, autoCompleteOpen: false});
  }

  render() {
    return (
      <Grid container direction="row" className="subjects-container">
        <Autocomplete
          multiple
          open={this.state.autoCompleteOpen}
          value={this.state.selected}
          options={this.state.subjects}
          onChange={(e:any, v: any) => this.onSubjectChange(e, v)}
          getOptionLabel={(option:any) => option.name}
          renderInput={(params:any) => (
            <TextField
              onBlur={() => this.hide()}
              {...params}
              onChange={(e) => this.onSubjectInput(e)}
              variant="standard"
              label="Subjects: "
              placeholder="Subjects"
            />
          )}
        />
      </Grid>
    );
  }
}

export default SubjectAutoComplete;
