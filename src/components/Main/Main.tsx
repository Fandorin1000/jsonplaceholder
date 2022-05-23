import { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import {
  onAddNewTaskHandler,
  onDeleteTaskHandler,
  onSetNewTaskDateHandler,
  onSetNewTaskValueHandler,
} from "./mainHelpers";

export type TTaskList = {
  id: number;
  description: string;
  dateComplete: string;
};

const Main: React.FC = () => {
  const [newTaskValue, setNewTaskValue] = useState("");
  const [newTaskDateValue, setNewTaskDateValue] = useState("");

  const [taskList, setTaskList] = useState<TTaskList[]>([]);

  useEffect(() => {
    setTaskList([
      {
        id: 1,
        description: "This description test task one",
        dateComplete: "19.05.2022",
      },
      {
        id: 2,
        description: "This description test task two",
        dateComplete: "20.05.2022",
      },
    ]);
  }, []);

  const showTaskList = taskList.map((t, index) => (
    <div key={t.id} className={styles.taskBox}>
      <div className={styles.taskContent}>
        <div>{index + 1}. </div>
        <div>{t.description} </div>
        <div>{t.dateComplete}</div>
      </div>
      <div className={styles.deleteTaskButtonBox}>
        <button onClick={onDeleteTaskHandler(t.id, setTaskList)}>x</button>
      </div>
    </div>
  ));

  return (
    <div className={styles.Main}>
      <h2>Add tasks and complete it</h2>
      <div className={styles.addNewTaskBox}>
        <div>
          <input
            type="text"
            value={newTaskValue}
            onChange={onSetNewTaskValueHandler(setNewTaskValue)}
          />
        </div>
        <div>
          <input
            type="date"
            onChange={onSetNewTaskDateHandler(setNewTaskDateValue)}
            value={newTaskDateValue}
          />
        </div>
        <div>
          <button
            onClick={onAddNewTaskHandler(
              setTaskList,
              newTaskValue,
              newTaskDateValue
            )}
          >
            Add new task
          </button>
        </div>
      </div>
      <div className={styles.taskList}>{showTaskList}</div>
    </div>
  );
};
export default Main;
