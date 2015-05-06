/**
 * ATTENTION: this file is not done. I copied most of this from the kinoma multitouch example.
 * Source code for that can be found here: https://github.com/Kinoma/KPR-examples/blob/c1b82e3a6b436a3f19cb539ec3c9041e4ceae4ab/multitouch-picture/src/main.xml
 * There's a big comment at the top which should provide some insight. We need to use some kind
 * of property of the FINGERS library, and I'm not sure which one. Source code for the fingers lib is
 * at: https://github.com/Kinoma/kinomajs/blob/master/kinoma/kpr/libraries/MultiTouchLib/src/fingers.xml
 *
 * Hopefully if anyone needs to implement this that should give them a start. My idea is to replace the actual
 * Picture objects that we're using in the window previewContainer with DraggableImageTemplate items instead.
 * Not sure to what extent this will work.
 *
 * Note: in order for this file to work, you will need to import the MultiTouch library into your build path in kinoma studio.
 *
 * - Noah
 */

var FINGERS = require('fingers');
var TOUCH_STATES = require('pictureTouchStates');

var DraggableImageTemplate = Container.template(function($) {
    return {
        left: 0, right: 0, top: 0, bottom: 0, active: true,
        skin: whiteSkin,
        behavior: Object.create((DraggableImageTemplate.behaviors[0]).prototype),
        contents: [
            Picture($, {
                left: $.left, top: $.top, width: $.width, height: $.height, name: 'picture',
                behavior: Object.create((DraggableImageTemplate.behaviors[1]).prototype),
                url: $.url,
                opacity: $.opacity || 1.0
            }),
        ],
    };
});

DraggableImageTemplate.behaviors = new Array(2);
DraggableImageTemplate.behaviors[0] = FINGERS.TouchBehavior.template({
    buildTouchStateMachine: function(container) {
        var allowRotation = true;
        return TOUCH_STATES.buildPictureTouchStateMachine(container, container.picture, allowRotation); // note we pass both the container and the picture to be manipulated here
    },
    onCreate: function(container, data) {
        FINGERS.TouchBehavior.prototype.onCreate.call(this, container, data);
        this.data = data;
        this.loaded = false;
        container.active = true;
        container.exclusiveTouch = true;
        container.multipleTouch = true;
    },
    onShowingStateComplete: function(container) {
        // could hide a busy indiator here for asyc pictures
        // for now, does nothing
    },
    onPhotoViewChanged: function(container) {
        // this is called when the touch state machine returns to idle
        // Connect uses this oportunity send the latest cropped view of the image to the renderer
    },
    onTouchMoved: function (container, id, x, y, ticks) {
        trace("OnTouchMoved: x: " + x + " y: " + y + " ticks: " + ticks + ";\n");
    }
});

DraggableImageTemplate.behaviors[1] = Behavior.template({
    onLoaded: function(picture) {
        this.loaded = true;
        // this.fitType = "fill";                       // may be set to "fit" or "fill"
        // this.fitPicture(picture);
    },
    // fitPicture: function(picture) {
    //     if (this.loaded)
    //                     TOUCH_STATES.fitPicture(picture, 0, this.fitType)
    // },
});

module.exports = DraggableImageTemplate;
