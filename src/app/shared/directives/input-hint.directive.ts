/* при активации инпута,если поле пустое, создать поле с подсказками из localstorage. при наборе искать совпадения в localstorage  */
import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[inputHint]'
})
export class InputHintDirective {

  constructor(
    private element: ElementRef,
    private render: Renderer2) { }

  @Input('selection') search: any;
  @Input('this') this: any;

  @HostListener('focus', ['$event'])
  focus(e: any) {
    if (localStorage.length !== 0) {
      this.hintView(e)
    }
  }

  @HostListener('blur', ['$event'])
  blur(e: any) {
    setTimeout(() => { this.hintHide(e) }, 300)
  }


  @HostListener('input', ['$event'])
  input(e: any) {
    if (localStorage.length !== 0) {
      this.hintView(e)
    }
  }


  hintHide(e: any) {
    let parent = this.render.parentNode(this.element.nativeElement);
    parent.querySelector('.hint') ? this.render.removeChild(parent, parent.querySelector('.hint')) : null
  }

  hintView(e: any) {
    //пустое поле
    if (!this.element.nativeElement.value) {
      this.hintHide(e)
      let parent = this.render.parentNode(this.element.nativeElement)
      let hint = this.render.createElement('div')
      this.render.setProperty(hint, 'style',
        `padding:5px;
         font-size:15px;
         background: rgb(10,138,221,0.9);
         position: absolute;
         min-width:150px;
         z-index:10;
         top:${this.element.nativeElement.offsetHeight + 10}px;
         left:0`)
      this.render.addClass(hint, 'hint')
      let keys = Object.keys(localStorage)
      for (let key of keys) {
        if (key !== 'lastView') {

          let p = this.render.createElement('p')
          this.render.setStyle(p, 'margin', '0')
          this.render.setStyle(p, 'padding', '5px')
          let val = JSON.parse(localStorage.getItem(key)!).name;
          let text = this.render.createText(val!)
          this.render.appendChild(p, text)
          this.render.appendChild(hint, p)

          this.render.listen(p, 'mouseover', () => {
            this.render.setStyle(p, 'background', 'rgb(106,154,193, 1)')
            this.render.setStyle(p, 'cursor', 'pointer')
          })

          this.render.listen(p, 'mouseout', () => {
            this.render.removeStyle(p, 'background')
          })
          this.render.listen(p, 'click', this.search.bind(this.this, val))

        }
      }
      this.render.appendChild(parent, hint)

    } else {
      this.hintHide(e)
      let parent = this.render.parentNode(this.element.nativeElement)
      let hint = this.render.createElement('div')
      this.render.setProperty(hint, 'style',
        `font-size:15px;
         background: rgb(10,138,221,0.9);
         min-width:150px;
         position: absolute;
         z-index:10;
         top:${this.element.nativeElement.offsetHeight + 10}px;
         left:0`)
      this.render.addClass(hint, 'hint')
      let keys = Object.keys(localStorage)
      for (let key of keys) {
        //если есть совпадения с localstorage
        if (key !== 'lastView'
          && JSON.parse(localStorage.getItem(key)!).name.toLowerCase().includes(this.element.nativeElement.value.toLowerCase())) {
          let p = this.render.createElement('p')
          this.render.setStyle(p, 'margin', '0')
          this.render.setStyle(p, 'padding', '5px')
          let val = JSON.parse(localStorage.getItem(key)!).name;
          let text = this.render.createText(val!)
          this.render.appendChild(p, text)
          this.render.appendChild(hint, p)
          this.render.listen(p, 'mouseover', () => {
            this.render.setStyle(p, 'background', 'rgb(106,154,193, 1)')
            this.render.setStyle(p, 'cursor', 'pointer')
          })

          this.render.listen(p, 'mouseout', () => {
            this.render.removeStyle(p, 'background')
          })
          this.render.listen(p, 'click', this.search.bind(this.this, val))

        }
      }
      this.render.appendChild(parent, hint)
    }

  }
}
