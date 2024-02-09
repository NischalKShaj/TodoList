import React, { useState } from "react";
import HomeStyles from "./Home.style";
import todoString from "./String.json";
import { Label, Pivot, PivotItem, Stack } from "@fluentui/react";
import { PivotKeysEnum } from "./Types";
import TaskList from "./List/TaskList";

import { initializeIcons } from "@fluentui/font-icons-mdl2";
initializeIcons();

const Home = () => {
  const [selectedKey, setSelectedKey] = useState<string>(PivotKeysEnum.Tasks);
  return (
    <Stack className={HomeStyles.todoContainer}>
      <header className={HomeStyles.headerStyle}>
        <h2>{todoString.header}</h2>
      </header>
      <Stack className={HomeStyles.pivotContainer}>
        <Pivot
          selectedKey={String(selectedKey)}
          styles={{ root: HomeStyles.pivotRoot }}
          onLinkClick={(item?: PivotItem) => {
            setSelectedKey(item?.props.itemKey || PivotKeysEnum.Tasks);
          }}
        >
          <PivotItem
            headerText={todoString.Pivots.Task}
            itemKey={PivotKeysEnum.Tasks}
          >
            <TaskList />
          </PivotItem>
          <PivotItem
            headerText={todoString.Pivots.TaskFormTab}
            itemKey={PivotKeysEnum.TaskForm}
          >
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem
            headerText={todoString.Pivots.Completed}
            itemKey={PivotKeysEnum.Completed}
          >
            <Label>Pivot #3</Label>
          </PivotItem>
        </Pivot>
      </Stack>
    </Stack>
  );
};

export default Home;
