<script lang="ts">
	export let follows: Array<any> = [];

	let pct_mutual: number = 0;
	let count_mutual: number = 0;
	$: {
		const fl = follows.length;
		count_mutual = follows.filter((obj) => obj.viewer.followedBy !== undefined).length;
		pct_mutual = Math.round((count_mutual / fl) * 100);
	}
</script>

<div class="mt-4">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
		<p>Total follows: {follows.length}</p>
		<p>Total mutual: {count_mutual}</p>
		<p>Percent mutual: {pct_mutual}%</p>
	</div>
</div>
