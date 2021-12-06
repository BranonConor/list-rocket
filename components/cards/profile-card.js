import {motion} from 'framer-motion'
import styles from './profile-card.module.scss';

const ProfileCard = (props) => {

    return (
        <motion.div className={styles.ProfileCard}
            initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
            animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
            transition={{ ease: "easeIn", duration: '0.25', type: 'spring' }}
        >
            <img src={props.photo} alt="Logged in user"/>
            <h3>{props.firstName} {props.lastName}</h3>
            <ul>
                <li>Email: {props.email}</li>
            </ul>
        </motion.div>
    )
}

export default ProfileCard;