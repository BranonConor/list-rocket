import Head from 'next/head';
import Hero from '../components/hero';
import WebLayout from '../components/layouts/web-layout';

const Home = () => {
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

export default Home;

// export async function getServerSideProps(ctx) {
//   const cookie = ctx.req ? ctx.req.headers.cookie : undefined;
//   return {props: {cookie: cookie}}
// }
