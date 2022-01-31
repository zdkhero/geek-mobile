import { Input, NavBar } from 'antd-mobile'
import { useState } from 'react'

import styles from './index.module.scss'

type Props = {
  value: string
  type: '' | 'name' | 'intro'
  onClose: () => void
  onUpdateName: (value: string) => void
}

const EditInput = ({ value, type, onUpdateName, onClose }: Props) => {
  const [inputValue, setInputValue] = useState(value)

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
        编辑昵称
      </NavBar>

      {/*  */}
      <div className="edit-input-content">
        <h3>昵称</h3>

        <div className="input-wrap">
          <Input placeholder="请输入" value={inputValue} onChange={(value) => setInputValue(value)} />
        </div>
      </div>
    </div>
  )
}

export default EditInput
