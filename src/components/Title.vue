<template>
    <div id="title">
        <div id="clipped-title">
            <h1>What tea should I buy?</h1>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
#clipped-title {
	background: url('../assets/titleback.jpg') no-repeat center center;
	background-size: 100% auto;
	color: #fff;
    color: black;
    text-align: center;
	/* -webkit-background-clip clips the background of the element to the text */
	-webkit-text-fill-color: transparent; /* overrides the white text color in webkit browsers */
    -webkit-background-clip: text;
    margin-bottom: 2rem;
}

h1 {
    color: black;
    text-transform: uppercase;
    font-family: 'Dosis', sans-serif;
    font-size: 6vw;
    font-weight: 900;
    letter-spacing: -3px;
    line-height: 1;
    margin-bottom: 0;
}
</style>