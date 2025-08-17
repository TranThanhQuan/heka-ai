<template>
    <Head title="Subscription Activated" />

    <div class="min-h-screen flex items-center justify-center bg-[#e2ebfb]">
      <div class="text-center px-4 py-6 max-w-md w-full">
        <h4 class="text-xl font-bold mb-4">
          Thanks for being amazing with Heka AI.<br />
          Let's start your plan now!
        </h4>

        <a href="/">
          <img src="/images/icon.png" alt="Heka Logo" class="w-20 h-20 mx-auto my-4" />
        </a>

        <ol class="text-lg text-left mb-6 space-y-1">
          <li>1. Click on the link below to download Heka AI</li>
          <li>2. Open the app and select "Sign in"</li>
          <li v-if="email">
            3. Use your sign-up email: <strong class="text-black">{{ email }}</strong>
          </li>
        </ol>

        <a href="javascript: goToApp();" class="block w-full text-white btn-download">
          Download Heka
        </a>

        <a href="/" class="text-indigo-600 text-sm hover:text-indigo-800 block mt-2">Back to home</a>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue';
  import { Head } from '@inertiajs/vue3';

  const props = defineProps({
    sessionId: String
  });

  let email = ref('');

  // lấy accessToken từ local storage
  const accessToken = localStorage.getItem('accessToken');
  if(!accessToken){
    window.location.href = '/';
  }

  // lấy email từ local storage
  email.value = localStorage.getItem('email');
  if(!email.value){
    document.getElementById('email').style.display = 'none';
  }

  onMounted(() => {
    console.log(props.sessionId);

    // const oneLinkURL = "https://heka.onelink.me/eDBo";
    // const result = window.AF_SMART_SCRIPT?.generateOneLinkURL({
    //   oneLinkURL,
    //   afParameters: {
    //     mediaSource: { keys: ["pid"], defaultValue: "web_traffic_organic" },
    //     campaign: { keys: ["c"] },
    //     afCustom: [
    //       { paramKey: "af_sited", keys: ["af_sited"] },
    //       { paramKey: "af_c_id", keys: ["af_c_id"] },
    //       { paramKey: "af_adset_id", keys: ["af_adset_id"] },
    //       { paramKey: "af_ad_id", keys: ["af_ad_id"] },
    //       { paramKey: "ttclid", keys: ["ttclid"] },
    //       { paramKey: "ttp", keys: ["ttp"] },
    //       { paramKey: "brower_user_agent", keys: ["brower_user_agent"] },
    //       { paramKey: "af_ss_ui", defaultValue: "true" }
    //     ],
    //     adSet: { keys: ["af_adset"] },
    //     ad: { keys: ["af_ad"] }
    //   }
    // });

    // if (result) {
    //   window.goToApp = () => {
    //     window.location.href = result.clickURL;
    //   };
    // }
  });
  </script>

  <style scoped>


  .btn-download {
    background-color: #5f6ae6;
    color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  .btn-download:hover {
    background-color: #8891f1;
  }
  </style>
