<script lang="ts">
	export let followers: Array<any> = [];
</script>

<div class="mt-4">
	<h2>Personal controls</h2>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
		<p>Total followers: {followers.length}</p>
		<p>Total mutual: {'X'}</p>
		<p>% mutual: {'x'}%</p>
	</div>
</div>
