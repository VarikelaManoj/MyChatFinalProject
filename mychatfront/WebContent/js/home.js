var likes=0;
var GetzChat=angular.module('GetzChat',['ngRoute','ngCookies']);
GetzChat.config(function($routeProvider)
		{
		$routeProvider.when('/register',
		{
			 templateUrl:'partials/register.html', 
			 controller:'registerController'
		})
		.when('/blogs',
				{
			templateUrl:'partials/blogs.html',
			controller:'blogController'	
				})
				.when("/jobs",
				{
					templateUrl:'partials/jobs.html',
					controller:'jobController'
				})
				
				.when("/login",
						{
					templateUrl:'partials/login.html',
					controller:'loginController'					
						})
				.when("/userHome",
						{
					templateUrl:'partials/userHome.html',
					controller:'userHomeController'					
						})
				.when("/admin",
						{
					templateUrl:'partials/admin.html',
					controller:'adminController'					
						})
					.when("/forum",
							{
						templateUrl:"partials/forum.html",
						controller:"forumController"
							})
							.when("/adminForum",
							{
						templateUrl:"partials/adminForum.html",
						controller:"adminForumController"
							})
				.when("/logout",
				{
					templateUrl:"partials/logout.html",
					controller:"logoutController"
				})
				.when("/adminJobs",
				{
					templateUrl:"partials/adminJobs.html",
					controller:"adminJobsController"
				})
				.when("/adminBlogs",
				{
					templateUrl:"partials/adminBlogs.html",
					controller:"adminBlogsController"
				})
				.when("/friendslist",
				{
					templateUrl:"partials/friendslist.html",
					controller:'friendslistController'
				})
				.when("/allBlogs",
				{
					templateUrl:"partials/allBlogs.html",
					controller:"allBlogsController"
				})
				.when("/chat",
				{
					templateUrl:"partials/chat.html",
					controller:'chatController'
				})
				/*.otherwise(
				{
					redirectTo:"/"
				})*/
				
				});
GetzChat.controller('registerController',['$scope','fileUpload',function($scope,fileUpload,$route)
{
 console.log("i'm in register");
 $scope.register=function()
{
	 	var file=$scope.myFile;
		var	username=$scope.username;
		var	password=$scope.password;
		var	dob=$scope.dob;
		var	mobileno=$scope.mobileno;
		console.log("username:"+username);
		console.log("file is");
		console.dir(file);
		var uploadUrl="http://localhost:8046/mychat/fileUpload";
		fileUpload.uploadFileToUrl(file,uploadUrl,username,password,dob,mobileno);
		console.log("link correct");
	 };
	 console.log("in reload");
	/* $scope.reloadData=function(){
		 $route.reload();
		 
	 }*/
	/*var res=$http.post("http://localhost:8046/mychat/registerUser",users); 
			res.success(function(data, status, headers, config) {
			console.log("status:"+status);
		});*/
}]);
GetzChat.run( function ($rootScope, $location,$cookieStore, $http) {

	 $rootScope.$on('$locationChangeStart', function (event, next, current) {
		 console.log("$locationChangeStart")
		 //http://localhost:8080/Collaboration/addjob
	        // redirect to login page if not logged in and trying to access a restricted page
	        var restrictedPage = $.inArray($location.path(), ['/','/search_job','/view_blog','/login', '/register','/list_blog']) === -1;
	        
	        console.log("restrictedPage:" +restrictedPage)
	        var loggedIn = $rootScope.uname;
	        
	        console.log("loggedIn:" +loggedIn)
	        
	        if(!loggedIn)
	        	{
	        	
	        	 if (restrictedPage) {
		        	  console.log("Navigating to login page:")
		        	

						            $location.path('/login');
		                }
	        	}
		 });
	 	 
	 // keep user logged in after page refresh
  $rootScope.uname = $cookieStore.get('uname') || {};
   if ($rootScope.uname) {
       $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.uname; 
   }
});

