///<reference path="../events/EventDispatcher.ts" />
namespace cact {
    export class DisplayObject extends cact.EventDispatcher {
        public visible: boolean = true;
    }
}