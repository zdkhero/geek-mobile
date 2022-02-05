// 导入 React 路由
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 导入组件
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Question from '@/pages/Question'
import Video from '@/pages/Video'
import Profile from '@/pages/Profile'
import Edit from '@/pages/Profile/Edit'
import Article from './pages/Article'
import Search from './pages/Search'
import SearchResult from './pages/Search/Result'

// 导入样式文件
import './App.scss'
import AuthRoute from './components/AuthRoute'

function App() {
  return (
    // 配置路由规则
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="question" element={<Question />}></Route>
          <Route path="video" element={<Video />}></Route>
          <Route
            path="profile"
            element={
              <AuthRoute>
                <Profile />
              </AuthRoute>
            }
          >
            <Route
              path="edit"
              element={
                <AuthRoute>
                  <Edit />
                </AuthRoute>
              }
            ></Route>
          </Route>
          <Route path="article/:id" element={<Article />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="search/result" element={<SearchResult />}></Route>
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
