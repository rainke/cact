import cact from './cact';

window.addEventListener('load', function(){
    const stage = new cact.Stage(document.body);
    stage.on('click', function(){
        console.log('you click stage');
    });
    const rect = new cact.Rect();
    rect.on('click', function(){
        console.log('you clicked rect');
    });
    stage.add(rect);
});
