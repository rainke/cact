import Graphics from './Graphics'
export default abstract class Shape extends Graphics {
    parent = null;
    abstract  draw(ctx: CanvasRenderingContext2D);
    abstract  path(ctx);
}