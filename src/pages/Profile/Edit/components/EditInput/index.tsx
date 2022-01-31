import { Input, NavBar, TextArea } from 'antd-mobile'
import { useState } from 'react'

import styles from './index.module.scss'

type Props = {
  value: string
  type: '' | 'name' | 'intro'
  onClose: () => void
  onUpdateName: (value: string) => void
}

const EditInput = ({ value, type, onUpdateName, onClose }: Props) => {
  // 获取到最新的用户名
  const [inputValue, setInputValue] = useState(value)
  // 获取
  const isName = type === 'name'

  const onSave = () => {
    onUpdateName(inputValue)
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span className="commit-btn" onClick={onSave}>
            提交
          </span>
        }
        onBack={onClose}
      >
        编辑{isName ? '昵称' : '简介'}
      </NavBar>

      {/*  */}
      <div className="edit-input-content">
        <h3>{isName ? '昵称' : '简介'}</h3>

        {isName ? (
          <div className="input-wrap">
            <Input placeholder="请输入" value={inputValue} onChange={setInputValue} />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入"
            // 展示：右下角的字数统计
            showCount
            // 指定内容最大长度
            maxLength={100}
            // 指定 文本域 展示内容的行数（文本域高度）
            rows={4}
            value={inputValue}
            onChange={setInputValue}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
