<?php

namespace App\Http\Controllers\API\Tasks;

use App\Http\Controllers\Controller;
use App\Model\Comments;
use App\Model\Tasks;
use App\User;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function store(Request $request) {
        $params['task_id'] = $request->get('task_id');
        $userId= User::getUser()->id;

        $task = Tasks::where('user_id', $userId)->find($params['task_id']);
        if (!$task) {
            return $this->respondWithError([], 'Task does not exist', 404);
        }

        $params['comment'] = $request->get('comment');

        $comment = Comments::create($params);

        return $this->respondWithSuccess($comment);
    }

    public function destroy(Request $request){
        $id = $request->get('id');
        $user = User::getUser();

        $comment = Comments::find($id);
        if (!$comment) {
            return $this->respondWithError([], 'Comment does not exist', 404);
        }
        $task = Tasks::where('user_id', $user->id)->find($comment->task_id);
        if (!$task) {
            return $this->respondWithError([], 'Task does not exist', 404);
        }
        $comment->delete();

        return $this->respondWithSuccess();
    }
}
