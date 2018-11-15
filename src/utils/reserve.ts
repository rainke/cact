
export default function reserve(target, propKey, descriptor){
    const draw = descriptor.value;
    descriptor.value  = function(ctx: CanvasRenderingContext2D, ...args) {
        ctx.save();
        draw.call(this, ctx, ...args);
        ctx.restore();
    }
}