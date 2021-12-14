<?php

	class API_Handle {
		private $conn;
		// private $dBServername = "localhost";
		// private $dBUsername = "root";
		// private $dBPassword = "";
		// private $dBName = "opinion";

		//Get Heroku ClearDB connection information
		private $cleardb_url;
		private $cleardb_server;
		private $cleardb_username;
		private $cleardb_password;
		private $cleardb_db;
		  
		function __construct(){
			$this->cleardb_url = parse_url(getenv("CLEARDB_DATABASE_URL"));
			$this->cleardb_server = $this->cleardb_url["host"];
			$this->cleardb_username = $this->cleardb_url["user"];
			$this->cleardb_password = $this->cleardb_url["pass"];
			$this->cleardb_db = substr($this->cleardb_url["path"],1);
			$this->dBConnect();
		}

		function dBConnect(){
			//connect to the database
			$this->conn = mysqli_connect($this->cleardb_server, $this->cleardb_username, $this->cleardb_password, $this->cleardb_db);
		}
		
		function fetchData() {
			$query = "SELECT * FROM post WHERE `reply_to` IS NULL ORDER BY post_date DESC";
			$queryconn = mysqli_query($this->conn, $query);
			
			$results = [];
			
			foreach($queryconn as $row) {
				$id = $row['id'];
				$replies = [];
				
				$query2 = "SELECT * FROM post WHERE `reply_to` = $id ORDER BY post_date DESC";
				$queryconn1 = mysqli_query($this->conn, $query2);
				
				foreach($queryconn1 as $reply) {
					$items = [
						"id" => $reply['id'],
						"name" => $reply['username'],
						"text" => $reply['text'],
						"post_date" => $reply['post_date'],
						"likes" => $reply['likes']
					];
					$replies[] = $items;
				}
				
				$items = [
					"id" => $row['id'],
					"name" => $row['username'],
					"title" => $row['title'],
					"text" => $row['text'],
					"image" => $row['image'],
					"post_date" => $row['post_date'],
					"likes" => $row['likes'],
					"reply_to" => $row['reply_to'],
					"reply_by" => $replies
				];
				$results[] = $items;
			}
			$file = fopen('../opinions.json', 'w');
			fwrite($file, json_encode($results));
			fclose($file);
			
			return $results;
		}
		
		function postData($data) {	
			$items = [];
			$sql = "INSERT INTO `post`(`username`,`title`,`text`)
							VALUES(?,?,?)";
			$stmt = mysqli_stmt_init($this->conn);
			$last_id = "";
			if (mysqli_stmt_prepare($stmt, $sql)) {							
				mysqli_stmt_bind_param($stmt, "sss", $data['name'], $data['title'], $data['text']);
				mysqli_stmt_execute($stmt);
				
				$last_id = mysqli_stmt_insert_id($stmt);
			}			
			else {
				// If there is an error we send the user back to the review page.
				echo "sqlerror";
				exit();
			}	

			mkdir('../images/uploads/'.$last_id);
			$file_name = $_FILES['file']['name'];
			$file_temp = $_FILES['file']['tmp_name']; 
			$store_loc = '../images/uploads/'.$last_id.'/'.$file_name;
			$get_loc = 'images/uploads/'.$last_id.'/'.$file_name;
			
			if(move_uploaded_file($file_temp, $store_loc)) {
				$query = "UPDATE `post` SET `image`= '$get_loc' WHERE id = $last_id";
				mysqli_query($this->conn, $query);	
			}
			
			$query1 = "Select * FROM `post` WHERE id = $last_id";
			$queryconn1 = mysqli_query($this->conn, $query1);
			
			$items = mysqli_fetch_assoc($queryconn1);
				
			return $items;
		}
		
		function getReplies() {
			$id = mysqli_real_escape_string($this->conn, $_GET['reply_to_id']);
			$replies = [];
			
			$query = "SELECT * FROM post WHERE `reply_to` = $id ORDER BY post_date ASC";
			$queryconn = mysqli_query($this->conn, $query);
			foreach($queryconn as $reply) {
				$items = [
					"id" => $reply['id'],
					"name" => $reply['username'],
					"text" => $reply['text'],
					"post_date" => $reply['post_date'],
					"likes" => $reply['likes'],
					"reply_to" => $reply['reply_to']
				];
				$replies[] = $items;
			}
			return $replies;
		}
		
		function comment($data) {			
			$sql = "INSERT INTO `post`(`username`,`text`, `reply_to`)
							VALUES(?,?,?)";
			$stmt = mysqli_stmt_init($this->conn);
			if (!mysqli_stmt_prepare($stmt, $sql)) {
			 // If there is an error we send the user back to the review page.
				echo "sqlerror";
				exit();
			}			
			else {
				mysqli_stmt_bind_param($stmt, "sss", $data['name'], $data['text'], $data['reply_to']);
				mysqli_stmt_execute($stmt);
				exit();
			}
			$query = "Select * FROM `post` WHERE id = mysqli_insert_id($this->conn)";
			$queryconn = mysqli_query($this->conn, $query);
			
			$result = mysqli_fetch_array($queryconn);
			
			return $result;
		}
		
		function like($in_data) {
			$p_id = $in_data['id'];
			$act = $in_data['do'];
			$results = [];
			
			if($act == 'love'){
				$query = "UPDATE `post` SET `likes` = `likes` +1 WHERE 
							`id` = $p_id;";
				$queryconn = mysqli_query($this->conn, $query);
			} 
			elseif($act == 'hate') {
				$query = "UPDATE `post` SET `likes` = `likes` -1 WHERE 
							`id` = $p_id";
				$queryconn = mysqli_query($this->conn, $query);
			}
			$query = "SELECT `likes` FROM `post` WHERE 
							`id` = $p_id";
			$queryconn = mysqli_query($this->conn, $query);
			$like = mysqli_fetch_assoc($queryconn);
			
			return $like;
		}
		
		function getLikes() {
			$id = $_GET['post_id'];
			
			$query = "SELECT `likes` FROM `post` WHERE 
							`id` = $id";
			$queryconn = mysqli_query($this->conn, $query);
			$like = mysqli_fetch_assoc($queryconn);
			
			return $like;
		}
		
		function del_Post($post) {
			$id = $post['id'];
			$query = "DELETE  FROM `post` WHERE `reply_to` = $id;";
			$queryconn = mysqli_query($this->conn, $query);
			
			$query = "DELETE  FROM `post` WHERE `id` = $id;";
			$queryconn = mysqli_query($this->conn, $query);
			$result = $queryconn;
			
			return $result;
		}
	}
	
?>