<template>
	<footer>
		<div class="container">
			&copy; {{year}}. All rights reserved.
		</div>
	</footer>
</template>
<script>
	export default {
		computed: {
			year() {
				return new Date().getFullYear();
			}
		},
	}
</script>