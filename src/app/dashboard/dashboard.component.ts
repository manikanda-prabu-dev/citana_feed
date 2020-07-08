import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublishpostService } from '../services/postFeed/publishpost.service';
import { CommentService } from '../services/comments/comment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  publishPost: FormGroup;
  currentUser: any;
  posts: any = [];
  userComment: any;
  replyTextBox: boolean = false;
  userName;

  public show: boolean = false;
  constructor(
    private Title: Title,
    private cookie: CookieService,
    private Router: Router,
    private formBuilder: FormBuilder,
    private pulishpostService: PublishpostService,
    private commentService: CommentService
  ) {}
  role: any;

  ngOnInit(): void {
    if (this.cookie.check('login') == false) {
        const user = {
          role : 'guest',
          name : 'Cintana'
        };
        this.cookie.set("login" , JSON.stringify(user));
        const Login = this.cookie.get('login');
        console.log('dashboard data', JSON.parse(Login));

        this.currentUser = JSON.parse(Login);
        this.role = this.currentUser.role;
        this.userName = this.currentUser.name;

    }else{
    const Login = this.cookie.get('login');
    console.log('dashboard data', JSON.parse(Login));


    this.currentUser = JSON.parse(Login);
    this.role = this.currentUser.role;
    this.userName = this.currentUser.name;
    }

    this.publishPost = this.formBuilder.group({
      post_message: '',
    });


    this.Title.setTitle('Cintana | Dashboard');


    let loader = <HTMLElement>document.getElementById('loading');
    loader.innerHTML = `
   <div style="text-align:center">
   <img height="40" width="40" src="../../assets/images/loader.gif" alt="loader" />
   </div>
    `;
    setTimeout(() => {
      loader.hidden = true;
      this.show = true;
    }, 2000);

    this.getPosts();
  }

  login() {
    this.cookie.deleteAll();
    this.Router.navigate(['/login']);
  }

  //admin post creation
  createPost() {
    console.log('post form data', this.publishPost.value);
    const post = {
      post_message: this.publishPost.value.post_message,
      comment: [],
      user_id: this.currentUser._id,
    };
    console.log('post before data', post);

    this.pulishpostService.publishPost(post).subscribe((data) => {
      console.log('post after data', data);
      if (data.status == 'success') {
        this.publishPost.reset();

        // this.posts.push(data.data);
        this.getPosts();
      } else {
        alert('error on posting');
      }
    });
  }


//getting dashboard data
  getPosts() {
    //get posts in dashboard
    this.pulishpostService.getPublishedPosts().subscribe((posts) => {
      console.log('get post ', posts);
      this.posts = posts.data;
    });
  }


//user comment posting
  postComment(userComment, post) {
    console.log('user post', post);
    const comment_data = {
      comment_message: userComment,
      post_id: post._id,
      user_name: this.userName,
    };
    this.commentService.userComment(comment_data).subscribe((data) => {
      console.log('data after commnet', data);
      this.userComment = '';
      this.getPosts();
    });
  }

//admin replying function
  relyComment(allComments, replyComment) {
    console.log('all comment', allComments);
    console.log('replyComment', replyComment);


    allComments.forEach((singleCmmnt) => {

     if(replyComment.reply == true){
       singleCmmnt.reply = false
     }else{
       if(singleCmmnt.id == replyComment.id){
         replyComment.reply = true
       }else{
         singleCmmnt.reply = false
       }
     }
    });
  }
}
