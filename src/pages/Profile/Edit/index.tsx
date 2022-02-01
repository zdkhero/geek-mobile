import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/store/actions/profile'
import { RootState } from '@/types/store'
import { Button, List, DatePicker, NavBar, Popup, Toast, Dialog } from 'antd-mobile'
import classNames from 'classnames'

import styles from './index.module.scss'
import EditInput from './components/EditInput'
import EditList from './components/EditList'
import { logout } from '@/store/actions/login'
import { useNavigate } from 'react-router-dom'

const Item = List.Item

type InputPopup = {
  type: '' | 'name' | 'intro'
  value: string
  visible: boolean
}

type ListPopup = {
  type: '' | 'gender' | 'photo'
  visible: boolean
}

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const { userProfile } = useSelector((state: RootState) => state.profile)
  const [showBirthday, setShowBirthday] = useState(false)

  let { photo, name, intro, gender, birthday } = userProfile
  if (intro === null) {
    intro = ''
  }

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  // 控制姓名和资料的状态
  const [inputPopup, setInputPopup] = useState<InputPopup>({
    type: '', // type 属性，用来标识是昵称还是简介
    value: '', // 当前值
    visible: false // 展示或隐藏弹框
  })

  // 控制性别和照片的状态
  const [listPopup, setListPopup] = useState<ListPopup>({
    type: '',
    visible: false
  })

  const onGenderShow = () => {
    setListPopup({
      type: 'gender',
      visible: true
    })
  }

  const onGenderHide = () => {
    setListPopup({
      type: '',
      visible: false
    })
  }

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

  const onUpdateProfile = async (type: 'name' | 'intro' | 'gender' | 'photo' | 'birthday', value: string) => {
    if (type === 'photo') {
      // 单独处理修改头像的逻辑 - 来弹窗让用户选择图片
      // console.log('修改头像了')
      fileRef.current?.click()
    } else {
      // 分发 action
      await dispatch(updateUserProfile({ [type]: value }))

      // 给用户提示
      Toast.show({
        content: '更新成功',
        duration: 1000
      })

      // 隐藏弹层
      onInputHide()
      onGenderHide()
    }
  }

  const onIntroShow = () => {
    setInputPopup({
      type: 'intro',
      value: intro,
      visible: true
    })
  }

  const onPhotoShow = () => {
    setListPopup({
      type: 'photo',
      visible: true
    })
  }

  const onChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const photoData = new FormData()
    photoData.append('photo', file)

    await dispatch(updateUserPhoto(photoData))
    onGenderHide()
  }

  const onBirthdayShow = () => {
    setShowBirthday(true)
  }

  const onBirthdayHide = () => {
    setShowBirthday(false)
  }

  const onUpdateBirthday = (value: Date) => {
    const birthday = dayjs(value).format('YYYY-MM-DD')

    onUpdateProfile('birthday', birthday)
    onBirthdayHide()
  }

  const onLogout = () => {
    const handler = Dialog.show({
      title: '温馨提示',
      content: '亲，你确定退出吗？',
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
            onClick: () => {
              handler.close()
            }
          },
          {
            key: 'confirm',
            text: '退出',
            style: {
              color: 'var(--adm-color-weak)'
            },
            onClick: () => {
              dispatch(logout())
              handler.close()
              navigate('/login', { replace: true })
            }
          }
        ]
      ]
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
              onClick={onPhotoShow}
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
            <Item arrow extra={gender + '' === '0' ? '男' : '女'} onClick={onGenderShow}>
              性别
            </Item>
            <Item arrow extra={birthday || '1999-9-9'} onClick={onBirthdayShow}>
              生日
            </Item>
          </List>

          <DatePicker
            onConfirm={onUpdateBirthday}
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          {/* <Button className="btn"></Button> */}
          <Button className="btn" color="primary" fill="none" onClick={onLogout}>
            退出登录
          </Button>
        </div>

        <input type="file" hidden ref={fileRef} onChange={onChangePhoto} />
      </div>

      {/* 弹框组件 */}
      <Popup visible={inputPopup.visible} position="right" bodyStyle={{ width: '100%' }}>
        <EditInput
          key={inputPopup.type}
          type={inputPopup.type}
          value={inputPopup.value}
          onClose={onInputHide}
          onUpdateProfile={onUpdateProfile}
        />
      </Popup>

      <Popup visible={listPopup.visible} onMaskClick={onGenderHide}>
        <EditList type={listPopup.type} onClose={onGenderHide} onUpdateProfile={onUpdateProfile} />
      </Popup>

      <DatePicker
        visible={showBirthday}
        value={new Date(birthday)}
        onCancel={onBirthdayHide}
        onConfirm={onUpdateBirthday}
        title="选择年月日"
        min={new Date(1900, 0, 1, 0, 0, 0)}
        max={new Date()}
      />
    </div>
  )
}

export default ProfileEdit
