import Head from 'next/head';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { WebLayout } from '../components/layouts/WebLayout';

const Index = () => {
	return (
		<WebLayout>
			<Head>
				<title>Home | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<Hero />
			</main>
		</WebLayout>
	);
};

export default Index;

// export async function getServerSideProps(ctx) {
//   const cookie = ctx.req ? ctx.req.headers.cookie : undefined;
//   return {props: {cookie: cookie}}
// }
