<template>
    <header class="sticky-top">
        <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
            <div class="container-fluid px-3 px-lg-5">
                <!-- Logo -->
                <a class="navbar-brand" href="/">
                    <img src="/assets/images/logo.svg" alt="Logo" width="100" class="me-2">
                    </a>

                <!-- Toggle button -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Collapsible Content -->
                <div class="collapse navbar-collapse justify-content-between" id="mainNavbar">
                    <!-- Nav links -->

                    <ul class="navbar-nav mb-2 mb-lg-0 mx-auto">
                        <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
                        <li class="nav-item"><a class="nav-link" href="#price">Premium Access</a></li>

                        <!-- Hiển thị ở mobile nếu chưa đăng nhập -->
                        <li class="nav-item d-lg-none" id="mobileLoginBtn">
                            <a class="nav-link" href="javascript:showLoginModal();">Sign In</a>
                        </li>

                        <!-- Hiển thị ở mobile nếu đã đăng nhập -->
                        <li class="nav-item d-lg-none" id="mobileSubBtn" style="display: none;">
                            <a class="nav-link subscriptionLink" target="_blank" href="/">Subscription Management</a>
                        </li>
                        <li class="nav-item d-lg-none" id="mobileLogoutBtn" style="display: none;">
                            <a class="nav-link" href="javascript:handleLogout();">Sign Out</a>
                        </li>
                    </ul>



                    <div class="app-buttons d-none d-lg-flex justify-content-center align-items-center mt-3 mt-lg-0">
                        <!-- App store buttons -->
                        <a id="app-button-and1" class="btn-download-tracking"
                            href="https://play.google.com/store/apps/details?id=com.heka.ai.caloriecounter.mealplan">
                            <img src="/assets/images/chplay_icon.png" alt="App Store" height="40" class="me-2">
                        </a>
                        <a id="app-button-ios1" class="btn-download-tracking me-3"
                            href="https://apps.apple.com/app/heka-ai-calorie-counter/id6747111547">
                            <img src="/assets/images/appstore_icon.png" alt="Google Play" height="40">
                        </a>

                        <!-- Login button -->
                        <a href="javascript:showLoginModal();" id="loginBtn" class="text-decoration-none text-dark">
                            Sign In
                        </a>

                        <!-- User dropdown -->
                        <div class="dropdown ms-3" id="userDropdown" style="display: none;">
                            <a href="#" class="text-dark text-decoration-none dropdown-toggle" id="userMenuLink"
                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-person-circle fs-3"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuLink">
                                <li><a class="dropdown-item subscriptionLink" href="/">Subscription Management</a></li>
                                <li><a class="dropdown-item" href="javascript:handleLogout();">Sign Out</a></li>
                            </ul>
                        </div>
                    </div>



                </div>
            </div>
        </nav>

    </header>


</template>

<script setup>







</script>

<style lang="scss" scoped></style>
