# react-router-dom 

## API
```js
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams,
  useRouteMatch
} from 'react-router-dom'
```
- `BrowserRouter` 所有 `<Swtich>` 和 `<Route>` 需被 `<BrowserRouter>` 包裹
- `StaticRouter` 服务端使用
- `Route`
```jsx
<BrowserRouter>
  {/* 如果 Swtich 被 <TransitionGroup> 和 <CSSTransition> 包裹，要把 location 传给 Swtich */}
  <Switch>
    {/* 严格匹配路由 "/" */}
    <Route exact path="/">
      <Page1 >
    </Route>
    {/* 将路由 "/old-match" 重定向到路由 "will-match" */}
    <Route path="/old-match">
      <Redirect to="/will-match" />
    </Route>
    <Route path="/will-match">
      <Page2 />
    </Route>
    {/* 以上路由都未匹配到，则被此捕获 */}
    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
</BrowserRouter>
```
- `Link` 路由跳转
```jsx
<Link to="/dashboard">Dashboard</Link>
```
- `Switch` A `<Switch>` render the first child `<Route>` that matches，Swtich 可以 多层嵌套
- `Redirect` A `<Redirect>` may be used to redirect old URLs to new ones
- `useLocation` 从路由中解析出的信息，包括上一个路由页跳转携带过来的
```ts
const history: {action: 'POP', block: Function, createHref: Function,
  go: Function, goBack: Function, goForward: Function. listen: Function,
  location: ReturnType<typeof useLocation>, push: Function, replace: Function} = useHistory()
```
```ts
const location: {hash: string,key: string,pathname: string,search: string, state: Record<string, any>} = useLocation()
```
- `userHistory` 命令式路由跳转
```js
const history = useHistory()
history.push('/')
```
- `useRouteMatch`
```js
const { path, url } = useRouteMatch()
```

## 如何创建并使用受控（权限）路由
```ts
import { useContext, useState, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'

// 1. 模拟登录/权限验证
const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

// 2. 登录/权限验证 hooks
function useProvideAuth() {
  const [user, setUser] = useState(null)
  const signin = cb => {
    return fakeAuth.sigin(() => {
      setUser('user')
      cb()
    })
  }
  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null)
      cb()
    })
  }
  return {
    user,
    signin,
    signout
  }
}
// 3. 创建 context，用于在顶层存储登录状态数据及其操作函数
const authContext = createContext()
function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// 4. 使用 context，可以在任意组件被 authContext.Provider 包裹的子组件中使用此法来获取 context 数据
function useAuth() {
  return useContext(authContext)
}

// 5. 定义路由，使用 context Provide 包裹所有路由定义和组件
function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          {/* 主动触发登录/权限验证*/}
          <AuthButton />
          <ul>
            <li>
              <Link to="/public" >公开路由</Link>
            </li>
            <li>
              <Link to="/protected" >保护路由</Link>
            </li>
          </ul>
        </div>
        <Swtich>
          <Route path="/public">
            <PublicPage />
          </Route>
          {/* 进入受保护路由页前，根据状态判断如没有权限（没登录），则重定向到此页面（命令式：history.push('/login')） */}
          <Route path="/login">
            <LoginPage />
          </Route>
          {/* 受保护的路由页面 */}
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
        <Switch>
      </Router>
    </ProvideAuth>
  )
}

// 6. 主动触发登录/权限验证操作
function AuthButton() {
  const auth = useAuth()
  return auth.user ? '已登录页' : '未登录页'
}

// 7. 受保护路由页高阶组件
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.user ? (
          children
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }}>
        )
      }}
    />
  )
}
```