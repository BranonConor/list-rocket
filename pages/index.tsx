import Head from 'next/head';
import { Hero } from '../components/sections/Hero';
import { WebLayout } from '../components/layouts/WebLayout';
import { About } from '../components/sections/About';
import { Features } from '../components/sections/Features';

const Index = () => {
	return (
		<WebLayout>
			<Head>
				<title>Home | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<Hero />
				<About />
				<Features />
			</main>
		</WebLayout>
	);
};

export default Index;
