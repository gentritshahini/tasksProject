<?php

namespace App\Model;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $fillable = [
        'task_id', 'comment'
    ];

    protected $appends = [
        'formated_date'
    ];

    public function task(){
        return $this->belongsTo(Tasks::class, 'id', 'task_id');
    }

    public function getFormatedDateAttribute(){
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }
}
