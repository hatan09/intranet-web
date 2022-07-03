import { getTheme } from "@fluentui/react";
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';
import { Text } from "@fluentui/react/lib/Text";
import imange from '../../assets/imgs/Project.png';

import { IProjectDTO } from "../../interfaces/AllInterfaces";
import "./Card.css";

interface IProjectCard {
  projectInfo: IProjectDTO;
  //seeDetail: () => {}
}

export default function Card({ projectInfo }: IProjectCard) {
const examplePersona: IPersonaSharedProps = {
    imageUrl: imange,
    imageInitials: 'PR',
    showSecondaryText: false,
    };
  const theme = getTheme();
  return (
    <div className="card" style={{ 
        boxShadow: theme.effects.elevation8, 
        justifyContent: 'center', 
        }}>
        <div className="center" style={{display: 'flex', justifyContent:'center'}}>
            <Persona
                {...examplePersona}
                hidePersonaDetails
                size={PersonaSize.size100}
                presence={PersonaPresence.none}
                imageAlt="Annie Ried, status is unknown"
            />
        </div>
        <Text block variant="xxLarge" >{projectInfo.projectName}</Text>
        <div className="content">
            <Text variant="large">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quos molestiae hic ipsum, sequi adipisci ipsam doloremque quo vitae possimus ullam saepe nisi tempora officiis modi. Ipsa tempora placeat eum.</Text>
            <a href="" className="more"> More details</a>
        </div>
        
    </div>
  );
}
