## 项目简介
一个WebApp版的cnode客户端，项目采用react技术栈构建。组件选用的是[Material-UI](http://www.material-ui.com/)，让界面更适合触控操作。
- 感谢来自[cnodejs论坛](https://cnodejs.org/)官方提供的api！

## 遇到的问题及解决方法
### 1.1 点击link后应该跳转页面，但是没有跳转
在homepage页面点击floatingbutton应该跳转到发布话题页面，在DevTools中看到已经发起action，有触发`router/LOCATION_CHANGE`，但是没有跳转。
我的路由配置如下：
`
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path='/publishTopic' component={PublishTopic}/>
                </Switch>
            </App>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'));
`
这是因为在第三方库redux中，它在`shouldComponentUpdate`方法中做了前后props比较，认为没有props改变，所以没有触发重新渲染。。而且我把floatingbutton组件作为一个PureComponent，在React中PureComponent是没有`shouldComponentUpdate`方法的。
因此在floattingbutton组件中我必须有一个props或者state作为路径改变的标志,或者使用高阶函数 ` withRouter`。
解决方法：在App组件中使用withRouter方法。
`
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
`
参考
-[github-issues1](https://github.com/ReactTraining/react-router/issues/4924)
-[github-issues2](https://github.com/ReactTraining/react-router/issues/4671)
-[Dealing with Update Blocking](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md)