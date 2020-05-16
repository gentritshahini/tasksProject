<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function respondWithSuccess($data = [], $message = null, $status_code = 200)
    {
        $response = [
            "data" => $data,
            "message" => $message ?? "Success",
            "status_code" => $status_code,
        ];

        return response()->json($response, $status_code);
    }

    public function respondWithError($errors = [], $message = null, $status_code = 400){
        return response()->json(['errors' => $errors, 'message' => $message ?? "An error occurred", 'success' => false], $status_code);
    }
}
