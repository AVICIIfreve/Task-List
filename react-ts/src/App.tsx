import { useState } from "react";
import "./App.css";
//引入Task类型
import { Task, TaskDifficulty, TaskState } from "./types/Task";
import TaskItem from "./components/TaskItem";
import AddTask from "./components/AddTask";

function App() {
  //测试数据,使用了useState来管理状态，当调用setTasks的时候就会自动刷新页面
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "进行30Min运动",
      state: TaskState.ongoing,
      reward: 1000,
      level: TaskDifficulty.Easy,
      deadline: new Date("2025-3-4"),
    },
    {
      id: 2,
      name: "进行30Min阅读",
      state: TaskState.completed,
      reward: 1000,
      level: TaskDifficulty.Hard,
    },
  ]);

  //任务状态更改函数
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              //这里的意思就是其他都不变但是state会根据任务状态改变，但是这里的问题是我其他的状态就不会改变了
              ...task,
              state:
                task.state === TaskState.completed
                  ? TaskState.uncompleted
                  : TaskState.completed,
            }
          : task
      )
    );
  };

  //删除任务函数
  //运用了filter，筛选出符合条件的元素组成新数组
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //添加任务,将心任务放入原本的数组
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };
  return (
    <div>
      <h1>Todo App</h1>
      {/* 无序列表，配合li使用 */}
      <AddTask onAdd={addTask} />
      <ul>
        {/* {}里嵌入 JavaScript 表达式，jsx里如果要运行js得在{}里运行。
        使用数组的map方法，可以对数组里的元素进行操作，有返回值，返回值是一个新的数组 */}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
