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
        constructor(renderTo: HTMLElement) {
            super();
            renderTo.append(this.canvas);
        }

        on(type: string, lister: cact.Listener){
            this.canvas.addEventListener(type, this.dispatch.bind(this))
            super.on(type, lister)
        }
    }
}
