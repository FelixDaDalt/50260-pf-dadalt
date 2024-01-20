import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTitulo]'
})
export class TituloDirective {

  @Input() fontSize!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', this.fontSize || '20px');
    this.renderer.setStyle(this.el.nativeElement, 'padding-left', '15px');
  }

}
