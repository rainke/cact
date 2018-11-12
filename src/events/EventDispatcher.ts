namespace cact {
    export interface Listener {
        (e: object):void;
    }

    export interface listeners {
        [type: string]: Listener[]
    }

    export class EventDispatcher  {
        listeners: listeners = {};
        constructor() {
            if(document.readyState !== 'complete') {
                throw Error('在页面加载完毕前调用')
            }
        }
        on(type: string, listener: Listener) {
            let listeners = this.listeners;
            let list = listeners[type];
            if(list) {
                list.push(listener);
            } else {
                listeners[type] = list = [listener];
            }
            console.log(listeners);
        }
        off(type: string, listener: Listener) {
            const listeners = this.listeners;
            const list = listeners[type];
            if(list) {
                let index = list.indexOf(listener);
                list.splice(index, 1);
            }
        }

        dispatch(e: cact.SyntheticEvent) {
            const list = this.listeners[e.type];
            if(list) {
                list.forEach(listener => {
                    listener.call(this);
                })
            }
        }
    }
}