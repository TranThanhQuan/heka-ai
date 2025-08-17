# AB Testing - Full Laravel Implementation

## 1. Routes (routes/web.php)

```php
use App\Http\Controllers\AbTestEventController;
use App\Http\Controllers\GetPremiumController;

Route::middleware(['ab.testing'])->group(function () {
    Route::get('/get-premium', [GetPremiumController::class, 'index']);
    Route::get('/ga-get-premium', [GetPremiumController::class, 'index']);
    Route::get('/tt-get-premium', [GetPremiumController::class, 'index']);
});

Route::post('/api/ab-event', [AbTestEventController::class, 'store']);
```

---

## 2. Middleware (app/Http/Middleware/AbTestingMiddleware.php)

```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\AbTesting;
use App\Models\AbTestVariant;

class AbTestingMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $test = AbTesting::where('is_active', true)->latest()->first();
        if ($test) {
            $sessionKey = 'ab_test_' . $test->id;
            if (!session()->has($sessionKey)) {
                $variant = AbTestVariant::where('ab_testing_id', $test->id)->inRandomOrder()->first();
                session()->put($sessionKey, $variant->name);
            }
        }
        return $next($request);
    }
}
```

---

## 3. Controller: Giao diện (app/Http/Controllers/GetPremiumController.php)

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class GetPremiumController extends Controller
{
    public function index(Request $request)
    {
        $testId = optional(\App\Models\AbTesting::where('is_active', true)->first())->id;
        $variant = session('ab_test_' . $testId, 'A');

        return inertia('Premium/Index', [
            'variant' => $variant,
            'source' => $request->path()
        ]);
    }
}
```

---

## 4. Controller: Event tracking (app/Http/Controllers/AbTestEventController.php)

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AbTesting;
use App\Models\AbTestVariant;
use App\Models\AbTestEvent;

class AbTestEventController extends Controller
{
    public function store(Request $request)
    {
        $sessionId = session()->getId();
        $userId = auth()->id();
        $test = AbTesting::where('is_active', true)->latest()->first();
        if (!$test) return response()->noContent();

        $variant = AbTestVariant::where('ab_testing_id', $test->id)
            ->where('name', session('ab_test_' . $test->id))
            ->first();

        AbTestEvent::create([
            'ab_testing_id' => $test->id,
            'variant_id'    => $variant->id,
            'user_id'       => $userId,
            'session_id'    => $sessionId,
            'event_name'    => $request->event_name,
            'event_data'    => $request->event_data,
            'url'           => $request->url,
            'ip_address'    => $request->ip(),
            'user_agent'    => $request->userAgent(),
        ]);

        return response()->json(['ok' => true]);
    }
}
```

---

## 5. Model (app/Models)

```php
// AbTesting.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AbTesting extends Model
{
    protected $fillable = ['version', 'description', 'is_active'];
}

// AbTestVariant.php
class AbTestVariant extends Model
{
    protected $fillable = ['ab_testing_id', 'name'];
}

// AbTestEvent.php
class AbTestEvent extends Model
{
    protected $fillable = [
        'ab_testing_id', 'variant_id', 'user_id',
        'session_id', 'event_name', 'event_data',
        'url', 'ip_address', 'user_agent'
    ];
    protected $casts = [
        'event_data' => 'array'
    ];
}
```

---

## 6. Vue UI (resources/js/Pages/Premium/Index.vue)

```vue
<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { usePage } from '@inertiajs/vue3'

const { props } = usePage()

onMounted(() => {
  axios.post('/api/ab-event', {
    event_name: 'view_page',
    url: window.location.pathname,
    event_data: { variant: props.variant, source: props.source }
  })
})
</script>

<template>
  <div>
    <component :is="'Premium' + props.variant" />
  </div>
</template>
```

---

## 7. Kết luận

Hệ thống trên cho phép:
- Gán phiên bản A/B tự động theo session
- Giao diện Vue nhận props hiển thị giao diện tương ứng
- Gửi sự kiện tracking về server qua API
- Có thể mở rộng thêm các phiên bản hoặc loại sự kiện khác

