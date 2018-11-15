import EventDispatcher from '../events/EventDispatcher';

export default class DisplayObject extends EventDispatcher {
    public visible: boolean = true;
}