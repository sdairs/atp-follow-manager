<script lang="ts">
	import { agent } from '$lib/atp/atp';
	import { storageKeys } from '$lib/atp/storage';

	import MultiSelectTable from '../MultiSelectTable.svelte';
	import FollowsMetrics from './FollowsMetrics.svelte';

	export let follows: Array<any> = [];

	async function unfollow(did: string) {
		agent.resumeSession(JSON.parse(localStorage.getItem(storageKeys.session.$)!));
		let response = await agent.deleteFollow(did);
		console.log(response);
	}
</script>

<div>
	<h2>People you follow</h2>
	<FollowsMetrics {follows} />
	<MultiSelectTable data={follows} buttonCallback={unfollow} />
</div>
