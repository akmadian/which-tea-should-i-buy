<template>
    <a-select defaultValue="USD - $" style="width: 120px" :size="size">
        <a-select-option value="USD">USD - $</a-select-option>
        <a-select-option value="GBP">GBP - &pound;</a-select-option>
        <a-select-option value="EUR">EUR - &euro;</a-select-option>
        <a-select-option value="CNY">CNY - &yen;</a-select-option>
    </a-select>
</template>
<script>
export default {
    name: 'Currency',
    props: {
        size: String
    }
}
</script>