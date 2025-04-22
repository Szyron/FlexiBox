<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        // if (Auth::check() && Auth::user()->isadmin >= $role) {
        //     return $next($request);
        // }

        // return redirect('/login')->with('error', 'You do not have access to this page.');
        Log::debug('Middleware triggered');
        Log::debug('Auth check: ' . Auth::check());
        Log::debug('User: ' . json_encode(Auth::user()));
        Log::debug('Required Role: ' . $role);
        Log::debug('Actual Role: ' . (Auth::user() ? Auth::user()->isadmin : 'Not Logged In'));

      // Ellenőrzi, hogy a felhasználó be van-e jelentkezve és megfelelő jogosultságokkal rendelkezik
      if (Auth::check() && Auth::user()->isadmin >= $role) {
        return $next($request); // Ha jogosult, engedélyezze a következő lépést
    }

    // Ha a kérés JSON választ vár, akkor JSON hibaüzenetet küldünk
    if ($request->expectsJson()) {
        return response()->json([
            'error' => 'Unauthorized',
            'auth_check' => Auth::check(),
            'user' => Auth::user(),
            'required_role' => $role,
            'actual_role' => Auth::user()?->isadmin
        ], 403);
    }

    // Ha nem API kérés, akkor egyébként is JSON válasz küldünk
    return response()->json([
        'error' => 'Unauthorized'
    ], 403);
    }
}
