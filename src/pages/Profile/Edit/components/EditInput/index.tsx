import { Input, NavBar, TextArea } from 'antd-mobile'
import { useEffect, useState } from 'react'

import styles from './index.module.scss'

type Props = {
  value: string
  type: '' | 'name' | 'intro'
  onClose: () => void
  onUpdateProfile: (type: 'name' | 'intro', value: string) => void
}

const EditInput = ({ value, type, onUpdateProfile, onClose }: Props) => {
  // 获取到最新的用户名
  const [inputValue, setInputValue] = useState(value)
  // 获取
  const isName = type === 'name'

  useEffect(() => {
    // value 为 null 或 undefined 时，设置为默认值为空字符串
    setInputValue(value ?? '')
  }, [value])

  const onSave = () => {
    // 通过该判断，去掉 type 属性中的 '' 类型，解决类型不一致的问题
    if (type === '') return
    onUpdateProfile(type, inputValue)
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span className="commit-btn" onClick={() => onSave()}>
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
            placeholder="请输入内容"
            value={inputValue}
            onChange={(value) => setInputValue(value)}
            rows={4}
            maxLength={100}
            showCount
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