GetzChat.service('fileUpload',['$http','$location',function($http,$scope,$location)
                               {
				this.uploadFileToUrl=function(file,uploadUrl,username,password,dob,mobileno)
				{
					console.log("link correct");
				var fd=new FormData();
					fd.append('file',file);
					fd.append('username',username);
					fd.append('password',password);
					fd.append('dob',dob);
					fd.append('mobileno',mobileno);
					console.log("fd"+fd);
					$http.post(uploadUrl,fd,{
						transformRequest:angular.identity,
						headers:{'Content-Type':undefined}
					})
					.success(function()
							{
						$scope.message="u r successfully registerd ..u can login now";
						$scope.username="";
						$scope.password="";
							})
							.error(function(){
							});
		}
	
}]);

GetzChat.directive('fileModel',['$parse',function($parse) {
	return{
        	   link: function(scope, element, attrs) {
        	          var model = $parse(attrs.fileModel);
        	          var modelSetter = model.assign;
        	          
        	          element.bind('change', function(){
        	             scope.$apply(function(){
        	                modelSetter(scope, element[0].files[0]);
        	             });
        	          });
        	   }
           };
  }]);

GetzChat.controller('jobController',function($scope,$http,$rootScope)
{
	$http.get("http://localhost:8046/mychat/viewJobs")
    .then(function (response) {$scope.blogs = response.data;});
	
	$rootScope.chat=false;
	$rootScope.adminBlogs=true;
	$rootScope.adminForum=true;
	$rootScope.admin=false;
	$rootScope.forum=true;
	$rootScope.jobs=false;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	$rootScope.friendlist=true;
	$rootScope.userHome=false;
	$rootScope.viewAllJobs=true;
	$scope.newJob={};
	console.log("in job")
	$scope.jobs=function(newJob)
	{
		
		var jobs={
				jobsName:$scope.jobsName,
				jobsDescription:$scope.jobsDescription,
				jobsLocation:$scope.jobsLocation
		};
		console.log("title:"+jobs);
		var res=$http.post("http://localhost:8046/mychat/createJobs",jobs); 
		$http.get("http://localhost:8046/mychat/viewJobs").then(function (response) {$scope.jobs = response.data;});
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		console.log("status:"+status);
	});
	}
	$scope.editJob=function(jobs)
	{
		console.log("inside editjobs");
		console.log("jobs:"+jobs);
		$scope.jobDataToEdit=jobs;
	}
	$scope.saveEdit=function()
	{
		var jobs={
				jobsName:$scope.jobDataToEdit.jobsName,
				jobsDescription:$scope.jobDataToEdit.jobsDescription,
				jobsLocation:$scope.jobDataToEdit.jobsLocation
		};
		$http.put('http://localhost:8046/mychat/updateJob', jobs);
		$http.get("http://localhost:8046/mychat/viewJobs").then(function (response) {$scope.jobs = response.data;});
	}
	$scope.deletejob=function(jobDataToEdit)
	{
		console.log("delete job called");
		jobId:$scope.jobDataToEdit.jobId;
		console.log("jobId:"+jobDataToEdit.jobId);
		$http['delete']('http://localhost:8046/mychat/deleteJob/'+jobDataToEdit.jobId);
		 $http.get("http://localhost:8046/mychat/viewJobs")
	 	    .then(function (response) {$scope.jobs = response.data;});
	}
	});
