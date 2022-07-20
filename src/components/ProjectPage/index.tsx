import React, { useEffect, useState } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  TextField,
  ITextFieldStyles,
  ITextFieldStyleProps,
} from "@fluentui/react/lib/TextField";
import "./ProjectPage.scss";
import { IProjectDTO } from "../../interfaces/AllInterfaces";
import Card from "../Card/Card";
import { useBoolean } from "@fluentui/react-hooks";
import CreateUpdateProjectForm from "./ProjectForms/CreateUpdateProjectForm";

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 500 },
};

const projectTemplate: IProjectDTO = {
  id: 0,
  projectName: "",
  projectLogo: "",
  startTime: "",
  techLead: 0,
};

const projectInfo: IProjectDTO = {
  id: -1,
  projectName: "",
  projectLogo: "",
  startTime: "",
  techLead: 0,
};

const modelProps = {
  isBlocking: true,
  topOffsetFixed: true,
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

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = () => {
  const { items: allProjects, create } = useProject();
  const [projectList, setProjectList] = useState<IProjectDTO[]>([]);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  async function initProjectList() {
    setProjectList([projectInfo, ...allProjects]);
  }
  useEffect(() => {
    initProjectList();
  }, [allProjects]);

  const handleCreate = async (data: IProjectDTO) => {
    console.log(data);
    await create(data);
    toggleHideDialog();
  };

  const handleChange = (event: any) => {
    // const target = event.target as HTMLInputElement;
    console.log(event.target.value);
  };

  return (
    <div className="project-page">
      <div className="title">
        <h2>Projects</h2>
      </div>
      <form className="project-page__search">
        <TextField
          placeholder="search"
          styles={getStyles}
          onChange={handleChange}
        ></TextField>
      </form>
      <div className="project-page__content">
        <ul className="conent__card-list">
          {projectList.map((project) =>
            project.id === -1 ? (
              <div>
                <button
                  onClick={toggleHideDialog}
                  style={{ display: "block", width: "100%", height: '100%', fontSize: '100pt', background: '000' }}
                >
                  +
                </button>
                <CreateUpdateProjectForm
                  initialValue={projectTemplate}
                  isHidden={hideDialog}
                  onSubmit={handleCreate}
                  onClosePanel={toggleHideDialog}
                />
              </div>
            ) : (
              <li key={project.id}>
                <Card projectInfo={project}></Card>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProjectPage;
