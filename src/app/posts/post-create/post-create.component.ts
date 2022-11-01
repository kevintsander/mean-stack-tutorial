import { Component, OnInit } from '@angular/core';
import { NgForm, SelectMultipleControlValueAccessor } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post: Post = {} as Post;
  isLoading: boolean = false;
  private mode: string = 'create';
  private postId: string | null;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';

        this.postId = paramMap.get('postId') as string;
        this.isLoading = true;

        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = { id: postData._id, title: postData.title, content: postData.content };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content)
    } else {
      if (this.postId) this.postsService.updatePost(this.postId, form.value.title, form.value.content)
    }
    form.resetForm();
  }
}
