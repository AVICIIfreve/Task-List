// 定义奖励属性
interface Exchange {
  id: number; //唯一标识
  name: string; //奖励名称
  expend: number; //奖励花费
  count?: number; //奖励兑换次数
  deadline?: Date; //兑换日期,加?表示可以为空
}

export default Exchange;
