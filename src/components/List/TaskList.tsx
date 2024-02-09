import React from "react";
import TaskListStyle from "./TaskList.style";
import { Checkbox, FontIcon, Stack } from "@fluentui/react";

interface Tasks {
  id: number;
  title: string;
  isFavourite: boolean;
}

const TaskList = () => {
  const task: Tasks[] = [
    {
      id: 1,
      title: "task1",
      isFavourite: true,
    },
    {
      id: 2,
      title: "task2",
      isFavourite: false,
    },
  ];

  const onRenderCell = (tasks: Tasks) => {
    return (
      <Stack horizontal key={tasks.id} className={TaskListStyle.taskItem}>
        <Stack horizontal style={{ width: "85%" }}>
          <Checkbox />
          {tasks.title}
        </Stack>

        <Stack horizontal style={{ width: "15%" }}>
          <FontIcon iconName="Info" className={TaskListStyle.iconStyle} />
          <FontIcon
            iconName={tasks.isFavourite ? "FavoriteStarFill" : "FavoriteStar"}
            className={TaskListStyle.iconStyle}
          />
          <FontIcon iconName="EditNote" className={TaskListStyle.iconStyle} />
          <FontIcon iconName="Delete" className={TaskListStyle.iconStyle} />
        </Stack>
      </Stack>
    );
  };

  return <div>{task.map(onRenderCell)}</div>;
};

export default TaskList;
