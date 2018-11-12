/// <reference path="./DisplayObject.ts"/>
namespace cact {
    const events = [
        'clcik',
        'dblclick',
        'mouseup',
        'mousedown',
        'mousemove'
    ];

    export class Stage extends cact.DisplayObject {
        private canvas = document.createElement('canvas');
        private ctx = this.canvas.getContext('2d');
        private children: cact.Shape[] = [];
        constructor(renderTo: HTMLElement, option = {detect: true}) {
            super();
            renderTo.append(this.canvas);
            if(option.detect) {
                this.detect();
            }
        }

        detect(){
            this.canvas.addEventListener('click', this.handleClick);
            delete this.detect;
        }

        on(type: string, listener: cact.Listener){
            this.canvas.addEventListener(type, listener.bind(this))
        }

        off(type: string, listener: cact.Listener) {
            this.canvas.removeEventListener(type, listener.bind(this));
        }

        add(shape: cact.Shape){
            this.children.push(shape);
            shape.parent = this;
            shape.render(this.ctx);

        }

        handleClick = (e: MouseEvent) => {
            let obj = this.getTarget(e);
            var SynEvent = new cact.SyntheticEvent(e.type);
            if(obj) {
                obj.dispatch(SynEvent)
            }
        }

        getTarget(e: MouseEvent) {
            const children = this.children.slice(0);
            children.reverse();
            for(var i = 0; i < children.length; i++) {
                const child = children[i];
                if(this.isTouched(child, e)) {
                    return child;
                }
            }
        }

        isTouched(child: cact.Shape, e: MouseEvent){
            const {left, top} = this.canvas.getBoundingClientRect();
            const [x, y] = [e.clientX - left, e.clientY - top];
            child.path(this.ctx);
            if(this.ctx.isPointInPath(x, y)) {
                return true;
            }
            return false;
            
        }
    }
}
