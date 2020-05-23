<?php

namespace App\Http\Middleware;

use App\User;
use Closure;

class ApiAuthMiddleware
{
    public function handle($request, Closure $next){
        $user = User::getUser();
        if ($user == null) {
            return response()->json(['errors' => [], 'message' => 'Unauthorized Request', 'success' => false], 401);
        }

        return $next($request);
    }
}
