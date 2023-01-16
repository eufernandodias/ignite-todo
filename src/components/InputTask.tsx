import { PlusCircle } from "phosphor-react";
import styles from "./InputTask.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { ListTasks } from "./ListTasks";
import { ListTasksItem } from "./ListTasksItem";

import clipBoardIcon from "../assets/Clipboard.svg";

interface Task {
  id: number;
  description: string;
  done: boolean;
}

export function InputTask() {
  const [taskTextDescription, setTaskTextDescription] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: Date.now(),
      description: `[in a turtle-shaped pool float]  Stewie: My God, I'm to entrust my life to a turtle - nature's "D" student?
      [Peter has gotten liposuction]  Stewie: My god, it's finally happened. He's become so massive he's collapsed in on himself like a neutron star.
      `,
      done: true,
    },
  ]);
  const [countDoneTasks, setCountDoneTasks] = useState(tasks.length);

  function handleTaskTextDescriptionChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setTaskTextDescription(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    if (taskTextDescription !== "") {
      const newTask = {
        id: Date.now(),
        description: taskTextDescription,
        done: false,
      };

      setTasks((prev) => [...prev, newTask]);
      setTaskTextDescription("");
    }
  }

  function handleDeleteTask(taksId: number) {
    setTasks((tasks) => {
      return tasks.filter((t) => t.id !== taksId);
    });
  }

  function countTasksDone(): void {
    setCountDoneTasks(tasks.filter((task) => task.done === true).length);
  }

  return (
    <div>
      <div className={styles.formContainer}>
        <input
          type="text"
          name="task"
          placeholder="Adicione uma nova tarefa"
          onChange={handleTaskTextDescriptionChange}
          value={taskTextDescription}
        />
        <button type="submit" onClick={handleCreateNewTask}>
          Criar
          <PlusCircle size={16} weight="bold" />
        </button>
      </div>
      <div className={styles.listTasksContainer}>
        <header>
          <strong className={styles.textTasksCreated}>
            Tarefas criadas <span>{tasks.length}</span>
          </strong>
          <strong className={styles.textTasksDone}>
            Concluídas
            <span>
              {countDoneTasks} de {tasks.length}
            </span>
          </strong>
        </header>

        <div className={styles.taksList}>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <ListTasksItem
                key={index}
                task={task}
                onItemDeleteTask={handleDeleteTask}
                onChangeTaskStatus={countTasksDone}
              />
            ))
          ) : (
            <EmptyTasksList />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyTasksList() {
  return (
    <div className={styles.emptyTasksList}>
      <img src={clipBoardIcon} alt="" />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong>
      </p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
