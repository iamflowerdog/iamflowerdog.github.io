## 2月3日 - 2月5日 疫情间工作任务（利用antd搭建EPMS主页面）

## flow me   
* [我的github主页](https://github.com/iamflowerdog)
#### demo地址
* 学习react的新方法 getSnapshotBeforeUpdate [snap-shot](https://sprit.vip/dist/snap-shot.html)
* 学习react的生命周期 [clock](https://sprit.vip/dist/clock.html)
* 学习react的虚拟dom及key属性 getSnapshotBeforeUpdate [dom-diff](https://sprit.vip/dist/dom-diff.html)
* 利用antd搭建一个企业后台项目 getSnapshotBeforeUpdate [首页](https://sprit.vip/dist/index.html)
* 高阶组件和函数作为自组件 [HOC](https://sprit.vip/dist/advanced-tab.html)
#### 启动项目
1. clone 项目到本地 `git clone https://github.com/iamflowerdog/epms-antd`
2. 进入项目 `npm install`
3. 启动开发版本 `npm run dev`
4. 打包测试版本 `npm run test`
5. 打包线上版本 `npm run build`

#### 项目结构目录

```
    │
    ├── src/       
    │   ├── lib/  工具 
    │   │   ├── axios/ axios请求工具
    │   │   ├── baseURL/ 区分生产测试开发
    │   ├── view/  页面/存放所有html页面
    │   │   ├── inxe/ 入口登陆
    │   │   ├── home/ 首页
    
```

#### CSS 
* scrollHeight： 这个只读属性是一个元素内容高度的度量，包括溢出导致视图不可见的部分，包括元素的padding，不包括border和margin
#### 
*  scrollHeight： The Element.scrollTop property gets or sets the number of pixels that an element's content is scrolled vertically.