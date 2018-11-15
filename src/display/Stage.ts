import DisplayObject from './DisplayObject';
import SyntheticEvent from '../events/SyntheticEvent';
import {Listener} from '../events/EventDispatcher';
import Shape from './Shape';

const events = [
    'clcik',
    'dblclick',
    'mouseup',
    'mousedown',
    'mousemove'
];

export default class Stage extends DisplayObject {
    private canvas = document.createElement('canvas');
    private ctx = this.canvas.getContext('2d');
    private children:Shape[] = [];
    constructor(renderTo: HTMLElement, option = {detect: true}) {
        super();
        renderTo.append(this.canvas);

        this.canvas.width = 800;
        this.canvas.height = 800;
        if(option.detect) {
            this.detect();
        }
    }

    detect(){
        this.canvas.addEventListener('click', this.handleClick);
        delete this.detect;
    }

    on(type: string, listener: Listener){
        this.canvas.addEventListener(type, listener.bind(this))
    }

    off(type: string, listener: Listener) {
        this.canvas.removeEventListener(type, listener.bind(this));
    }

    add(shape: Shape){
        this.children.push(shape);
        shape.parent = this;
        shape.draw(this.ctx);
    }

    handleClick = (e: MouseEvent) => {
        let obj = this.getTarget(e);
        var SynEvent = new SyntheticEvent(e.type);
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

    update(notClear: Boolean) {
        if(!notClear){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
        this.children.forEach((child)=> {
            child.draw(this.ctx)
        })
    }

    isTouched(child: Shape, e: MouseEvent){
        const {left, top} = this.canvas.getBoundingClientRect();
        const [x, y] = [e.clientX - left, e.clientY - top];
        child.path(this.ctx);
        if(this.ctx.isPointInPath(x, y)) {
            return true;
        }
        return false;
        
    }
}
