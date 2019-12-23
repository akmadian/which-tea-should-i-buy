<template> 
    <div class="item-photo-detail-container">
        <b-carousel class="b-carousel-container">
            <b-carousel-item v-for="(image, i) in this.imagePaths" :key="i" class="b-carousel">
                <img :src="image" :key="image" class="b-carousel"/>
            </b-carousel-item>           
        </b-carousel>
    </div>
</template>
<script>

export default {
    props: ['images'],
    computed: {
        imagePaths: function() {
            return this.images.map(obj => obj.src)
        }
    }
}
</script>
<style scoped>
    .item-photo-detail-container {
        display: inline-block;
        height: 22rem;
        width: 100%;
        max-height: 22rem;
        margin: 0 auto;
        background: gray;
        margin-right: 1rem;
    }

    .b-carousel-container {
        width: 100%;
        margin: 0 auto;
    }

    .b-carousel > img {
        object-fit: contain;
        width: 100%;
        margin: 0 auto;
        max-height: 22rem;
    }
</style>