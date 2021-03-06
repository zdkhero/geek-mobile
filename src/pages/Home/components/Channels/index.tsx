import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import classnames from 'classnames'
import Icon from '@/components/Icon'
import { RootState } from '@/types/store'
import { addChannel, delChannel, getAllChannel } from '@/store/actions/home'

import styles from './index.module.scss'
import { Channel } from '@/types/data'

type Props = {
  onClose: () => void
}

const Channels = ({ onClose }: Props) => {
  const dispatch = useDispatch()
  // 是否是编辑
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    dispatch(getAllChannel())
  }, [dispatch])

  const { userChannel, restChannel, channelActiveKey } = useSelector((state: RootState) => state.home)

  // 切换编辑与保存状态
  const onChangeEdit = () => {
    setIsEdit(!isEdit)
  }

  // 点击频道
  const onChannelClick = (channel: Channel) => {
    if (!isEdit) {
      dispatch({ type: 'home/changeTab', payload: channel.id })
      onClose()
      return
    }

    console.log(userChannel)
    if (channel.id === 0) return
    if (userChannel.length <= 4) return
    dispatch(delChannel(channel))
  }

  // 添加频道
  const onAddChannel = (channel: Channel) => {
    dispatch(addChannel(channel))
  }

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item', isEdit && 'edit')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit" onClick={onChangeEdit}>
              {isEdit ? '保存' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannel.map((item) => (
              <span
                key={item.id}
                className={classnames('channel-list-item', channelActiveKey === item.id + '' && 'selected')}
                onClick={() => onChannelClick(item)}
              >
                {item.name}
                <Icon type="iconbtn_tag_close" />
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {restChannel.map((item) => (
              <span key={item.id} className="channel-list-item" onClick={() => onAddChannel(item)}>
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
