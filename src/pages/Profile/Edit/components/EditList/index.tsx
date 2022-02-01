import styles from './index.module.scss'

type Props = {
  type: '' | 'gender' | 'photo'
  onUpdateProfile: (type: 'gender' | 'photo', value: string) => void
  onClose: () => void
}

const genderList = [
  { text: '男', value: '0' },
  { text: '女', value: '1' }
]

const photoList = [
  { text: '拍照', value: 'picture' },
  { text: '本地选择', value: 'local' }
]

const EditList = ({ type, onUpdateProfile, onClose }: Props) => {
  // 需要渲染的数据
  const list = type === 'gender' ? genderList : photoList

  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div
          className="list-item"
          key={item.text}
          onClick={() => {
            if (type === '') return
            onUpdateProfile(type, item.value)
          }}
        >
          {item.text}
        </div>
      ))}

      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  )
}

export default EditList
