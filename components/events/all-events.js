import EventCard from '../cards/event-card';
import {EventContext} from '../../contexts/EventContext'
import {motion} from 'framer-motion'
import styles from './all-events.module.scss'
import {useContext} from 'react'

const AllEvents = () => {

    const { events } = useContext(EventContext);

    return (
        <div className={styles.AllEvents}>
            <h2>Your Events</h2>
            <div className={styles.eventsContainer}>
            {
                events.length ? 
                    events.map(event => {
                        return <EventCard name={event.name} description={event.description} id={event._id} key={event._id} />
                    })
                    :
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeIn", duration: '5', type: 'spring' }}
                    >
                        Start your first event! ✨
                    </motion.p>
            }
            </div>
        </div>
    )
}

export default AllEvents