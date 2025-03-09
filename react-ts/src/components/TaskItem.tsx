import { useState } from "react";
import { Task, TaskDifficulty, TaskState } from "../types/Task";
import EditTask from "./EditTask";

//接口，定义对象的形状，也就是指的对象的属性，类型，方法。没有实现
//也就是说TaskItemProps这个对象结构包含了3个属性
//作用是传递数据给父组件
interface TaskItemProps {
  //使用Task类型
  task: Task;
  //切换任务状态（函数，接受一个number类型参数，没有返回值）
  onToggle: (id: number) => void;
  //删除任务（函数，接受一个number类型参数，没有返回值）
  onDelete: (id: number) => void;
  //添加编辑回调函数
  onEdit: (task: Task) => void;
}

//运用了解构的写法
const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  //添加编辑表单显示状态
  const [isEditing, setIsEditing] = useState(false);

  // 显示编辑菜单
  const handleEdit = () => {
    setIsEditing(true); // 显示编辑表单
  };

  // 调用父组件的编辑回调函数
  const handleSave = (updatedTask: Task) => {
    onEdit(updatedTask);
    setIsEditing(false);
  };

  // 隐藏编辑表单
  const handleCancel = () => {
    setIsEditing(false);
  };

  //根据任务状态显示不同文本
  //这里是一个函数
  const getStateText = (state: TaskState) => {
    switch (state) {
      case TaskState.completed:
        return "✅已完成";
      case TaskState.uncompleted:
        return "❌ 未完成";
      case TaskState.overdue:
        return "⏰ 已过期";
      case TaskState.ongoing:
        return "⏳ 进行中";
      default:
        return "未设定状态";
    }
  };

  //根据任务难度显示不同文本
  const getDifficultyText = (level: TaskDifficulty) => {
    switch (level) {
      case TaskDifficulty.VeryEasy:
        return "⭐ 非常简单";
      case TaskDifficulty.Easy:
        return "⭐⭐ 简单";
      case TaskDifficulty.Medium:
        return "⭐⭐⭐ 中等";
      case TaskDifficulty.Hard:
        return "⭐⭐⭐⭐ 困难";
      case TaskDifficulty.VeryHard:
        return "⭐⭐⭐⭐⭐ 非常困难";
      default:
        return "未设定难度";
    }
  };

  return (
    <>
      <div className="task-item">
        <div className="task-header">
          <input
            type="checkbox"
            // 当任务的状态为已完成时勾选
            checked={task.state === TaskState.completed}
            onChange={() => onToggle(task.id)}
          />
        </div>
        <span className="task-name">{task.name}</span>
        <div className="task-details">
          <p>状态：{getStateText(task.state)}</p>
          <p>奖励：{task.reward}公爵币</p>
          <p>难度：{getDifficultyText(task.level)}</p>
          {/* 一种写法当截止日期存在时才执行 */}
          {task.deadline && (
            <p>截止日期：{new Date(task.deadline).toLocaleDateString()}</p>
          )}
        </div>
        {/* 这里是定义了一个事件处理函数，
        {}其中运用了匿名函数和箭头函数，当用户点击这个按钮的时候会触发onDelete的逻辑 */}
        <button onClick={handleEdit}>编辑</button>
        <button onClick={() => onDelete(task.id)} className="button-del">
          删除
        </button>
      </div>
      {/* 编辑表单 */}
      {isEditing && (
        <EditTask
          task={task}
          onSave={handleSave}
          onCancel={handleCancel}
        ></EditTask>
      )}
    </>
  );
};

export default TaskItem;
