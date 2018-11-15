import cact from './cact';

window.addEventListener('load', function(){
    const stage = new cact.Stage(document.body);
    const rect = new cact.Curve();
    stage.add(rect);
    function animation(){
        stage.update(true);

        requestAnimationFrame(animation)
    }

    animation();
});
