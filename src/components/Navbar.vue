<template>
    <header class="navbar navbar-default">
        <div class="container">
            <h1 class="navbar-brand">
				<router-link :to="{ name:'home'}">Colin Stevenson</router-link>
			</h1>
            <ul class="navbar-right nav navbar-nav">
                <li class="active"><a href="#">Photography</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </div>
    </header>
</template>
<script>
</script>
<style lang="scss">
    h1 {
        font-weight: bold;
        margin: 0;
        >a {
            color: #333;
            &:hover {
                text-decoration: none;
            }
        }
    }
</style>