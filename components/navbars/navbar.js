import Button from '../buttons/Button'
import Link from 'next/link'
import LogoLight from '../icons/logo'
import styles from './navbar.module.scss'
import { useContext, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth'

const Navbar = () => {

    useEffect(() => {
        const [session, loading] = useSession();
    })
    const handleSignIn = () => {
        signIn("google", { callbackUrl: "http://localhost:3000/" });
    }
    const handleSignOut = () => {
        signOut();
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.brand}>
                <a href="/">
                    <LogoLight />
                </a>
            </div>
            <div className={styles.menu}>
                <ul>
                    <li>
                        <Link href='/'>
                            <a>Home</a>
                        </Link>
                    </li>
                    {/* { Object.keys(user).length ? 
                        <li>
                            <Link href='/dashboard'>
                                <a>Dashboard</a>
                            </Link>
                        </li>
                        :
                        null
                    }
                    { Object.keys(user).length ?
                        <Button 
                            content='Sign out'
                            onClick={handleSignOut}
                        />
                        :
                        <Button 
                            content='Sign in'
                            onClick={handleSignIn}
                        />
                    } */}
                </ul>
            </div>
        </div>
    )
}

export default Navbar