import { afterNextRender, Component, ElementRef, inject } from '@angular/core';
import { revealOnScroll } from '../../utils/reveal-on-scroll';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    afterNextRender(() => {
      revealOnScroll(this.host.nativeElement);
    });
  }
}
