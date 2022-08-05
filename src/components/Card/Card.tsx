import {
  getTheme,
  IContextualMenuProps,
  IconButton,
  DefaultButton,
} from "@fluentui/react";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence,
} from "@fluentui/react/lib/Persona";
import { Text } from "@fluentui/react/lib/Text";

import { IProjectDTO } from "../../interfaces/AllInterfaces";
import "./Card.css";

interface IProjectCard {
  projectInfo: IProjectDTO;
  //seeDetail: () => {}
}

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: "delete",
      text: "Delete Project",
      iconProps: { iconName: "Delete" },
      onClick(event, item) {
        console.log("deleted");
      },
    },
    {
      key: "star",
      text: "Star",
      iconProps: { iconName: "FavoriteStar" },
      onClick(event, item) {
        console.log("deleted");
      },
    },
  ],
  directionalHintFixed: true,
};

export default function Card({ projectInfo }: IProjectCard) {
  const examplePersona: IPersonaSharedProps = {
    showSecondaryText: false,
  };
  const theme = getTheme();
  return (
    <div
      className="card"
      style={{
        boxShadow: theme.effects.elevation8,
      }}
    >
      <IconButton
        className="menu-button"
        menuProps={menuProps}
        iconProps={{ iconName: "CollapseMenu" }}
        title="Emoji"
        ariaLabel="Emoji"
      />
      <div
        className="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Persona
          {...examplePersona}
          hidePersonaDetails
          size={PersonaSize.size100}
          presence={PersonaPresence.none}
          imageUrl={projectInfo?.projectLogo}
        />
      </div>
      <Text block variant="xxLarge">
        {projectInfo.projectName}
      </Text>
      <div className="content">
        <Text variant="large">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum illum
          facere nam fuga exercitationem doloribus labore quos atque laudantium
          tempore veritatis vel{" "}
        </Text>
      </div>
      <div className="more">
        <DefaultButton text="More detail" href={`/projects/${projectInfo.id}`}/>
      </div>
    </div>
  );
}
