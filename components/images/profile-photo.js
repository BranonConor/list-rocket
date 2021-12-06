import styles from './profile-photo.module.scss'

const ProfilePhoto = (props) => {
    return (
        <img src={props.photo} className={styles.ProfilePhoto} width={props.dimensions} height={props.dimensions} />
    )
}

export default ProfilePhoto