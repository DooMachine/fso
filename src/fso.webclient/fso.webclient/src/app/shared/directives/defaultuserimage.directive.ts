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
    defaultUserImage = '/assets/default.png'
    updateUrl() {
      this.src = this.default || this.defaultUserImage;
    }
  }
