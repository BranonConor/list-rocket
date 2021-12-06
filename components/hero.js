import Button from './buttons/Button'
import RocketPlainIcon from './icons/rocket-plain'
import {motion} from 'framer-motion'
import styles from './hero.module.scss'
import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth'

const Hero = () => {
    useEffect(() => {
        const [session, loading] = useSession();
    })
    const handleSignIn = () => {
        signIn("google", { callbackUrl: "http://localhost:3000/" });
    }

    return (
        <div className={styles.hero}>
            <motion.div className={styles.brand}
                initial={{ y: "500%", opacity: 0 }}
                animate={{ y: "-25%", opacity: 1 }}
                transition={{ ease: "easeIn", duration: '2', type: 'spring' }}
            > 
                <RocketPlainIcon />
                <div className={styles.flame}></div>
                <div className={styles.flame}></div>
                <div className={styles.flame}></div>
                <div className={styles.flame}></div>
                <div className={styles.flame}></div>
                <div className={styles.flame}></div>
            </motion.div>
            
            <div className={styles.content}>
                <h1>Welcome to ListRocket</h1>
                <h3>A productivity tool for streamlining event planning</h3>
                <Button content='Get started!' onClick={handleSignIn} />
            </div>

            <div className={styles.stars}></div>
            <div className={styles.twinkling}></div>
            <div className={styles.clouds}></div>
        </div>
    )
}

export default Hero