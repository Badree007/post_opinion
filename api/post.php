<?php
	header("Content-Type: application/json");
	include('api.php');
	
	$method = $_SERVER['REQUEST_METHOD'];
	$funct = new API_Handle();
	
	$data = '';

	if($method === 'GET') {
		if(isset($_GET['action'])){
			if($_GET['action'] == 'fetchData'){
				$data = $funct->fetchData();
			}
		}
		if(isset($_GET['reply_to_id'])){
			if($_GET['reply_to_id'] != ''){
				$data = $funct->getReplies();
			}
		}	
		if(isset($_GET['post_id'])){
			if($_GET['post_id'] != ''){
				$data = $funct->getLikes();
			}
		}
	}

	if($method === 'POST') {
		$obj_data = json_decode(file_get_contents("php://input"), true);
		
		$formData = [];

		if(isset($_FILES['file'])) {
			$formData['name'] = $_POST['name'];
			$formData['title'] = $_POST['title'];
			$formData['text'] = $_POST['text'];
			$formData['image'] = $_FILES['file'];

			$data = $funct->postData($formData);

		} else {
			if($obj_data['action'] == 'like'){
				$data = $funct->like($obj_data);
			}
			elseif($obj_data['action'] == 'comment'){
				$data = $funct->comment($obj_data);
			}
			elseif($obj_data['action'] == 'delete') {
				$data = $funct->del_Post($obj_data);
			}
		}
	}
	
	echo json_encode($data);
	
?>

	