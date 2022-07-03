import React, { useEffect } from "react";
import { useProject } from "./context/ProjectContext";
import { TextField, ITextFieldStyles, ITextFieldStyleProps } from '@fluentui/react/lib/TextField';
import "./App.css";
import Card from "./components/Card/Card";
import { IProjectDTO } from "./interfaces/AllInterfaces";

const list = [1, 2, 3, 4, 5, 6, 7, 8];

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 500 }};

const projectInfo: IProjectDTO = {
  id: 1,
  projectName: "Totechs Corps",
  projectLogo: null,
  projectBackground: null,
  clients: null,
  about: null,
  githubLink: null,
  figmaLink: null,
  microsoftStoreLink: null,
  googlePlayLink: null,
  appStoreLink: null,
  startTime: "string",
  deadline: null,
  techLead: Math.random(),
};

function App() {
  const { items: projects } = useProject();
  useEffect(() => {
    
  }, [])
  

  return (
    <div className="App">
      <h1> Projects </h1>
      <div className="search">
        <TextField placeholder="search" styles={getStyles}></TextField>
      </div>
      <div className="content">
        <ul className="card-list">
          {list.map((index) => (
            <Card projectInfo={projectInfo}></Card>
          ))}
        </ul>
      </div>
    </div>
  );
}

function getStyles(props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
  const { required } = props;
  return {
    fieldGroup: [
      { width: 500 },
    ],
    field:{
      fontWeight: 600,
      fontSize: 20
    }
  };
}

export default App;