GetzChat.controller("adminJobsController",function($scope,$http,$rootScope)	
		{	
	$rootScope.userjobs=true;
	$rootScope.userforum=true;
	$rootScope.adminblog=false;
	$rootScope.adminforum=false;
	$rootScope.register=false;
	$rootScope.home=false;
	$rootScope.addjobs=false;
	$rootScope.login=false;
	$rootScope.jobs=false;
	$rootScope.blogs=true;
	$rootScope.logout=true;
	
	console.log(" in userjobs controller");
	
			 $http.get("http://localhost:8046/mychat/viewJobs")
			    .then(function (response) {
			    	
			    	$scope.jobs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
		});	

GetzChat.controller('loginController',['$cookieStore','$scope','$http','$location','$rootScope',function($cookieStore,$scope,$http,$location,$rootScope)
           {
			console.log("login controller");
			$scope.login=function()
			{
				var login={
						username:$scope.username,
						password:$scope.password
						
							};
				$http.post("http://localhost:8046/mychat/authenticateUser",login).then(function (response) {
					 console.log("result data:"+response.data);
					 var r=response.data.toString();
					 console.log("response:"+r);
				     
						if(r==1)
							{
							$rootScope.blogs=true;
							$rootScope.friendslist=true;
							$rootScope.allBlogs=true;
							$rootScope.forum=true;
							$rootScope.jobs=false;
							$rootScope.adminJobs=true;
							$rootScope.adminForum=false;
							$rootScope.chat=true;
							$rootScope.login=false;
							$rootScope.register=false;
							$rootScope.services=false;
							$rootScope.about=false;
							$rootScope.home=false;
							$rootScope.logout=true;
							$rootScope.chat=true;
							$rootScope.userForum=true;
							$rootScope.userJobs=true;
							console.log('logout:'+$rootScope.logout);
							console.log("user:"+response.data);
							console.log("uname from root scope:"+$rootScope.uname);
							$rootScope.uname=$scope.username;
							$rootScope.id=$scope.id;
							console.log("uname:"+$rootScope.uname);
							$location.path('/userHome');
							}
						if(r==0)
							{
							$scope.username="";
							$scope.password="";
							$scope.message="username/password incorrect";
							$location.path('/login');
							}
						if(r==2)
						{
							$rootScope.chat=false;
							$rootScope.login=false;
							$rootScope.register=false;
							$rootScope.services=false;
							$rootScope.friendslist=false;
							$rootScope.forum=false;
							$rootScope.about=false;
							$rootScope.home=false;
							$rootScope.adminForum=true;
							$rootScope.adminBlogs=true;
							$rootScope.adminForums=true;
							$rootScope.adminJobs=false;
							$rootScope.jobs=true;
							$rootScope.uname=$scope.username;
							$rootScope.users=true;
							$rootScope.registeredUsers=true;
							$rootScope.logout=true;
							
						$location.path('/admin');
						}
				});  
			}
	}
        
    ]);

GetzChat.controller("adminController",function($scope,$http)
		{
			$scope.message="this is admin home"
		});

GetzChat.controller("forumController",function($scope,$http,$rootScope)
		{
	$http.get("http://localhost:8046/mychat/viewForums").then(function (response) {$scope.forums= response.data;});

	console.log("in forum");
	$rootScope.blogs=true;
	$rootScope.forum=false;
	$rootScope.jobs=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	
	$scope.addForum=function()
	{
		var forum={
				question_Title:$scope.question_Title,
				question_Description:$scope.question_Description,
				postedBy:$rootScope.uname
			}
		var res=$http.post("http://localhost:8046/mychat/createForum",forum); 
		$http.get("http://localhost:8046/mychat/viewForums").then(function (response) {$scope.forums = response.data;});
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		console.log("status:"+status);
	});
	}
	 $scope.forumComment=function(forum){
	    	$scope.commentForum=forum;
	    }
	    $scope.newComment={};
		console.log("In Controller");
		
	    $scope.addComment=function(newComment){
	    	 var comments=
				{
	    	 question_Id:$scope.commentForum.question_Id,
			username:$rootScope.uname,
			comment:$scope.comment
			};
	    	
			 $http.post('http://localhost:8046/mychat/addComments/',comments)
			 console.log("aaaa"+$scope.comment);
			 $http.get("http://localhost:8046/mychat/viewForums")
					    .then(function (response) {
                         $scope.forums = response.data;
					    	
					    	console.log("data:"+response.data);
					    });

	    }
	    $scope.commentslist=function(forum){
	    	$scope.commentslist=forum;
	    
	   // $scope.commentslist=function(){
	    	console.log(" in commentlist function"+$scope.commentslist.question_Id);
	    	 $http.get("http://localhost:8046/mychat/viewComment/"+$scope.commentslist.question_Id)
			    .then(function (response){

			    	$scope.commentlist = response.data;
			    	
			    	console.log("data:"+response.data);
			    	
			    });
	    }  
		});
