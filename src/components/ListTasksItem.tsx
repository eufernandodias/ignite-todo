import { Check, Trash } from "phosphor-react";
import styles from "./ListTasksItem.module.css";
import { useState } from "react";

interface Task {
  id: number;
  description: string;
  done: boolean;
}

interface ListTasksItem {
  task: Task;
  onItemDeleteTask: (id: number) => void;
  onChangeTaskStatus: () => void;
}

interface ListItem {
  description: string;
  onChangeStatus: () => void;
  onDeleteTask: () => void;
}

export function ListTasksItem(props: ListTasksItem) {
  const [task, setTask] = useState(props.task);
  const { onItemDeleteTask, onChangeTaskStatus } = props;

  function handleChangeDoneStatus() {
    const taskChanged = task;
    taskChanged.done = !task.done;
    setTask((task) => ({
      ...task,
      ...taskChanged,
    }));

    onChangeTaskStatus();
  }

  function handleDeleteTask() {
    onItemDeleteTask(task.id);
  }

  if (task.done == true) {
    return (
      <ListTasksItemChecked
        description={task.description}
        onChangeStatus={handleChangeDoneStatus}
        onDeleteTask={handleDeleteTask}
      />
    );
  } else {
    return (
      <ListTasksItemUnchecked
        description={task.description}
        onChangeStatus={handleChangeDoneStatus}
        onDeleteTask={handleDeleteTask}
      />
    );
  }
}

function ListTasksItemUnchecked(props: ListItem) {
  const { onChangeStatus, onDeleteTask } = props;
  return (
    <div className={styles.listTasksItem}>
      <span
        className={`${styles.checkbox} ${styles.unchecked}`}
        onClick={onChangeStatus}
      ></span>
      <p>{props.description}</p>
      <Trash className={styles.deleteTrashIcon} onClick={onDeleteTask} />
    </div>
  );
}

function ListTasksItemChecked(props: ListItem) {
  const { onChangeStatus, onDeleteTask } = props;
  return (
    <div className={`${styles.listTasksItem} ${styles.itemChecked}`}>
      <span
        className={`${styles.checkbox} ${styles.checked}`}
        onClick={onChangeStatus}
      >
        <Check />
      </span>
      <p>{props.description}</p>
      <Trash className={styles.deleteTrashIcon} onClick={onDeleteTask} />
    </div>
  );
}
