<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventTracking extends Model
{
    protected $fillable = [
        'event_name',
        'data',
        'device',
        'ip_address',
        'country',
        'path',
        'from',
    ];

    protected $casts = [
        'data' => 'array',
    ];
}
