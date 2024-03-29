import React, { useEffect, useState } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  DefaultPalette,
  getTheme,
  IStackProps,
  IStackStyles,
  IStackTokens,
  mergeStyles,
  Stack,
  Text,
} from "@fluentui/react";
import { FontIcon } from "@fluentui/react/lib/Icon";
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

const stackWidth = 70;

const stackStyles: IStackStyles = {
  root: {
    width: `${stackWidth}%`,
    overflow: "visible",
  },
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

  const theme = getTheme();

  const stackProps: IStackProps = {
    horizontalAlign: "center",
    verticalAlign: "center",
  };

  const wrapStackTokens: IStackTokens = { childrenGap: 30, padding: 20 };

  const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: "0 25px",
  });

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
    <div className="projectPage">
      <div className="projectPage__title">
        <FontIcon aria-label="Compass" iconName="Group" className={iconClass} />
        <Text variant="mega">PROJECTS</Text>
      </div>
      <form className="projectPage__search">
        <TextField
          placeholder="Type to find your project"
          styles={getStyles}
          onChange={handleChange}
          iconProps={{ iconName: "Search" }}
        ></TextField>
      </form>
      <div className="projectPage__content">
        <Stack
          {...stackProps}
          horizontal
          verticalFill
          wrap
          styles={stackStyles}
          tokens={wrapStackTokens}
        >
          {projectList.map((project) =>
            project.id === -1 ? (
              <div key={-1}>
                <button
                  onClick={toggleHideDialog}
                  style={{
                    boxShadow: theme.effects.elevation8,
                    border: "none",
                    borderRadius: "6px",
                    display: "block",
                    height: "400px",
                    width: "300px",
                    fontSize: "100pt",
                    background: "000",
                  }}
                >
                  <Text block>
                    <FontIcon
                      aria-label="Create new project"
                      iconName="CircleAddition"
                      className={iconClass}
                    />
                  </Text>
                  <Text block variant="xxLarge">
                    Add new project
                  </Text>
                </button>
                <CreateUpdateProjectForm
                  initialValue={projectTemplate}
                  isHidden={hideDialog}
                  onSubmit={handleCreate}
                  onClosePanel={toggleHideDialog}
                />
              </div>
            ) : (
              <>
                <Card projectInfo={project} key={project.id}></Card>
              </>
            )
          )}
        </Stack>
      </div>
    </div>
  );
};

export default ProjectPage;
