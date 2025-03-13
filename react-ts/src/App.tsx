import { useState } from "react";
import "./App.css";
//引入Task类型
import { Task, TaskDifficulty, TaskState } from "./types/Task";
import TaskItem from "./components/Task/TaskItem";
import AddTask from "./components/Task/AddTask";
import Reward from "./types/Reward";
import RewardExchange from "./components/RewardExchange/RewardExchange";
import AddRewardExchange from "./components/RewardExchange/addRewardExchange";

function App() {
  // 记录任务奖励，累计
  const [totalReward, setTotalReward] = useState(0);
  //管理任务状态
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
      state: TaskState.uncompleted,
      reward: 1000,
      level: TaskDifficulty.Hard,
    },
  ]);
  // 管理奖励兑换列表
  const [RewardExchanges, setRewardExchanges] = useState<Reward[]>([
    {
      id: 1,
      name: "玩游戏1h",
      expend: 5000,
    },
    {
      id: 2,
      name: "看一集喜欢的剧",
      expend: 5000,
    },
  ]);

  //任务状态更改函数
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          // 如果任务从未完成变为完成，则增加奖励。这里要结合下面的代码来看，因为下面的代码会导致任务的状态变化
          if (task.state !== TaskState.completed) {
            setTotalReward(totalReward + task.reward);
          }

          // 如果任务从完成变为未完成，则减少奖励
          else if (task.state === TaskState.completed) {
            setTotalReward(totalReward - task.reward);
          }
          //这里还用了return，返回了一个数组？
          return {
            ...task,
            state:
              task.state === TaskState.completed
                ? TaskState.uncompleted
                : TaskState.completed,
          };
        }
        return task;
      })
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

  // 编辑任务
  const saveTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  // <---------------分隔线>
  // 奖励兑换
  // 删除奖励
  const deleteReward = (id: number) => {
    setRewardExchanges(RewardExchanges.filter((item) => item.id !== id));
  };

  // 兑换奖励
  //TODO:目前允许负值吧，后期改不能为负值
  const exchangeReward = (reward: Reward) => {
    setTotalReward(totalReward - reward.expend);
  };

  // 编辑奖励
  const editExchange = (reward: Reward) => {};

  // 新增奖励
  const addExchange = (reward: Reward) => {
    setRewardExchanges([...RewardExchanges, reward]);
  };

  return (
    <div>
      {/* to-do-list前端 */}
      <div>
        <h1>Todo App</h1>
        {/* 显示累计奖励 */}
        <p>累计奖励: {totalReward} 公爵币🪙</p>
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
              onEdit={saveTask}
            />
          ))}
        </ul>
      </div>
      {/* 奖励兑换前端 */}
      <div>
        <AddRewardExchange onAdd={addExchange} />
        <ul>
          {RewardExchanges.map((rewardItem) => (
            <RewardExchange
              key={rewardItem.id}
              reward={rewardItem}
              onDelete={deleteReward}
              onEdit={editExchange}
              onExchange={exchangeReward}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
