import { Component, inject } from '@angular/core';
import { Icon } from '../../components/icon/icon';
import { GithubService } from '../../services/github/github.service';

@Component({
  imports: [Icon],
  selector: 'app-github',
  templateUrl: './github.html',
  styleUrl: './github.scss',
})
export class Github {
  private readonly github = inject(GithubService);
  protected readonly repositories = this.github.repositories;
}
