import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: { title: string, content: string }[] = [];

  onPostAdded(post: any) {
    this.storedPosts.push(post);
    console.dir(this.storedPosts)
  }
}
