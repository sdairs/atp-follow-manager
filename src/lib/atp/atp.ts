import { BskyAgent } from '@atproto/api';
import type { AtpSessionEvent, AtpSessionData } from '@atproto/api';
import { storageKeys } from '$lib/atp/storage';

export const agent = new BskyAgent({
	service: 'https://bsky.social',
	persistSession: (e: AtpSessionEvent, session?: AtpSessionData) => {
		switch (e) {
			case 'create':
			case 'update':
				localStorage.setItem(storageKeys.session.$, JSON.stringify(session));
				break;
			case 'expired':
			case 'create-failed':
				localStorage.removeItem(storageKeys.session.$);
				break;
		}
	}
});

export async function login(user: string, pass: string) {
	await agent.login({
		identifier: user,
		password: pass
	});
}
