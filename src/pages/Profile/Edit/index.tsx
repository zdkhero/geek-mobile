import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, updateUserProfile } from '@/store/actions/profile'
import { RootState } from '@/types/store'
import { Button, List, DatePicker, NavBar, Popup, Toast } from 'antd-mobile'
import classNames from 'classnames'

import styles from './index.module.scss'
import EditInput from './components/EditInput'

const Item = List.Item

type InputPopup = {
  type: '' | 'name' | 'intro'
  value: string
  visible: boolean
}

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const { userProfile } = useSelector((state: RootState) => state.profile)
  const [inputPopup, setInputPopup] = useState<InputPopup>({
    type: '', // type 属性，用来标识是昵称还是简介
    value: '', // 当前值
    visible: false // 展示或隐藏弹框
  })

  const { photo, name, intro, gender, birthday } = userProfile

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  // 子组件 navbar 点击箭头，隐藏编辑昵称
  const onInputHide = () => {
    setInputPopup({
      type: '',
      value: '',
      visible: false
    })
  }

  const onInputShow = () => {
    setInputPopup({
      type: 'name',
      value: name,
      visible: true
    })
  }

  const onUpdateName = (name: string) => {
    // 分发 action
    dispatch(updateUserProfile({ name }))

    // 给用户提示
    Toast.show({
      content: '更新成功',
      duration: 1000
    })

    // 隐藏弹层
    onInputHide()
  }

  const onIntroShow = () => {
    setInputPopup({
      type: 'intro',
      value: intro,
      visible: true
    })
  }

  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={photo || 'http://toutiao.itheima.net/images/user_head.jpg'} alt="" />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item arrow extra={name || '黑马先锋'} onClick={onInputShow}>
              昵称
            </Item>
            <Item
              onClick={onIntroShow}
              arrow
              extra={<span className={classNames('intro', 'normal')}>{intro || '未填写'}</span>}
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={gender || '男'}>
              性别
            </Item>
            <Item arrow extra={birthday || '1999-9-9'}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          {/* <Button className="btn"></Button> */}
          <Button className="btn" color="primary" fill="none">
            退出登录
          </Button>
        </div>
      </div>

      {/* 弹框组件 */}
      <Popup visible={inputPopup.visible} position="right" bodyStyle={{ width: '100%' }}>
        <EditInput
          key={inputPopup.type}
          value={name}
          type={inputPopup.type}
          onClose={onInputHide}
          onUpdateName={onUpdateName}
        />
      </Popup>
    </div>
  )
}

export default ProfileEdit
