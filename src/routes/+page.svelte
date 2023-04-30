<script lang="ts">
	import BskyAgent from '@atproto/api';
	import type { AtpSessionEvent, AtpSessionData } from '@atproto/api';
	import { storageKeys } from '$lib/storage';

	import MultiSelectTable from '$lib/components/MultiSelectTable.svelte';
	import FollowAllFollowers from '$lib/components/FollowAllFollowers.svelte';
	import UnfollowAll from '$lib/components/UnfollowAll.svelte';
	import Followers from '$lib/components/Followers.svelte/Followers.svelte';
	import Follows from '$lib/components/Follows.svelte/Follows.svelte';

	const agent = new BskyAgent({
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

	let user: string = '';
	let pass: string = '';

	let follows: Array<any> = [];
	async function getFollows() {
		const profile = await agent.getFollows({ actor: user });
		// follows.push(...profile.data.follows);
		follows = profile.data.follows;
	}

	let followers: Array<any> = [];

	async function load() {
		await agent.login({
			identifier: user,
			password: pass
		});
		getFollows();
	}
</script>

<header class="prose mx-auto">
	<h1 class="text-center mt-4">BSky Follow Manager</h1>
</header>
<main class="prose mx-auto">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
		<input
			type="text"
			placeholder="Username"
			class="input input-bordered input-primary w-full max-w-xs"
			bind:value={user}
		/>
		<input
			type="password"
			placeholder="Password"
			class="input input-bordered input-primary w-full max-w-xs"
			bind:value={pass}
		/>
	</div>
	<div class="grid grid-cols-1 mt-4">
		<button class="btn btn-success" on:click={load}>load</button>
	</div>
	<!-- <div class="mt-4">
		<h2>Personal controls</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
			<FollowAllFollowers />
			<UnfollowAll />
		</div>
	</div>
	<div class="mt-4">
		<h2>Selected controls</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
			<FollowAllFollowers />
			<UnfollowAll />
		</div>
	</div> -->
	{#if follows.length > 0}
		<Follows {follows} />
	{/if}
	{#if followers.length > 0}
		<div>
			<h2>People following you</h2>
			<MultiSelectTable data={followers} />
		</div>
	{/if}
</main>
