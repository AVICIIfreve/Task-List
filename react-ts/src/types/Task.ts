//定义任务属性,使用ts中的interface（接口）知识，export意味着导出，可以在别的文件import导入使用此类型
export interface Task {
  id: number; //唯一标识
  name: string; //待办名称
  state: TaskState; //任务状态
  reward: number; //奖励
  level: TaskDifficulty; //任务难度
  deadline?: Date; //截止日期,加?表示可以为空
}

//定义任务难度枚举
enum TaskDifficulty {
  VeryEasy = 1,
  Easy = 2,
  Medium = 3,
  Hard = 4,
  VeryHard = 5,
}

//定义任务状态枚举
enum TaskState {
  //已完成
  completed = 0,
  //未完成
  uncompleted = 1,
  //已过期
  overdue = 2,
  //正在进行中
  ongoing = 3,
}
export { TaskDifficulty, TaskState };
