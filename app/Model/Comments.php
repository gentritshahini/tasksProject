<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $fillable = [
        'task_id', 'comment'
    ];

    public function task(){
        return $this->belongsTo(Tasks::class, 'id', 'task_id');
    }
}
