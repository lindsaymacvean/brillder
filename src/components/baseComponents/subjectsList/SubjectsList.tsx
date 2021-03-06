import React, { Component } from "react";
import { Grid, FormControlLabel, Radio } from "@material-ui/core";
import AnimateHeight from "react-animate-height";

import "./SubjectsList.scss";

interface PublishedSubjectsProps {
  filterHeight: string;
  subjects: any[];
  filterBySubject(index: number): void;
}

class SubjectsList extends Component<PublishedSubjectsProps, any> {
  render() {
    return (
      <Grid
        container
        direction="row"
        className="filter-container subjects-filter"
      >
        <AnimateHeight
          duration={500}
          height={this.props.filterHeight}
          style={{ width: "100%" }}
        >
          {this.props.subjects.map((subject, i) => (
            <Grid key={i} container direction="row">
              <Grid
                item
                xs={11}
                className="filter-container subjects-indexes-box"
              >
                <FormControlLabel
                  className="index-box custom-color"
                  style={{ ["color" as any]: subject.color }}
                  checked={subject.checked}
                  onClick={() => this.props.filterBySubject(i)}
                  control={<Radio className={"filter-radio"} />}
                  label={subject.name}
                />
              </Grid>
              <Grid item xs={1} className="published-count">
                <Grid
                  container
                  alignContent="center"
                  justify="center"
                  style={{ height: "100%" }}
                >
                  {subject.publishedBricksCount}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </AnimateHeight>
      </Grid>
    );
  }
}

export default SubjectsList;
