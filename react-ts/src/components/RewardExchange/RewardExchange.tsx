import { useState } from "react";
import Reward from "../../types/Reward";
import EditRewardExchange from "./EditRewardExchange";

interface ExchangeProps {
  // 父组件传递reward数据下来
  reward: Reward;
  //兑换奖励回调函数
  onExchange: (reward: Reward) => void;
  //删除兑换项目回调函数
  onDelete: (id: number) => void;
  //编辑兑换奖励回调函数
  onEdit: (reward: Reward) => void;
}

const RewardExchange = ({
  reward,
  onDelete,
  onEdit,
  onExchange,
}: ExchangeProps) => {
  //控制编辑组件渲染状态
  const [showEdit, setShowEdit] = useState(false);
  // 编辑逻辑，要将数据传给app.tsx
  const onSave = (updatedReward: Reward) => {
    onEdit(updatedReward);
    setShowEdit(false);
  };

  // 取消编辑逻辑
  const onCancel = () => {
    setShowEdit(false);
  };

  return (
    <>
      {/* 奖励组件前端 */}
      <div className="reward-item">
        {/* 奖励主要信息展示 */}
        <div className="reward-main">
          {/* 奖励名称 */}
          <p>{reward.name}</p>
          {/* 奖励花费 */}
          <p>花费:{reward.expend}公爵币🪙</p>
        </div>
        {/* 编辑，兑换，删除按钮,删除，兑换逻辑要写到父组件去 */}
        <div className="reward-button-list">
          <button onClick={() => setShowEdit(true)}>编辑</button>
          {showEdit && (
            <EditRewardExchange
              reward={reward}
              onSave={onSave}
              onCancel={onCancel}
            />
          )}
          <button onClick={() => onExchange(reward)}>兑换</button>
          <button onClick={() => onDelete(reward.id)}>删除</button>
        </div>
      </div>
    </>
  );
};

export default RewardExchange;
