import Footer from '../footer'
import Head from 'next/head'
import Sidebar from '../navbars/sidebar'
import styles from './dash-layout.module.scss'

export const siteTitle = 'A productivity tool for streamlining events'

const DashLayout = ({ children }) => {
    
    return (
        <div className={styles.layout}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="A productivity tool for streamlining event planning."
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                    siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <div className={styles.flexContainer}>
                <header className={styles.sideHeader}>
                        <Sidebar />
                </header>
                <main className={styles.main}>
                    {children}
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default DashLayout