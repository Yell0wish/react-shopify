# 北京交通大学软件学院21级轻量化大作业

> 叶理炜 周书扬 邓人嘉



## 注意事项：

为了方便的直接渲染，定义了一个函数，调用后可以直接进行渲染

使用方式：

```
需要在react组件中使用
// 引入
import { useForceUpdate } from '../Utils/ForceUpdate';
// 类似于钩子的声明
const forceUpdate = useForceUpdate();
// 在需要强制渲染的时候调用
forceUpdate();
```

