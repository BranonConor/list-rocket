import {motion} from 'framer-motion'
import styles from './collaborators-grid.module.scss'

const CollaboratorsGrid = () => {

    return (
        <motion.div className={styles.CollaboratorsGrid}
            initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
            animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
            transition={{ ease: "easeIn", duration: '0.25', type: 'spring' }}
        >
            OTHER LISTS
        </motion.div>
    )
}

export default CollaboratorsGrid