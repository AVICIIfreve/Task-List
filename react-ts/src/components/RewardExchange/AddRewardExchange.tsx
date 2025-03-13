import React, { useState } from "react";
import Reward from "../../types/Reward";

interface addRewardExchangeProps {
  // 添加奖励回调函数
  onAdd: (reward: Reward) => void;
}

const AddRewardExchange = ({ onAdd }: addRewardExchangeProps) => {
  //编辑兑换状态
  const [name, setName] = useState("");
  const [expend, setExpend] = useState(0);
  //添加奖励状态，影响添加表单展示,默认不展开
  const [added, setAdded] = useState(false);

  // 处理提交行为
  const handleSubmit = (e: React.FormEvent) => {
    // 阻止默认提交行为
    e.preventDefault();
    // 新建奖励兑换(已经做了基础的验证了)
    const rewardItem: Reward = {
      id: Date.now(),
      name,
      expend,
    };
    onAdd(rewardItem);
    // 重置表格
    setName("");
    setExpend(0);
  };

  return (
    <>
      {/* 点击的时候显示 */}
      <button onClick={() => setAdded(true)}>添加奖励</button>
      {added && (
        <div>
          <form>
            <div>
              <p>奖励名称</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // 基础的验证，奖励名称不能为空
                required
              />
              <p>花费</p>
              <input
                type="number"
                value={expend}
                onChange={(e) => setExpend(Number(e.target.value))}
              />
            </div>
            <div>
              <button onClick={handleSubmit}>新建</button>
              <button onClick={() => setAdded(false)}>取消</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddRewardExchange;
