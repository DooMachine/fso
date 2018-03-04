import { Directive, Input } from "@angular/core";

@Directive({
    selector: 'img[default]',
    host: {
      '(error)':'updateUrl()',
      '[src]':'src'
     }
  })
  export class DefaultUserImageDirective {
    @Input() src:string;
    @Input() default:string;
    defaultUserImage = 'http://192.168.1.67:7100/fimg/u/f_default/230x230.jpeg'
    updateUrl() {
      this.src = this.default || this.defaultUserImage;
    }
  }
