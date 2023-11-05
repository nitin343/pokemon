import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyLoadImage]'
})
export class LazyLoadImageDirective {
  @Input() appLazyLoadImage: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.isElementInViewport()) {
      this.loadImage();
    }
  }

  private isElementInViewport() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  private loadImage() {
    const img = new Image();
    img.src = this.appLazyLoadImage;

    img.onload = () => {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.appLazyLoadImage);
    };
  }
}
