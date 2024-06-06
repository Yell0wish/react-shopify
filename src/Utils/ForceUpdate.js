import { useState, useCallback } from "react";

const useForceUpdate = () => {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);  // 更新一个状态变量来触发重新渲染
    }, []);
    return update;
};

export default useForceUpdate;