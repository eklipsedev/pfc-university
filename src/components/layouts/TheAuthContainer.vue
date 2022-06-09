<template>
    <div class="auth-container">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
div >>> form {
    background-color: #d2d2d2;
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    padding: 2rem 1.5rem;
    flex-direction: column;
    border-radius: 10px;
}
div >>> header {
    display: flex;
    margin-bottom: 1.25rem;
    justify-content: space-between;
    align-items: center;
}
div >>> .forgot-password {
    color: #6c6c6c;
    font-size: 0.75rem;
    text-decoration: none;
}
div >>> input {
    padding-left: 2rem;
    background-color: white;
}
div >>> h3 {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 18px;
    line-height: 30px;
    font-weight: 500;
}
.auth-container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
.container {
    display: flex;
    width: 24rem;
    flex-direction: column;
    align-items: stretch;
}
div >>> .logo {
    display: flex;
    width: 100%;
    height: 50px;
    margin-bottom: 2rem;
    padding: 0 1.5rem;
    justify-content: center;
    align-items: center;
}
div >>> .field {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
}
div >>> .icon {
    position: absolute;
    left: 10px;
    top: 40px;
    width: 12px;
}
div >>> .actions {
    display: flex;
    flex-direction: column;
}
</style>