import { Text } from "@fluentui/react";
import './Tag.scss'

function Tag(props: any) {
  return (
    <div className="tag">
      <Text variant="large">{props.name}</Text>
    </div>
  );
}

export default Tag;
