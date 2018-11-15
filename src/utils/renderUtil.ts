
export function reserve(target, propKey, descriptor){
    const render = descriptor.value;
    descriptor.value  = function(ctx: CanvasRenderingContext2D, ...args) {
        ctx.save();
        render.call(this. ctx, ...args);
        ctx.restore();
    }
}