<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Engedélyezett frontend URL-ek
        $allowedOrigins = [
            'https://www.flexistore.hu',
            'https://admin.flexistore.hu',
        ];

        $origin = $request->headers->get('Origin');

        if (in_array($origin, $allowedOrigins)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }

        // OPTIONS preflight request kezelése
        if ($request->getMethod() === "OPTIONS") {
            return response()->json('OK', 200, $response->headers->all());
        }

        return $response;
    }
}
