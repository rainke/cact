import Shape from './Shape';

export default class Rect extends Shape {
    render(ctx){
        this.path(ctx);
        ctx.fill();
    }

    path(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(80, 0);
        ctx.lineTo(80, 80);
        ctx.lineTo(0, 80);
        ctx.closePath();
    }
}
