<?php

namespace App\Model;

use App\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = [
        'title', 'user_id', 'description', 'finished'
    ];

    protected $appends = [
        'formated_date'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function comments(){
        return $this->hasMany(Comments::class, 'task_id');
    }

    public function getFormatedDateAttribute(){
        return Carbon::parse($this->attributes['created_at'])->isoFormat('MMMM Do YYYY, hh:mm a');
    }
}
