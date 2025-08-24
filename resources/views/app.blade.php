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
        <link rel="preload" as="image" href="/images/onboarding/modal/bg_premium_modal.png" />
        <link rel="preload" as="image" href="/images/onboarding/modal/bg_lose_modal.png" />
        <link rel="preload" as="image" href="/images/onboarding/modal/bg_maintain_modal.png" />
        <link rel="preload" as="image" href="/images/onboarding/modal/bg_lose_modal.png" />
        <link rel="preload" as="video" href="/images/onboarding/video/introduction.mp4" />


        <!-- slick css -->
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />

        <!-- Scripts -->
        {{-- @routes --}}
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])

 <!-- Google Tag Manager -->
        {{-- <script>(function (w, d, s, l, i) {

            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);

        })(window, document, 'script', 'dataLayer', 'GTM-W4DLR9RJ');</script> --}}

    <!-- End Google Tag Manager -->

    <!-- TikTok Pixel Code Start -->
    <script>
        !function (w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = w[t] = w[t] || [];

            ttq.methods = [
                "page", "track", "identify", "instances", "debug", "on", "off", "once",
                "ready", "alias", "group", "enableCookie", "disableCookie",
                "holdConsent", "revokeConsent", "grantConsent"
            ];

            ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                };
            };

            for (var i = 0; i < ttq.methods.length; i++) {
                ttq.setAndDefer(ttq, ttq.methods[i]);
            }

            ttq.instance = function (t) {
                var e = ttq._i[t] = [];
                for (var n = 0; n < ttq.methods.length; n++) {
                    ttq.setAndDefer(e, ttq.methods[n]);
                }
                return e;
            };

            ttq.load = function (e, n) {
                var r = "https://analytics.tiktok.com/i18n/pixel/events.js";
                var o = n && n.partner;

                ttq._i = ttq._i || {};
                ttq._i[e] = [];
                ttq._i[e]._u = r;

                ttq._t = ttq._t || {};
                ttq._t[e] = +new Date;

                ttq._o = ttq._o || {};
                ttq._o[e] = n || {};

                var s = document.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.src = r + "?sdkid=" + e + "&lib=" + t;

                var f = document.getElementsByTagName("script")[0];
                f.parentNode.insertBefore(s, f);
            };

            ttq.load('D1VJ4KRC77UADB9JB760');
            ttq.page();

        }(window, document, 'ttq');
    </script>
    <!-- TikTok Pixel Code End -->
    <!-- Google Tag Manager -->
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=GTM-PX894VXN' + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-PX894VXN');
    </script>
    <!-- End Google Tag Manager -->


    <!-- Meta Pixel Code -->
<script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1100040445416239');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1100040445416239&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Meta Pixel Code -->

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
