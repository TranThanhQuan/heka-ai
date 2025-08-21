<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'HekaAI') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

        <!-- favicon -->
        <link rel="icon" href="/images/favicon.png?v=1">

        <!-- preload img -->
        <link rel="preload" as="image" href="/images/onboarding/image_nutrition.webp" />

        <!-- slick css -->
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />

        <!-- Scripts -->
        {{-- @routes --}}
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])


        {{-- Appflyer & Admob script --}}
        <!-- AppsFlyer web SDK -->
    <script>
        !function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a,t.AF=t.AF||function(){
        (t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))},
        t.AF.id=t.AF.id||i,t.AF.plugins={},o=e.createElement(n),p=e.getElementsByTagName(n)[0],o.async=1,
        o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:""),
        p.parentNode.insertBefore(o,p)}(window,document,"script",0,"AF","pba",{pba: {webAppId: "1a2648e2-a493-4ff4-98a1-73c3b1bd2194"}})
    </script>


        <script src="https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js"></script>
        <script>
                const oneLinkURL = "https://heka.onelink.me/eDBo";
                const result = window.AF_SMART_SCRIPT?.generateOneLinkURL({
                  oneLinkURL,
                  afParameters: {
                    mediaSource: { keys: ["pid"], defaultValue: "web_traffic_organic" },
                    campaign: { keys: ["c"] },
                    afCustom: [
                      { paramKey: "af_sited", keys: ["af_sited"] },
                      { paramKey: "af_c_id", keys: ["af_c_id"] },
                      { paramKey: "af_adset_id", keys: ["af_adset_id"] },
                      { paramKey: "af_ad_id", keys: ["af_ad_id"] },
                      { paramKey: "ttclid", keys: ["ttclid"] },
                      { paramKey: "ttp", keys: ["ttp"] },
                      { paramKey: "brower_user_agent", keys: ["brower_user_agent"] },
                      { paramKey: "af_ss_ui", defaultValue: "true" }
                    ],
                    adSet: { keys: ["af_adset"] },
                    ad: { keys: ["af_ad"] }
                  }
                });

                if (result) {
                    // console.log(result);
                //   window.goToApp = () => {
                //     window.location.href = result.clickURL;
                //   };
                }
        </script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia


        <script>
            const redirectUri = window.location.origin + window.location.pathname;
            if (window.location.pathname !== '/payment/success' && window.location.pathname !== '/payment/cancel') {
                localStorage.setItem('redirectUri', redirectUri);
            }
        </script>

        <!-- jQuery + Slick JS -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        <script src="{{ asset('js/loadingScreen.js') }}"></script>
    </body>
</html>
