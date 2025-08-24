<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Jenssegers\Agent\Agent;
use Illuminate\Http\Request;
use App\Models\EventTracking;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class EventTrackingController extends Controller
{
    public function store(Request $request)
    {
        $agent = new Agent();
        if ($agent->isMobile()) {
            $device = $agent->isiOS() ? 'ios' : ($agent->isAndroidOS() ? 'android' : 'mobile');
        } elseif ($agent->isDesktop()) {
            $device = 'pc';
        } else {
            $device = 'unknown';
        }

        $ip = $request->ip();

        $country = null;
        try {
            $response = Http::get("https://ipapi.co/{$ip}/country_name/");
            if ($response->successful()) {
                $country = $response->body();
            }
        } catch (\Exception $e) {
            $country = null;
        }

        EventTracking::create([
            'event_name' => $request->input('eventName'),
            'data' => $request->input('data'),
            'device' => $device,
            'ip_address' => $ip,
            'country' => $country,
            'path' => $request->input('path'),
            'from' => $request->input('from'),
        ]);

        return response()->json(['message' => 'Event saved']);
    }



    public function funnel(Request $request)
    {
        $eventSteps = [
            'splash_scr' => 'Splash Screen',
            'goal_scr_next_click' => 'Goal Screen Click',
            'sex_age_scr_next_click' => 'Sex Age Screen Click',
            'activity_level_click' => 'Activity Level Screen Click',
            'height_weight_next_click' => 'Height & Weight Screen Click',
            'goal_weight_next_click' => 'Goal Weight Screen Click',
            'review_scr_next_click' => 'Review Screen Click',
            'nutrition_scr_next_click' => 'Nutrition Screen Click',
        ];

        $iapSteps = [
            'iap_view' => 'View paywall',
            'iap_monthly_click' => 'Click monthly',
            'iap_yearly_click' => 'Click yearly',
            'iap_btn_click' => 'Click Go Premium',
            'iap_close_click' => 'Click Close Paywall',
        ];

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        // Lấy dữ liệu funnel cho onboarding và iap
        $dataOnboarding = $this->getFunnelData($eventSteps, $startDate, $endDate)['steps'];
        $dataIap = $this->getFunnelData($iapSteps, $startDate, $endDate)['steps'];

        return Inertia::render('Tracking/Funnel', [
            'dataOnboarding' => $dataOnboarding,
            'dataIap' => $dataIap,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }




    public function getFunnelData(array $eventSteps, $startDate = null, $endDate = null)
    {
        if (!$startDate || !$endDate) {
            $endDate = Carbon::now()->endOfDay();
            $startDate = Carbon::now()->subDays(6)->startOfDay();
        } else {
            $startDate = Carbon::parse($startDate)->startOfDay();
            $endDate = Carbon::parse($endDate)->endOfDay();
        }

        $steps = [];
        foreach ($eventSteps as $eventName => $stepName) {
            $count = EventTracking::where('event_name', $eventName)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->count();

            $steps[] = [
                'event_name' => $eventName,
                'name' => $stepName,
                'total_clicks' => $count,
            ];
        }

        // Tính CTR và Drop Rate
        $firstClicks = $steps[0]['total_clicks'] ?? 1;
        foreach ($steps as $i => &$step) {
            $clicks = $step['total_clicks'];

            // CTR so với bước trước
            if ($i === 0) {
                $step['ctr'] = '100.00';
            } else {
                $prevClicks = $steps[$i - 1]['total_clicks'];
                $step['ctr'] = $prevClicks > 0 ? number_format(($clicks / $prevClicks) * 100, 2) : '0.00';
            }

            // Drop rate so với bước đầu tiên
            if ($i === 0) {
                $step['drop_rate'] = '0.00';
            } else {
                $step['drop_rate'] = $firstClicks > 0 ? number_format((1 - ($clicks / $firstClicks)) * 100, 2) : '0.00';
            }
        }

        return [
            'steps' => $steps,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
        ];
    }



    public function viewTracking(Request $request)
{
    $startDate = $request->input('startDate');
    $endDate = $request->input('endDate');

    // Nếu không truyền, mặc định 7 ngày gần nhất
    $startDate = $startDate
        ? Carbon::parse($startDate)->startOfDay()
        : now()->subDays(7)->startOfDay();

    $endDate = $endDate
        ? Carbon::parse($endDate)->endOfDay()
        : now()->endOfDay();

    $eventName = $request->input('event_name');
    $device = $request->input('device');
    $country = $request->input('country');

    $query = EventTracking::query()
        ->whereBetween('created_at', [$startDate, $endDate])
        ->when(!empty($eventName) && $eventName !== 'all', fn ($q) => $q->where('event_name', $eventName))
        ->when(!empty($device) && $device !== 'all', fn ($q) => $q->where('device', $device))
        ->when(!empty($country) && $country !== 'all', fn ($q) => $q->where('country', $country));

    // Debug SQL query (bật khi cần kiểm tra)
    // dd(
    //     vsprintf(
    //         str_replace('?', "'%s'", $query->toSql()),
    //         $query->getBindings()
    //     )
    // );

    $eventNames = EventTracking::select('event_name')->distinct()->orderBy('event_name')->pluck('event_name');
    $countries = EventTracking::select('country')->distinct()->orderBy('country')->pluck('country');
    $devices = EventTracking::select('device')->distinct()->orderBy('device')->pluck('device');

    $data = $query->orderByDesc('created_at')->paginate(10)->withQueryString();

    $totalClicks = $query->count();

    return Inertia::render('Tracking/ViewTracking', [
        'data' => $data,
        'filters' => [
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'event_name' => $eventName,
            'device' => $device,
            'country' => $country,
        ],
        'eventNames' => $eventNames,
        'countries' => $countries,
        'devices' => $devices,
        'totalClicks' => $totalClicks,
    ]);
}








}
