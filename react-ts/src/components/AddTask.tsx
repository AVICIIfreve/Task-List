import React, { useState } from "react";
import { Task, TaskDifficulty, TaskState } from "../types/Task";

//定义一个Props接口，里面有一个添加任务的函数。作用是传递数据给父组件
interface AddTaskProps {
  onAdd: (task: Task) => void;
}
//这样写的目的意味着这个组件有一个参数，参数是AddTaskProps，然后将AddTaskProps里面的方法解构了出来也就意味着这个组件接收一个函数
//说明该组件需要接收一个onAdd函数作为参数，这个函数将新任务传递给父组件
const AddTask = ({ onAdd }: AddTaskProps) => {
  //定义各属性状态管理并设定好默认值
  const [name, setName] = useState("");
  const [reward, setReward] = useState(1000);
  const [level, setLevel] = useState(TaskDifficulty.Easy);
  const [deadline, setDeadline] = useState("");
  // 添加一个状态变量管理点击添加任务按钮时才弹出添加任务表单,提交后隐藏
  const [isFormVisible, setIsFormVisible] = useState(false);

  //定义提交事件，传入一个表单事件？
  const handleSubmit = (e: React.FormEvent) => {
    //阻止表单默认提交行为：浏览器会自动将表单数据发送到服务器并刷新页面，我尝试去掉这代码，结果我的task并没添加到tasks数组里
    e.preventDefault();
    //确保任务名称不为空
    if (name.trim()) {
      //新建任务
      const newTask: Task = {
        //使用时间戳作为唯一ID
        id: Date.now(),
        name,
        state: TaskState.uncompleted,
        reward,
        level,
        deadline: deadline ? new Date(deadline) : undefined,
      };
      //调用父组件传递的onAdd函数
      onAdd(newTask);
      //复原元素，添加完任务之后复原元素
      setName("");
      setReward(1000);
      setLevel(TaskDifficulty.Easy);
      setDeadline("");
    }
  };

  return (
    // 表单元素
    //onSubmit作用
    <>
      <button className="addtask-b" onClick={() => setIsFormVisible(true)}>
        添加任务
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="add-task-form">
          {/* 用一个按钮管理添加任务,当点击的时候才会显示表单*/}

          {/* value作用是？ (e)=>setName(e.target.value) 为什么能拿到这个内容？*/}
          <p>任务名称</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="任务名称"
            required
          />
          <p>任务奖励</p>
          <input
            type="number"
            value={reward}
            onChange={(e) => setReward(Number(e.target.value))}
            placeholder="公爵币"
          />
          <p>难度</p>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          >
            <option value={TaskDifficulty.VeryEasy}>⭐ 非常简单</option>
            <option value={TaskDifficulty.Easy}>⭐⭐ 简单</option>
            <option value={TaskDifficulty.Medium}>⭐⭐⭐ 中等</option>
            <option value={TaskDifficulty.Hard}>⭐⭐⭐⭐ 困难</option>
            <option value={TaskDifficulty.VeryHard}>⭐⭐⭐⭐⭐ 非常困难</option>
          </select>
          <p>截止时间</p>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button className="addtask-b" type="submit">
            添加
          </button>
          <button
            className="addtask-cancel"
            onClick={() => setIsFormVisible(false)}
          >
            取消添加
          </button>
        </form>
      )}
    </>
  );
};

export default AddTask;
