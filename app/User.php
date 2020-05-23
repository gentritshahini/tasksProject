<?php

namespace App;

use App\Model\Tasks;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function tasks(){
        return $this->hasMany(Tasks::class);
    }

    private static $user;
    public static function getUser() {

        if (Auth::user()) {
            return Auth::user();
        }

        if (User::$user) {
            return User::$user;
        }

        try {
            $user = request()->user('api');
            User::$user = $user;
            return $user;
        }catch (\Exception $exception) {
            return null;
        }
    }
}
