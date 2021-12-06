import ProfilePhoto from '../images/profile-photo'
import {motion} from 'framer-motion'
import styles from './user-list.module.scss'

const UserList = (props) => {

    return (
        <motion.div className={styles.UserList}
            initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
            animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
            transition={{ ease: "easeIn", duration: '0.25', type: 'spring' }}
        >
            <div className={styles.title}>
                <ProfilePhoto 
                    photo={props.photo}
                    dimensions='40px'
                />
                {
                    props.name ? 
                    <h3>{props.name}'s List</h3>
                    :
                    <h3>Your List</h3>
                }
            </div>
        </motion.div>
    )
}

export default UserList