import Shape from './Shape';
import reserve from '../utils/reserve';
import perlin from '../utils/perlin';

export default class Curve extends Shape {
    public points = [0,0,0,0,0,0,0,0];
    public data = {
        step: 0.008,
        width: 800,
        height: 800,
        value: 0
    };
    public rgb = [0, 0, 0];
    public color = "rgba(0, 0, 0, 0.5)";
    constructor(){
        super();
        this.noise(this.points, this.data);
    }

    noise(points, data) {
        data.value += data.step;
        points[0] = 2 * data.width * perlin(data.value + 15)
        points[1] = 2 * data.height * perlin(data.value + 25)
        points[2] = 2 * data.width * perlin(data.value + 35)
        points[3] = 2 * data.height * perlin(data.value + 45)
        points[4] = 2 * data.width * perlin(data.value + 55)
        points[5] = 2 * data.height * perlin(data.value + 65)
        points[6] = 2 * data.width * perlin(data.value + 75)
        points[7] = 2 * data.height * perlin(data.value + 85)
    }

    @reserve
    draw(ctx: CanvasRenderingContext2D){
        const [r, g, b] = this.rgb;
        ctx.strokeStyle = `rgb(${r}, ${g}, ${b}, 0.5)`;
        ctx.globalAlpha = 0.5;
        ctx.translate(400, 400);
        ctx.beginPath();
        const points = this.points;
        ctx.moveTo(points[0], points[1]);
        ctx.bezierCurveTo(points[2], points[3], points[4], points[5], points[6], points[7]);
        ctx.stroke();
        this.noise(this.points, this.data);
        this.rgb = this.updateRGB()
    }

    updateRGB(){
        let [r, g, b] = this.rgb;
        r += 1;
        r %= 256;
        g += 2;
        g %= 256;
        b += 3;
        b %= 256;
        return [r, g, b]
    }

    path() {

    }
}