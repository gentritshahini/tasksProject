<?php

namespace App\Http\Controllers\API\Tasks;

use App\Http\Controllers\Controller;
use App\Model\Tasks;
use App\User;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function all() {
        $tasks = Tasks::where('user_id', User::getUser()->id )->orderBy('id')->with('comments')->get();

        return $this->respondWithSuccess($tasks);
    }

    public function store() {
        $params = [
            'title'         => 'New task',
            'description'   => null,
            'finished'      => false
        ];

        $params['user_id']= User::getUser()->id;
        $task = Tasks::create($params);

        return $this->respondWithSuccess($task);
    }

    public function destroy(Request $request){
        $id = $request->get('id');
        $user = User::getUser();
        $task = Tasks::where('user_id', $user->id)->find($id);
        if (!$task) {
            return $this->respondWithError([], 'Task does not exist', 404);
        }
        $task->delete();

        return $this->respondWithSuccess();
    }

    public function update(Request $request) {
        $params['id'] = $request->get('id');
        $params['user_id']= User::getUser()->id;

        $task = Tasks::where('user_id', $params['user_id'])->find($params['id']);
        if (!$task) {
            return $this->respondWithError([], 'Task does not exist', 404);
        }

        if ($request->get('title')) {
            $params['title'] = $request->get('title');
        } else if ($request->get('description')) {
            $params['description'] = $request->get('description');
        } else {
            $params['finished'] = $request->get('finished');
        }

        $task->update($params);

        return $this->respondWithSuccess($params);
    }
}
