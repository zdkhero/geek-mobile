// 导入 React 路由
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 导入组件
import Layout from './pages/Layout'
import Login from './pages/Login'

// 导入样式文件
import './App.scss'

function App() {
  return (
    // 配置路由规则
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
