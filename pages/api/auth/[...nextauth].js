import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import MongoClientPromise from '../../../lib/mongodb';

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export default NextAuth({
	secret: process.env.SECRET,
	database: process.env.MONGODB_URI,
	session: {
		strategy: 'jwt',
		maxAge: THIRTY_DAYS,
		updateAge: THIRTY_MINUTES,
	},
	adapter: MongoDBAdapter(MongoClientPromise),
	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) {
				session.user.id = token.uid;
			}
			return session;
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.uid = user.id;
			}
			return token;
		},
	},
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			httpOptions: {
				timeout: 40000,
			},
		}),
		// ...add more providers here
	],
	pages: {
		signIn: '/signin',
	},
});
