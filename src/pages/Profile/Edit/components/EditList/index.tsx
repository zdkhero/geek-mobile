import styles from './index.module.scss'

type Props = {
  type: '' | 'gender' | 'photo'
  onUpdateProfile: (type: 'gender' | 'photo', value: string) => void
  onClose: () => void
}

const EditList = ({ type, onUpdateProfile, onClose }: Props) => {
  const onItemClick = (value: string) => {
    if (type === '') return
    onUpdateProfile(type, value)
  }

  return (
    <div className={styles.root}>
      <div className="list-item" onClick={() => onItemClick('0')}>
        男
      </div>
      <div className="list-item" onClick={() => onItemClick('1')}>
        女
      </div>

      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  )
}

export default EditList
