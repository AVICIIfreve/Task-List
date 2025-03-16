import React, { useState } from "react";
import Reward from "../../types/Reward";

interface EditRewardExchangeProps {
  // 传入reward用于回显数据
  reward: Reward;
  //   保存回调函数
  onSave: (updatedReward: Reward) => void;
  // 取消编辑的回调函数
  onCancel: () => void;
}

const EditRewardExchange = ({
  reward,
  onSave,
  onCancel,
}: EditRewardExchangeProps) => {
  //   奖励兑换item状态
  const [name, setName] = useState(reward.name);
  const [expend, setExpend] = useState(reward.expend);

  //   表单提交处理
  const handleSumbit = (e: React.FormEvent) => {
    // 注释表单默认提交
    e.preventDefault();

    const updatedReward: Reward = {
      ...reward,
      name,
      expend,
    };
    // 调用回调函数保存编辑
    onSave(updatedReward);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSumbit}>
          <div>
            <label>
              奖励名称：
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
              />
            </label>

            <p>花费</p>
            <input
              type="number"
              value={expend}
              onChange={(e) => setExpend(Number(e.target.value))}
            />
          </div>
          <div>
            <button type="submit">确认</button>
            <button onClick={() => onCancel()}>取消</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditRewardExchange;
