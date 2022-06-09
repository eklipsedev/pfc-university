<template>
    <div class="body-container">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.body-container {
    padding: 50px 0;
}
.container {
    width: 1224px;
    max-width: 90vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>