import { Dispatch, SetStateAction } from "react";
import { TTaskList } from "./Main";

export const onSetNewTaskValueHandler =
  (setNewTaskValue: (newValue: string) => void) =>
  (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setNewTaskValue(value);
  };

export const onSetNewTaskDateHandler =
  (setNewTaskDateValue: (newValue: string) => void) =>
  (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setNewTaskDateValue(value);
  };

export const onAddNewTaskHandler =
  (
    setTaskList: Dispatch<SetStateAction<TTaskList[]>>,
    newTaskValue: string,
    newTaskDateValue: string
  ) =>
  () => {
    setTaskList((prevState) => {
      const newState = [
        ...prevState,
        {
          id: prevState.length + 1,
          description: newTaskValue,
          dateComplete: newTaskDateValue,
        },
      ];
      return newState;
    });
  };

export const onDeleteTaskHandler =
  (id: number, setTaskList: Dispatch<SetStateAction<TTaskList[]>>) => () => {
    setTaskList((prevState) => prevState.filter((t) => t.id !== id));
  };
