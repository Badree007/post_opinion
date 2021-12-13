<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name=viewport content="width=device-width, initial-scale=1">
	<title>Opinions</title>
	<link rel="stylesheet" href="css/styling.css">
	<link rel="icon" href="data:;base64,iVBORw0KGgo=">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
	<header id = 'head'>
		<h1>Opinion</h1>
		<button id="post_review">Post</button>
		<button id="switch_theme" class="theme"></button>
		
		<div id="myModal" class="modal">

		  <!-- Post Review content -->
		  <div class="modal-content">
			<span class="close">&times;</span>
			<h2>Post Your Mindful Thoughts</h2>
			<p id="error">* Required field!</p><br/>
			
			<form name="postForm" id="postForm" action="api/post.api" method="Post" enctype="multipart/form-data">
				<input type="text" id="name" name="name" placeholder="Your Name" /><br><br>
				<input type="text" id="title" name="title" placeholder="Title of Post" /><br><br>
				<textarea id="text" name="text" placeholder="Write your opinion....*" required></textarea><br/>
				<label for="image">Attach your image: </label>
				<input type="file"  name="file" id="file" onchange="getImage()" accept="image/*"/><br/><br/>
				<button type="submit" id="post" name="submit" disabled="disabled">Post</button>
			</form>
			
		  </div>

		</div>		
	</header>
	
	<main>
		<div id="space" class="space_before"></div>
		<h1>Top Opinions</h1>
		<div id="app">
			<!--ll the posts goes in here*/-->
			<!--<div class="posts" id="1">
				<div id="head" class="box head">
					<div class="head_cont">
						<h2>Sarkar</h2>
						<p>Sun, Oct 11 2020, 20:30</p>
					</div>
					<div class="post_del">
						<a class="del_icon" id="del_icon1" href="#">
							<i class="fa fa-trash-o" style="font-size:24px"></i>
						</a>
					</div>
				</div>
				<div id="body" class="box">
					<div class="bhead">
						<h4>New Member</h4>
						<p>Hello everyone! I'm new to this page and would love to hear your opinions and share mines.</p>
					</div>
					<div class="bimg" style="display: none;">
						<img class="image" id="image1">
					</div></div>
					<div id="like" class="box">
						<div class="btn">
							<button class="likebtn">Like</button>
							<button clas="dislikebtn">Dislike</button>
							<button class="replybtn" id="replybtn1">2 Replies</button>
						</div><div class="count">
							<p id="countLikes1">3 likes </p>
						</div>
					</div>
					<div id="foot" class="box">
						<div id="reply">
							<div id="replies1" class="reply_cont" style="display: block;">
								<div class="reply_div">
									<h5>Replies</h5>
									<p>2 replies</p>
								</div>
								<div class="replies" id="2">
									<div class="container heading">
										<div class="rhtext_container">
											<h5>Jonathan</h5>
											<p>Fri, Oct 2 2020, 19:45</p>
										</div>
										<a class="del_icon" id="del_icon2" href="#">
											<i class="fa fa-trash-o" style="font-size:24px"></i>
										</a>
									</div>
									<h6 class="container">Same here brother!</h6>
									<div class="rlikeCont">
										<p id="countLikes2">1 likes</p>
										<a href="#" class="rlike">
											<i class="fa fa-thumbs-up"></i>
										</a>
										<a href="#" class="rdislike">
											<i class="fa fa-thumbs-down"></i>
										</a>
									</div>
								</div>
								<div class="replies" id="5">
									<div class="container heading">
										<div class="rhtext_container">
											<h5>Anoynomous</h5>
											<p>Sat, Jul 24 2021, 20:46</p>
										</div>
										<a class="del_icon" id="del_icon5" href="#">
											<i class="fa fa-trash-o" style="font-size:24px"></i>
										</a>
									</div>
									<h6 class="container">You are great bro</h6>
									<div class="rlikeCont">
										<p id="countLikes5">0 likes</p>
										<a href="#" class="rlike">
											<i class="fa fa-thumbs-up"></i>
										</a>
										<a href="#" class="rdislike">
											<i class="fa fa-thumbs-down"></i>
										</a>
									</div>
								</div>
							</div>
							<div class="comment">
								<div class="input_field">
									<input type="text" class="commentor" id="name1" placeholder="Your Name...">
									<textarea placeholder="Write your reply..." class="cmt_text" id="cmt_text1"></textarea>
								</div>
								<a id="cmtlink1" href="#">
									<i class="material-icons"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>-->
		</div>
	</main>
	
	<footer>
		<div id="footer">
			<p><small>Copyright &copy 2020 <a href="mailto:badreedahal1@gmail.com">Badree Dahal</a>. All Rights Reserved.</small></p>
		</div>
	</footer>
	
	<script src="scripts/scripts.js">			
	</script>

</body>
</html>