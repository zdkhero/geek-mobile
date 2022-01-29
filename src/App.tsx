// 导入 React 路由
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 导入组件
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Question from '@/pages/Question'
import Video from '@/pages/Video'
import Profile from '@/pages/Profile'

// 导入样式文件
import './App.scss'

function App() {
  return (
    // 配置路由规则
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="question" element={<Question />}></Route>
          <Route path="video" element={<Video />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