GetzChat.controller("adminForumController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.userforum=false;
	$rootScope.home=false;
	$rootScope.userjobs=false;
	$rootScope.adminforum=true;
	
	
	console.log(" in adminforum controller");
	
			 $http.get("http://localhost:8046/mychat/viewForums")
			    .then(function (response) {
			    	
			    	$scope.forums = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
			
$scope.appdisapp=function(adminforum)
{

	console.log("inside appdisappforum");
	console.log("adminforum:"+adminforum);
	$scope.forumstatus=adminforum;
}
$scope.approveForum=function(adminforum)
{
	
	console.log("in approveforum");
	var app=
		{
			question_Id:$scope.forumstatus.question_Id,
			question_Title:$scope.forumstatus.question_Title,
			question_Description:$scope.forumstatus.question_Description,
			postedBy:$scope.forumstatus.postedBy,
			status:true
		}
	$http.put("http://localhost:8046/mychat/updateForum",app);
	 $http.get("http://localhost:8046/mychat/viewForums")
	    .then(function (response) {
	    	
	    	$scope.forums = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}
$scope.disapproveForum=function()
{
	console.log("in disapproveforum");
	var disapp=
		{
			question_Id:$scope.forumstatus.question_Id,
			question_Title:$scope.forumstatus.question_Title,
			question_Description:$scope.forumstatus.question_Description,
			postedBy:$scope.forumstatus.postedBy,
			status:false
		}
	$http.put("http://localhost:8046/mychat/updateForum",disapp);
	 $http.get("http://localhost:8046/mychat/viewForums")
	    .then(function (response) {
	    	
	    	$scope.forums = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}

		});
GetzChat.controller('logoutController',function($scope,$rootScope,$cookieStore,$http)		
		{
	$rootScope.uname=null;
	console.log("uname in cookie"+$cookieStore.get('uname'));
	$cookieStore.remove('uname');
	console.log("uname in cookie"+$cookieStore.get('uname'));
			console.log("logout controller called");
			$rootScope.login=true;
			$rootScope.register=true;
			$rootScope.services=true;
			$rootScope.about=true;
			$rootScope.home=true;
			$rootScope.allBlogs=false;
			$rootScope.blogs=false;
			$rootScope.forum=false;
			$rootScope.jobs=false;
			$rootScope.logout=false;
			$rootScope.chat=false;
			$rootScope.adminJobs=false;
			$rootScope.friendslist=false;
			$rootScope.userHome=false;
			$http.post("http://localhost:8046/mychat/logout/"+$rootScope.uname);
		
		});
GetzChat.controller("blogController",function($scope,$http,$rootScope)
		{
	$rootScope.userForums=true;
	$rootScope.userJobs=true;
	$rootScope.allBlogs=true;
	$rootScope.blogs=true;
	$rootScope.forum=true;
	$rootScope.jobs=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	console.log("blog controller");
	console.log("in userblogs");
	/*$http.get("http://localhost:8046/mychat/viewBlogs")
    .then(function (response) {$scope.blogs= response.data;});*/
	console.log("blog controller");
	console.log("name in allblogs:"+$rootScope.uname)
	$http.get("http://localhost:8046/mychat/viewUserBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs= response.data;});

/*$scope.newBlog={};
*/	console.log("in blogs");
	
	
	$scope.addBlog=function()
	{
		var blog={
				blog_Name:$scope.blog_Name,
				blog_Category:$scope.blog_Category,
				blog_Description:$scope.blog_Description,
				postedBy:$rootScope.uname
				
		}
		console.log("title:"+blog);
		var res=$http.post('http://localhost:8046/mychat/createBlogs',blog);
		$http.get("http://localhost:8046/mychat/viewUserBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs= response.data;});
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		console.log("status:"+status);
	});
	};
	
	$scope.editBlog=function(blog)
	{
		console.log("inside editblog");
		console.log("blog:"+blog);
		$scope.blogDataToEdit=blog;
	}
	$scope.saveEdit=function()
	{
		var blog={
				blog_Id:$scope.blogDataToEdit.blog_Id,
				blog_Name:$scope.blogDataToEdit.blog_Name,
				blog_Description:$scope.blogDataToEdit.blog_Description,
				blog_Category:$scope.blogDataToEdit.blog_Category
		};
		$http.put('http://localhost:8046/mychat/updateBlog',blog);
	$http.get("http://localhost:8046/mychat/viewUserBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs = response.data;});
	}
	$scope.deleteBlog=function(blogDataToEdit)
	{
		console.log("delete blog called");
		blog_Id:$scope.blogDataToEdit.blog_Id;
		console.log("blog_Id:"+blogDataToEdit.blog_Id);
		$http['delete']('http://localhost:8046/mychat/deleteBlog/'+blogDataToEdit.blog_Id);
		 $http.get("http://localhost:8046/mychat/viewUserBlogs/"+$rootScope.uname)
	 	    .then(function (response) {$scope.blogs = response.data;});
	}
	});

GetzChat.controller("adminBlogsController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.home=false;
	$rootScope.users=true;
	$rootScope.registeredUsers=true;
		console.log(" in adminblog controller");
			 $http.get("http://localhost:8046/mychat/viewBlogs")
			    .then(function (response) {
			    	
			    	$scope.blogs = response.data;
			    	console.log("data:"+response.data);
			    });
			
$scope.appdisapp=function(adminBlog)
{
	console.log("inside appdisappblog");
	console.log("adminblog:"+adminBlog);
	$scope.blogstatus=adminBlog;
}
$scope.approveBlog=function()
{
	console.log("in approveblog");
	var blogs={
			blog_Id:$scope.blogstatus.blog_Id,
			blog_Name:$scope.blogstatus.blog_Name,
			blog_Description:$scope.blogstatus.blog_Description,
			blog_Category:$scope.blogstatus.blog_Category,
			postedBy:$scope.blogstatus.postedBy,
			status:true
	};
	$http.put("http://localhost:8046/mychat/updateBlog",blogs);
	 $http.get("http://localhost:8046/mychat/viewBlogs")
	    .then(function (response) {
	    	
	    	$scope.blogs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}
$scope.disapproveBlog=function()
{
	console.log("in disapproveblog");
	var blogs={
			blog_Id:$scope.blogstatus.blog_Id,
			blog_Name:$scope.blogstatus.blog_Name,
			blog_Description:$scope.blogstatus.blog_Description,
			blog_Category:$scope.blogstatus.blog_Category,
			postedBy:$scope.blogstatus.postedBy,
			status:false
	};
	$http.put("http://localhost:8046/mychat/updateBlog",blogs);
	 $http.get("http://localhost:8046/mychat/viewBlogs")
	    .then(function (response) {
	    	
	    	$scope.blogs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}

		});		
GetzChat.controller("allBlogsController",function($scope,$http,$rootScope)
		{
	$rootScope.userforum=false;
	$rootScope.userjobs=true;
	$rootScope.adminblogs=false;
	$rootScope.adminforum=false;
	$rootScope.register=false;
	$rootScope.home=false;
	$rootScope.addjobs=false;
	$rootScope.login=false;
	$rootScope.jobs=false;
	$rootScope.blogs=true;
	$rootScope.logout=true;
	$rootScope.userForum=true;
	console.log("root scope likes:"+$rootScope.likes);
	console.log("this is viewblogs controller");
	$http.get("http://localhost:8046/mychat/viewBlogs")
    .then(function (response) {$scope.blogs = response.data;});
			$scope.message="you are in view blogs";
			$scope.likeBlog=function (userBlogs) {
				console.log("inside the like function");
				$scope.allblogslike=userBlogs;
				like=$scope.allblogslike.likes;
			     likes=likes+1;	
			     console.log("no of likes:"+likes);
			     $scope.likes=likes;
			     console.log("root scope likes:"+$scope.likes);
			     var like=
					{
			    		 blog_Id:$scope.allblogslike.blog_Id,
			 			blog_Name:$scope.allblogslike.blog_Name,
			 			blog_Description:$scope.allblogslike.blog_Description,
			 			blog_Category:$scope.allblogslike.blog_Category,
			 			postedBy:$scope.allblogslike.postedBy,
			 				status:$scope.allblogslike.status,
							likes:$scope.likes
					}
			     console.log("data in like:"+like);
					console.log("postedby:"+$rootScope.uname);
				 $http.put('http://localhost:8046/mychat/updateBlog',like);
		        console.log("scope like:"+$scope.likes);
			 $http.get("http://localhost:8046/mychat/viewBlogs")
			    .then(function (response) {$scope.blogs = response.data;});	
			}
			 $scope.blogComment=function(userBlogs){
			    	$scope.commentblog=userBlogs;
			    }
			    $scope.newComment={};
				console.log("In Controller");
				
			    $scope.addComment=function(newComment){
			    	 var comments=
						{
					blog_Id:$scope.commentblog.blog_Id,
					username:$rootScope.uname,
					comment:$scope.comment
					};
			    	
					 $http.post('http://localhost:8046/mychat/addComments/',comments)
					 console.log("aaaa"+$scope.comment);
					 $http.get("http://localhost:8046/mychat/viewBlogs")
							    .then(function (response) {
		                            $scope.userBlogs = response.data;
							    	
							    	console.log("data:"+response.data);
							    });

			    }
			    $scope.commentslist=function(userBlogs){
			    	$scope.commentslist=userBlogs;
			    
			   // $scope.commentslist=function(){
			    	console.log(" in commentlist function"+$scope.commentslist.blog_Id);
			    	 $http.get("http://localhost:8046/mychat/viewComments/"+$scope.commentslist.blog_Id)
					    .then(function (response){

					    	$scope.commentlist = response.data;
					    	
					    	console.log("data:"+response.data);
					    	
					    });
			    }  
			 
			
		});
	
GetzChat.controller("userHomeController",function($scope,$http,$rootScope)	
		{	
	console.log("in userHome controller");
	$scope.findfriends=function()
	{
	console.log(" in findfriends function");
	console.log("name in  findfriends:"+$rootScope.uname);
			 $http.get("http://localhost:8046/mychat/findFriends/"+$rootScope.uname)
			    .then(function (response) {
			    	
			    	$scope.friends = response.data;
			    	
			    	console.log("data:"+response.data);
			    
			    });
			 }
	
		$scope.makeFriend=function(user)
		{
			console.log("in add friend");
			$scope.friend=user;
			console.log("friendname:"+$scope.friend.username);
			console.log("username:"+$rootScope.uname);
			var friend={
					username:$rootScope.uname,
					friend_Name:$scope.friend.username
			}
			$http.post("http://localhost:8046/mychat/makeFriend/",friend);

		}
		
		$scope.listFriends=function()
		{
		console.log(" in friendslist function");
		console.log("name in  friendslist:"+$rootScope.uname);
				 $http.get("http://localhost:8046/mychat/seeFriends/"+$rootScope.uname)
				    .then(function (response) {
				    	
				    	$scope.listfriends = response.data;
				    	
				    	//console.log("data:"+response.data);
				    
				    });
				 }
	
	
		});
GetzChat.service("ChatService", function($q, $timeout) {
    console.log("in chat service");
    var service = {}, listener = $q.defer(), socket = {
      client: null,
      stomp: null
    }, messageIds = [];
    
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/mychat/chat";
    service.CHAT_TOPIC = "/topic/message";
    service.CHAT_BROKER = "/app/chat";
    
    service.receive = function() {
      return listener.promise;
    };
    
    service.send = function(message) {
    	console.log("in send function");
      var id = Math.floor(Math.random() * 1000000);
      socket.stomp.send(service.CHAT_BROKER, {
        priority: 9
      }, JSON.stringify({
        message: message,
        id: id
      }));
      messageIds.push(id);
    };
    
    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };
    
    var getMessage = function(data) {
      var message = JSON.parse(data), out = {};
      out.message = message.message;
      out.username = message.username;
      out.time = new Date(message.time);
      if (_.contains(messageIds, message.id)) {
        out.self = true;
        messageIds = _.remove(messageIds, message.id);
      }
      return out;
    };
    
    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
        listener.notify(getMessage(data.body));
      });
    };
    
    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      socket.stomp.connect({}, startListener);
      socket.stomp.onclose = reconnect;
    };
    
    initialize();
    return service;
  });
GetzChat.controller("chatController",function($scope,$http,ChatService)
		{
	console.log("in chat  controller");
	$scope.messages = [];
	  $scope.message = "";
	  $scope.max = 140;
	  
	  $scope.addMessage = function() {
		  console.log("in addmessage fn");
	    ChatService.send($scope.message);
	    $scope.message = "";
	  };
	  console.log("in getmessage fn");
	  ChatService.receive
	  ().then(null, null, function(message) {
		  console.log("inside recieeve:"+message);
		  console.log("inside recieeve:"+$scope.message);
	    $scope.messages.push(message);
	  });
	});
	
GetzChat.controller("friendslistController",function($scope,$http,$rootScope)	
		{	
	console.log("in friendslist controller");
	
	console.log("name in  friendslist:"+$rootScope.uname);
			 
			 $http.get("http://localhost:8046/mychat/seeFriends/"+$rootScope.uname).then(function (response) {
			    	
			    	$scope.friendslist = response.data;
			    	
			    	console.log("data:"+response.data);
			    
			    });
		});
