	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
		
	var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	
	window.onload = function() {
		getData();
		post_modal();
		darkTheme();
	};
	
	window.addEventListener('scroll', function () {
		var header = document.getElementById('head');
		var space_div = document.getElementById('space');
		header.classList.toggle('stick', window.scrollY > 1);
		space_div.classList.remove('space_before', window.scrollY > 1);
		space_div.classList.toggle('space_after', window.scrollY > 1);
	});

	function darkTheme() {
		var dark_btn = document.getElementById('switch_theme');

		dark_btn.addEventListener('click', function() {
			dark_btn.classList.toggle('colorCng');

			var header = document.getElementById('head');
			var body = document.querySelector('body');
			var posts = document.getElementsByClassName('posts');

			console.log(posts);
			header.classList.toggle('dark');
			body.classList.toggle('darkBody');

			for(i=0; i<posts.length; i++) {
				post = posts[i];
				post.classList.toggle('darkPost');
			}
		});
	}
	
	function post_modal() {
		var modal = document.getElementById("myModal");
		var btn = document.getElementById("post_review");
		var span = document.getElementsByClassName("close")[0];
		
		// open the modal
		btn.onclick = function() {
			modal.style.display = "block";
			modal.style.display = "flex";
			modal.style.justifyContent = "space-evenly";
			modal.style.alignItems = "baseline";
			
			newPost();
		}
		/* let reply = document.getElementsByTagName('reply_to');
		for(i = 0; i < reply.length; i++) {
			reply[i].onclick = function(e) {
				if(e.ctrlKey) {
					this.checked = false;
				}
			}
		} */
		
		// close the modal
		span.onclick = function() {
			modal.style.display="none" ;
		}
		
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display="none" ;
			}
		}
	}
	
	function getImage() {
		var img = document.getElementById("file");
		var img_path = img.value;
		var img_name = "";
		console.log(img_path);
		console.log(img.files.length);
		if ('files' in img){
			for(var i=0; i<img.files.length; i++) {
				var file = img.files[i];
				if ('name' in file) {
					img_name = file.name;
					console.log(img_name);
				}
			}
		}
		let imageData = {
			"image_name": img_name,
			"image_path": img_path
		};
		return imageData;
	}
	
	function newPost() {
		var modal = document.getElementById("myModal");
		var errmsg= document.getElementById("error");
		var postbtn = document.getElementById("post");
		var txt = document.getElementById("text");
		var post_form = document.getElementById("postForm");
			
		txt.onkeyup = function() {
			if(txt.value !='' ) {
				errmsg.style.display="none" ;
				postbtn.disabled = false;
			} else {
				errmsg.style.display="block" ;
				postbtn.disabled = true;
			}
		};
			
		postbtn.addEventListener('click', function(event) {
			event.preventDefault();
			
			const formData = new FormData(post_form);

			modal.style.display = "none";				
			let xhr = new XMLHttpRequest();
			xhr.open("POST", 'api/post.php', true);
		
			xhr.onload = function() {
				post_form.reset();
				if (xhr.status === 200) {
					getData();
				} else if (xhr.status !== 200) {
					alert('Request failed.  Returned status of ' + xhr.status);
				}
			};

			xhr.send(formData);	
		}); 
			
	}
	
	function createElements(item) {
		let post = document.createElement('div');
		let head = document.createElement('div');
		let body = document.createElement('div');
		let foot = document.createElement('div');
		let like = document.createElement('div');
		let reply = document.createElement('div');
		
		post.setAttribute("class", "posts");
		post.setAttribute("id", item.id);
		head.setAttribute("id", "head");
		head.setAttribute("class", "box head");
		body.setAttribute("id", "body");
		body.setAttribute("class", "box");
		foot.setAttribute("id", "foot");
		foot.setAttribute("class", "box");
		like.setAttribute("id", "like");
		like.setAttribute("class", "box");
		reply.setAttribute("id", "reply");
		
		app.appendChild(post);
		post.appendChild(head);
		post.appendChild(body);
		post.appendChild(like);
		post.appendChild(foot);
		foot.appendChild(reply);
		
		let head_cont = document.createElement('div');
		head_cont.setAttribute('class', "head_cont");
		let del_cont = document.createElement('div');
		del_cont.setAttribute('class', "post_del");
		let uname = document.createElement('h2');
		let pdate = document.createElement('p');
		
		let del_post = document.createElement('a');
		del_post.setAttribute('class', "del_icon");
		del_post.setAttribute('id', "del_icon"+item.id);
		del_post.href = "#";
		del_post.innerHTML = "<i class='fa fa-trash-o' style='font-size:24px'></i>";
		
		del_post.onclick = function(ev) {
			ev.preventDefault(); 
			deletePost(item.id);
		}
		
		head.appendChild(head_cont);
		head.appendChild(del_cont);
		head_cont.appendChild(uname);
		head_cont.appendChild(pdate);
		del_cont.appendChild(del_post);
		
		if(item.name == "") {
			uname.textContent = "Anoynomous";
		} else {
			uname.textContent = item.name;
		}
		
		let date = new Date(item.post_date);

		let day = days[date.getDay()];
		let dd = date.getDate();
		let mm = months[date.getMonth()];
		let yyyy = date.getFullYear();
		let hh = date.getHours();
		let mi = date.getMinutes();

		if(dd<10) dd='0'+dd;
		if(mm<10) mm='0'+mm;
		if(hh<10) hh='0'+hh;
		if(mi<10) mi='0'+mi;

		let date_formate = day + ", " + mm + " " + dd + " " + yyyy + ", " + hh + ":" + mi;
		
		var today = new Date();

		if(dd == today.getDate() && mm == months[today.getMonth()] && yyyy == today.getFullYear() ) {
			pdate.textContent = "Today, " + hh + ":" + mi;
		} 
		else if(yyyy == today.getFullYear()) {
			pdate.textContent = day + ", " + dd + " " + mm + ", " + hh + ":" + mi;
		}		
		else {
			pdate.textContent = date_formate;
		}
		
		let body_head = document.createElement('div');
		let body_img = document.createElement('div');
		
		body_head.setAttribute("class", "bhead");
		body_img.setAttribute("class", "bimg");
		
		let title = document.createElement('h4');
		let data = document.createElement('p');
		title.textContent = item.title;
		data.textContent = item.text;
		
		let img = document.createElement("IMG");
		img.setAttribute("class", "image");
		img.setAttribute("id", "image"+item.id);
		
		if(item.image == null) {
			body_img.style.display = "none";
		}
		else {
			img.setAttribute("src", item.image);
			img.setAttribute("alt", "Content Image");
		}
		
		body_head.appendChild(title);
		body_head.appendChild(data);
		body_img.appendChild(img);
		body.appendChild(body_head);
		body.appendChild(body_img);
		
		
		let likebtn = document.createElement("BUTTON");
		likebtn.innerHTML = "Like";
		likebtn.setAttribute("class", "likebtn");
		
		likebtn.addEventListener('click', function()  {
			addLike(item);
		});
		
		let dislikebtn = document.createElement("BUTTON");
		dislikebtn.innerHTML = "Dislike";
		dislikebtn.setAttribute("clas", "dislikebtn");
		
		dislikebtn.addEventListener('click', function() {
			dislike(item);
		});
		
		let replybtn = document.createElement("BUTTON");
		replybtn.innerHTML = item.reply_by.length + " Replies";
		replybtn.setAttribute("class", "replybtn");
		replybtn.setAttribute("id", "replybtn"+item.id);
		
		let count = document.createElement("div");
		count.setAttribute("class", "count");
		
		let buttons = document.createElement("div");
		buttons.setAttribute("class", "btn");
		
		let likes = document.createElement("p");
		likes.setAttribute("id", "countLikes"+item.id);
		likes.textContent = item.likes + " likes " ;
		
		count.appendChild(likes);
		buttons.appendChild(likebtn);
		buttons.appendChild(dislikebtn);
		buttons.appendChild(replybtn);
		like.appendChild(buttons);
		like.appendChild(count);
		
		let replies = document.createElement("div");
		replies.setAttribute("id", "replies"+item.id);
		replies.setAttribute("class", "reply_cont");
		replies.style.display = "none" ;
		
		reply.appendChild(replies);
		
		replybtn.addEventListener("click", function() {
			getReplies(item);
		});	
		
		let comment = document.createElement("div");
		comment.setAttribute("class", "comment");
		
		reply.appendChild(comment);
		
		let input_field = document.createElement("div");
		input_field.setAttribute('class', "input_field");
		
		let input_name = document.createElement("INPUT");
		input_name.setAttribute("type", "text");
		input_name.setAttribute("class", "commentor");
		input_name.setAttribute("id", "name"+item.id);
		input_name.placeholder = "Your Name...";
		
		let cmtBox = document.createElement("TEXTAREA");
		cmtBox.placeholder = "Write your reply...";
		cmtBox.setAttribute("class", "cmt_text");
		cmtBox.setAttribute("id", "cmt_text"+item.id);
		
		let cmt = document.createElement("a");
		cmt.setAttribute('id', 'cmtlink'+item.id);
		cmt.href = "#";
		cmt.disabled = "disabled";
		cmt.innerHTML = '<i class="material-icons">&#xe163;</i>';
		cmt.onclick = function(ev) {
			ev.preventDefault();
			addComment(item);
		}
		input_field.appendChild(input_name);
		input_field.appendChild(cmtBox);
		comment.appendChild(input_field);
		comment.appendChild(cmt);
	}		
	
	function getData() {	
		var app = document.querySelector('#app');
		app.textContent = '';
		const api_root = 'api/post.php?action=fetchData';
			
		let xhr = new XMLHttpRequest();
		xhr.open("GET", api_root, true);
		xhr.setRequestHeader("Content-Type", "application/json");
			
		xhr.addEventListener("load", function() {
			let items = JSON.parse(xhr.responseText);
				
			for(let i=0; i<items.length; i++) {
				let item = items[i];
					
				createElements(item);
			} 	
		});
			
		xhr.send(); 
	}
	
	function getLike(like) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", 'api/post.php?post_id='+like.id, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.addEventListener('load', function() {
			let new_like = JSON.parse(xhr.responseText);
			document.getElementById('countLikes'+like.id).innerHTML = new_like.likes + " likes";
		});
		xhr.send();
	}
		
	function addLike(x) {
		let addLike = {
			"action": "like",
			"id": x.id,
			"do": "love"
		};	
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", 'api/post.php', true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function() {
			getLike(x);
		}
		xhr.send(JSON.stringify(addLike));
	} 
	
	function dislike(x) {
		let addLike = {
			"action": "like",
			"id": x.id,
			"do": "hate"
		};
		let xhr = new XMLHttpRequest();
		xhr.open("POST", 'api/post.php', true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function() {
			getLike(x);
		}
		xhr.send(JSON.stringify(addLike));
	}
	
	function getReplies(item) {
		let div = document.getElementById('replies'+item.id);
			
		if (div.style.display === "none") {
			div.style.display = "block";
			showReplies(item.id);		
		} else {
			div.style.display = "none";
		}
	}
	
	function showReplies(id) {
		let div = document.getElementById('replies'+id);
		var reply_div = document.querySelector("#replies"+id);
		reply_div.textContent = '';
		
		let replybtn_count = document.getElementById('replybtn'+id);
			
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "api/post.php?reply_to_id="+id, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function() {
			if (xhr.status === 200) {
				let reply_items = JSON.parse(xhr.responseText);
				
				replybtn_count.innerHTML = reply_items.length + " Replies";
					
				let reply_heading = document.createElement("h5");
				let reply_text_cont = document.createElement('div');
				reply_text_cont.setAttribute('class', "reply_div");
				
				div.appendChild(reply_text_cont);
				reply_text_cont.appendChild(reply_heading);
				
				if(reply_items.length > 0) {					
					reply_heading.textContent = "Replies";
					let reply_count = document.createElement("p");
					reply_count.textContent = reply_items.length + " replies";
					reply_text_cont.appendChild(reply_count);				
				} else {
					reply_heading.textContent = "No Replies";
				}
					
				for(let x=0; x<reply_items.length; x++) {
					let row = reply_items[x];
					
					let box = document.createElement('div');
					box.setAttribute("class" , "replies" );
					box.setAttribute("id" , row.id);

					let heading = document.createElement('div');
					heading.setAttribute('class', 'container heading');
					
					let reply_headtext = document.createElement('div');
					reply_headtext.setAttribute('class', 'rhtext_container');
					let reply_name = document.createElement('h5');
					let reply_pdate = document.createElement('p');
					
					let rdel_post = document.createElement('a');
					rdel_post.setAttribute('class', "del_icon");
					rdel_post.setAttribute('id', "del_icon"+row.id);
					rdel_post.href = "#";
					rdel_post.innerHTML = "<i class='fa fa-trash-o' style='font-size:24px'></i>";
					
					rdel_post.onclick = function(ev) {
						ev.preventDefault();
						deletePost(row);
					}
					
					let reply_text = document.createElement('h6');
					reply_text.setAttribute('class', 'container');
						
					let r_like = document.createElement('div');
					r_like.setAttribute("class" , "rlikeCont" );
						
					let reply_like = document.createElement('p');
					reply_like.setAttribute('id', "countLikes"+row.id);
					let lkbtn = document.createElement('a');
					let dlkbtn = document.createElement('a');
						
					let rdate = new Date(row.post_date);
					let date_formate = days[rdate.getDay()] + ", " + months[rdate.getMonth()]
					+ " " + rdate.getDate() + " " + rdate.getFullYear() + ", " +
					rdate.getHours() + ":" + rdate.getMinutes();
						
					reply_name.textContent = row.name;
					reply_pdate.innerHTML = date_formate;
					reply_text.textContent = row.text;
					reply_like.textContent = row.likes + " likes" ;
						
					lkbtn.href="#" ;
					lkbtn.innerHTML='<i class="fa fa-thumbs-up"></i>' ;
					lkbtn.setAttribute("class" , "rlike" );
						
					lkbtn.onclick = function(ev) {
						ev.preventDefault();
						addLike(row);
					}
						
					dlkbtn.href="#" ;
					dlkbtn.innerHTML='<i class="fa fa-thumbs-down"></i>' ;
					dlkbtn.setAttribute("class" , "rdislike" );
						
					dlkbtn.onclick = function(ev) {
						ev.preventDefault();
						dislike(row);
					}
						
					r_like.appendChild(reply_like);
					r_like.appendChild(lkbtn);
					r_like.appendChild(dlkbtn);
					reply_headtext.appendChild(reply_name);
					reply_headtext.appendChild(reply_pdate);
					heading.appendChild(reply_headtext);
					heading.appendChild(rdel_post);
					box.appendChild(heading);
					box.appendChild(reply_text);
					box.appendChild(r_like);
					div.appendChild(box);
				}
			}else if (xhr.status !== 200) {
				alert('Request failed.  Returned status of ' + xhr.status);
			}
		};
		xhr.send();
	}
	
	function addComment(item) {
		var aft_name = '';
		var rpy_name = document.getElementById('name'+item.id);
		var rpy_text = document.getElementById('cmt_text'+item.id);
		
		if(rpy_name.value ==''){
			aft_name = 'Anoynomous';
		}
		else if(rpy_name.value !=''){
			aft_name = rpy_name.value;
		}
		var aft_text = rpy_text.value;
		if (rpy_text.value == '') {
			//console.log("enter");
			rpy_text.placeholder = "Write some reply!!!"
			rpy_text.style.borderColor = "red";
		}
		else {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", 'api/post.php', true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onload = function() {
				if (xhr.status === 200) {
					rpy_name.value = '';
					rpy_text.value = '';
					let reply_div = document.getElementById('replies'+item.id);
						
					if (reply_div.style.display === "none") {
						reply_div.style.display = "block";
						showReplies(item.id);
					}
					else {
						showReplies(item.id);
					}
				} else if (xhr.status !== 200) {
					alert('Request failed.  Returned status of ' + xhr.status);
				}
			};
			let newItem = {
				"action":'comment',
				"name": aft_name,
				"text": aft_text,
				"reply_to": item.id
			};
			xhr.send(JSON.stringify(newItem));
		}
	}
	
	function deletePost(post_id) {
		var del = confirm("Are you sure you want to delete this post?");
		var post = document.getElementById(post_id);
		console.log(post);
		
		if(del == true) {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", 'api/post.php', true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onload = function() {
				if (xhr.status === 200) {
					if (post.reply_to == null) {
						post.remove();
					} else {
						showReplies(post.reply_to);
					}
				} else if (xhr.status !== 200) {
					alert('Request failed.  Returned status of ' + xhr.status);
				}
			};
			let newItem = {
				"action": 'delete',
				"id": post_id
			};
			xhr.send(JSON.stringify(newItem)); 
		}
	}