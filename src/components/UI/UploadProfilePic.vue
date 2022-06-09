<template>
    <div class="profile-pic-wrapper">
        <div class="profile-pic-form-wrapper">
            <form>
                <div class="profile-pic-container">
                    <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ebbf38ee3ae0b4d04b85a_user%20(9).svg" loading="lazy" alt="" class="profile-pic">
                    <div class="profile-pic-progress-mask">
                        <div class="profile-pic-progress-bar">
                            <div class="profile-pic-progress"></div>
                        </div>
                        <div class="profile-pic-progress-text">
                            <span class="profile-pic-progress-percent">40</span>
                            %
                        </div>
                    </div>
                </div>
                <div class="upload-contents">
                    <div class="upload-buttons">
                        <base-button class="primary">Upload Profile Pic</base-button>
                        <div class="replace-pic-wrapper">
                            <base-button class="primary">Replace Profile Pic</base-button>
                            <base-button class="secondary">
                                <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f47037f8ff179a0bac6445e_delete%20(4).svg" loading="lazy" alt="" class="image-11">
                            </base-button>
                        </div>
                    </div>
                    <input class="file" type="file" accept=".png,.gif,.jpg,.jpeg">
                </div>
            </form>
        </div>
    </div>
</template>