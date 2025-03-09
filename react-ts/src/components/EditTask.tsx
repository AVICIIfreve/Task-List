import React, { useState } from "react";
import { Task, TaskDifficulty, TaskState } from "../types/Task";

//props有传递数据的用处
interface EditTaskProps {
  //要编辑的任务
  task: Task;
  // 保存编辑的回调函数
  onSave: (updatedTask: Task) => void;
  // 取消编辑的回调函数
  onCancel: () => void;
}

const EditTask = ({ task, onSave, onCancel }: EditTaskProps) => {
  // 状态变量，但是需要回显数据，所以直接拿task里面的数据
  const [name, setName] = useState(task.name);
  const [reward, setReward] = useState(task.reward);
  const [level, setLevel] = useState(task.level);
  const [state, setState] = useState(task.state);
  // 这个操作我没明白
  const [deadline, setDeadline] = useState(
    task.deadline?.toISOString().split("T")[0] || ""
  );

  // 编写处理提交函数
  const handleSubmit = (e: React.FormEvent) => {
    //阻止表单默认提交行为
    e.preventDefault();
    // 新建已更新任务
    const updatedTask: Task = {
      ...task,
      name,
      reward,
      level,
      state,
      deadline: deadline ? new Date(deadline) : undefined,
    };
    // 调用保存回调函数
    onSave(updatedTask);
  };

  return (
    <div className="edit-task-modal">
      <form onSubmit={handleSubmit} className="edit-task-form">
        <h2>编辑任务</h2>
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
        <p>任务状态</p>
        <select
          value={state}
          onChange={(e) => setState(Number(e.target.value))}
        >
          <option value={TaskState.ongoing}>⏳ 进行中</option>
          <option value={TaskState.overdue}>⏰ 已过期</option>
        </select>
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
        <button type="submit">保存</button>
        <button type="button" onClick={onCancel}>
          取消
        </button>
      </form>
    </div>
  );
};

export default EditTask;
