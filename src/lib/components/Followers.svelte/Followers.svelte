<script lang="ts">
	import MultiSelectTable from '../MultiSelectTable.svelte';
	import FollowersMetrics from './FollowersMetrics.svelte';

	export let followers: Array<any> = [];
</script>

<FollowersMetrics {followers} />
<MultiSelectTable data={followers} />
