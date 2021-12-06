import {EventContext} from '../../contexts/EventContext'
import TrashIcon from '../icons/trash';
import {WorkspaceContext} from '../../contexts/WorkspaceContext'
import axios from 'axios';
import {motion} from 'framer-motion'
import styles from './event-card.module.scss';
import {useContext} from 'react'
import {useRouter} from 'next/router';

const EventCard = (props) => {
    const router = useRouter();
    const { getAllEvents } = useContext(EventContext);
    const { prepWorkspace, setCurrentEvent } = useContext(WorkspaceContext);

    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await axios({
            method: 'delete', //DELETE REQUEST
            url: `${process.env.SERVER_DOMAIN}/api/events/${props.id}`
        });
        setCurrentEvent({});
        getAllEvents();
    }
    
    const handleEnter = async (e) => {
        e.preventDefault();
        await prepWorkspace(props.id);
        router.push('/workspace');
    }

    return (
        <motion.div className={styles.EventCard}
            initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
            animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
            transition={{ ease: "easeIn", duration: '0.25', type: 'spring' }}
        >
            <h3>{props.name}</h3>
            <p>{props.description}</p>

            <div className={styles.buttonContainer}>
                <a className={styles.button} onClick={handleEnter}>Enter event</a>
                <a className={styles.delete} onClick={handleDelete}>
                    <TrashIcon />
                </a>
            </div>
        </motion.div>
    )
}

export default EventCard;