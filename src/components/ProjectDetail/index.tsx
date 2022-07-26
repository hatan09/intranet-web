import React, { useEffect, useState } from "react";
import wall from "../../assets/imgs/Wall.png";
import logo from "../../assets/imgs/Project.png";
import screen from "../../assets/imgs/Screen.png";
import "./ProjectDetail.scss";
import { useParams } from "react-router-dom";
import { useProject } from "../../context/ProjectContext";
import { IProjectDTO } from "../../interfaces/AllInterfaces";
import { Text, Persona, PersonaSize, PersonaPresence } from "@fluentui/react";
import Tag from "../Tag";

const count = [];

export default function ProjectPage() {
  const [project, setProject] = useState<IProjectDTO>();
  const { getDetails } = useProject();
  let params = useParams();

  async function loadData() {
    const id = params.id!;
    const project = await getDetails(id);
    setProject(project!);
    console.log(project?.about);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="projectDetail">
      <img className="bannerImg" src={wall} alt="" />
      <div className="topOverlay topOverlay--gradient"></div>
      <div className="projectContent">
        <div className="projectBasic">
          <img
            aria-hidden="true"
            className="projectBasic__logo"
            src={project?.projectLogo}
            alt=""
          />
          <div className="projectBasic__info">
            <div className="projectBasic__infoName">
              <Text variant="mega" block>
                {project?.projectName}
              </Text>
              <Text variant="mediumPlus">{`2022 \u00A0•\u00A0 A Project for ToTechs Ecosystem`}</Text>
            </div>
            <div className="projectBasic__infoTags">
              {[...Array(5)].map((x, i) => (
                <Tag name={`Tag${i}`} />
              ))}
            </div>
            <div className="projectBasic__infoMembers">
              <div className="projectBasic__infoMembers--leader">
                <Persona
                  className="projectBasic__infoMembers--leader"
                  hidePersonaDetails
                  size={PersonaSize.size56}
                  presence={PersonaPresence.none}
                ></Persona>
              </div>
              {[...Array(5)].map((x, i) => (
                <Persona
                  hidePersonaDetails
                  size={PersonaSize.size40}
                  presence={PersonaPresence.none}
                ></Persona>
              ))}
            </div>
          </div>
        </div>
        <div className="section projectGallery">
          <div className="sectionTitle projectGallery__title">
            <Text variant="xLarge">Gallery</Text>
          </div>
          <hr />
          <div className="projectGallery__imgGallery--horizontal">
            {[...Array(10)].map((x, i) => (
              <img src={screen} alt="" />
            ))}
          </div>
        </div>
        <div className="section projectDiscription">
          <div className="sectionTitle projectDiscription__title">
            <Text variant="xLarge">Description</Text>
          </div>
          <hr />
          <div className="projectDiscription__content">
            <Text variant="large">{project?.about}</Text>
          </div>
        </div>
        <div className="section projectComments">
          <div className="sectionTitle projectComments__title">
            <Text variant="xLarge">Likes {`\u0026`} Comments</Text>
          </div>
          <hr />
        </div>

        <div className="section projectRequirements">
          <div className="sectionTitle projectRequirements__title">
            <Text variant="xLarge">System Requirements</Text>
          </div>
          <hr />
        </div>
        <div className="projectMilestone"></div>
      </div>
    </div>
  );
}
