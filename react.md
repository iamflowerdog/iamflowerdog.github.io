## React基础

#### 将UI组织成组件树的形式 props + state ---> View
* React组件一般不提供方法，而是某种状态机
* React组件可以理解为一个纯函数
* 单向数据绑定

#### 受控组件 vs 非受控组件
* 受控组件：表单元素状态由使用者维护，必须包含 value 和 onChange 方法
* 非受控组件： 表单元素状态由自身维护，必须把当前的node节点标识出来，这样才能获取组件的值

#### getSnapshotBeforeUpdate 
* 在页面render之前调用，state已经更新
* 应用场景：获取render之前的DOM状态

#### componentDidUpdate
* 每次UI更新时被调用
* 典型场景：页面需要根据props变化重新获取数据
* 根据路由中文章详情id的变化，才重新发请求

#### shouldComponentUpdate 
* 决定Virtual DOM是否需要重绘
* 一般可以由PureComponent自动实现 （props和state是否有变化，来决定是否更新）
* 典型场景，性能优化

#### 高阶组件
* 高阶组件HOC High Order Component 复用组件逻辑的一种高级技巧，不是React API，一种组合React组成特性的设计模式
  1. 高阶组件接受组件作为参数，返回新的组件
  2. 免去多层组件传递，麻烦，

