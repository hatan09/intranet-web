import React from "react";
import {
  TextField,
  ITextFieldStyles,
  ITextFieldStyleProps,
} from "@fluentui/react/lib/TextField";
import "./App.css";
import { IProjectDTO } from "./interfaces/AllInterfaces";
import ProjectPage from "./components/ProjectPage";

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 500 },
};

function getStyles(props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
  const { required } = props;
  return {
    fieldGroup: [{ width: 500 }],
    field: {
      fontWeight: 600,
      fontSize: 20,
    },
  };
}

function App() {

  return (
    <div className="App">
      <ProjectPage/>
    </div>
  );
}

export default App;
