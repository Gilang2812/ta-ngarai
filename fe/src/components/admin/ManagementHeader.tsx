import React from "react";
import Button from "../common/Button";
import { Plus } from "lucide-react";

type Props = {
  title: string;
  content?: string;
  onCreateClick?: () => void;
};

const ManagementHeader = ({ title, content, onCreateClick }: Props) => {
  return (
    <header className=" mb-8 capitalize gap-4 flex justify-between items-center ">
      <h1>{title}</h1>
      {content && (
        <Button onClick={onCreateClick}>
          <Plus />
          new {content}
        </Button>
      )}
    </header>
  );
};

export default ManagementHeader;
