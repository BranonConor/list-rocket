import {EventContext} from '../../contexts/EventContext'
import ProfilePhoto from '../images/profile-photo'
import {WorkspaceContext} from '../../contexts/WorkspaceContext'
import {motion} from 'framer-motion'
import styles from './workspace-controls.module.scss'
import {useContext} from 'react'

const WorkspaceControls = () => {

    const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
    const { events } = useContext(EventContext);

    const handleLoadEvent = async (e, id) => {
        e.preventDefault();
        console.log(id);
        prepWorkspace(id);
    }

    return (
        <div className={styles.WorkspaceControls}>
            {/* ---- EVENT CONTROLS ---- */}
            <div className={styles.events}>
                <h2>Your Events</h2>
                <p>Choose an event to load it into your workspace</p>
                <div className={styles.eventsContainer}>
                {
                    events.map(event => {
                    return (
                        <motion.a onClick={(e) => handleLoadEvent(e, event._id)} key={event._id} className={styles.button}
                            initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
                            animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
                            transition={{ ease: "easeIn", duration: '0.25', type: 'spring' }}
                        >
                            {event.name}
                        </motion.a>
                    )
                    })
                }
                </div>
            </div>
            {/* ---- EVENT INFORMATION ---- */}
            <div className={styles.eventInfo}>
            {
                Object.keys(currentEvent).length ? 
                <>
                    <h2>Currently working on: {currentEvent.name}</h2>
                    <p>Event Creator:</p>
                    <motion.div className={styles.infoCard}
                        initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
                        animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
                        transition={{ ease: "easeIn", duration: '0.25', type: 'spring' }}
                    >
                        <ProfilePhoto 
                            photo={currentEvent.creator.photo}
                            dimensions='35px'
                        />
                        <p>{currentEvent.creator.firstName} {currentEvent.creator.lastName}</p>
                    </motion.div>
                </>
                :
                <p>No event loaded... 👻</p>
            }
            </div>
        </div>
    )
}

export default WorkspaceControls