<script lang="ts">
	import MultiSelectTable from '../MultiSelectTable.svelte';
	import FollowsMetrics from './FollowsMetrics.svelte';

	export let follows: Array<any> = [];
</script>

<div>
	<h2>People you follow</h2>
	<FollowsMetrics {follows} />
	<MultiSelectTable data={follows} />
</div>
