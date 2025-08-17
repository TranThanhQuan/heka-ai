<template>
    <div class="modal fade" id="paywallModal" tabindex="-1" aria-labelledby="paywallModalLabel"
        data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 rounded-4 overflow-hidden">
                <div class="modal-body p-0" style="background: white;">

                    <!-- Nút X đóng modal -->
                    <button type="button" id="freemiumCloseBtn" onclick="closePricingModal()"
                        class="position-absolute top-0 start-0 m-3 text-white  border-0 bg-transparent"
                        style="z-index: 1060; font-size: 40px!important;" aria-label="Close">
                        &times;
                    </button>
                    <div class="position-relative p-4 text-center bg-modal">
                        <div class="d-flex gap-3 justify-content-center mt-3 mb-4">
                            <div class="card-price d-flex justify-content-center gap-2">
                                <img data-price-id="price_1Rv97QRTFiCqGCgWmNQgsY2s" class="price-option"
                                    src="/assets/img_onboarding/price.png" alt="">
                                <img data-price-id="price_1Rv97dRTFiCqGCgWpzcyDnPW" class="price-option active"
                                    src="/assets/img_onboarding/price3.png" alt="">
                            </div>
                        </div>
                        <a id="goPremium" class="btn btn-warning w-100 fw-bold rounded-pill py-2">Go Premium Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>




</template>

<script setup>

</script>

<style scoped>

</style>
