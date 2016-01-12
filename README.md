# Flow Router transition animations based on DynamicsJS

Relies on:

* [kadirahq:flow-router](https://github.com/kadirahq/flow-router)
* [zeroasterisk:dynamicsjs](http://dynamicsjs.com/)
 * [dynamicsjs](http://dynamicsjs.com/)

## Install

    meteor add zeroasterisk:flow-dynamicsjs-animation

## Simple Usage

From your layout, wrap the dynamic template in a selector...
`MainContent` is the default selector, but you can configure it to whatever you like.

    <div id="MainContent">
      <div class="container">
        {{> Template.dynamic template=content}}
      </div>
    </div>

From `FlowRouter` you can replace
`BlazeLayout.render(<layout>, <regions>);`
with
`FlowDynamicsAnimation.render(<layout>, <regions>);`

Or for less typing, you can just do:

`FlowDA.render(<regions>);`

(NOTE: to omit the `<layout>` argument, you must have configured the layout,
see below).

## Configuration & Advanced Usage

The default Configuration can be retrieved via:

    FlowDynamicsAnimation.confDefault();

    {
      layout: "MainLayout",
      contentSelector: "#MainContent",
      modCurrent: {
        opacity: 1,
        translateX: 0,
        translateY: 0
      },
      modInFrom: {
        opacity: 0.1,
        translateX: +650,
        translateY: -30
      },
      modOutTo: {
        opacity: 0,
        translateX: -650,
        translateY: +30
      },
      movement: {
        type: dynamics.spring,
        duration: 500
      }
    }

There is a basic getter/setter `config()` function:

    FlowDynamicsAnimation.config(<name>, <config>);

You can change the default Configuration with something like:

    var defaultConf = FlowDynamicsAnimation.confDefault();
    defaultConf.movement.duration = 9999;
    defaultConf.layout = "FunkyBlazeLayoutName";
    defaultConf.contentSelector = "#WrapperForContentRegion";
    FlowDynamicsAnimation.config("default", defaultConf);

_NOTE: the above config assumes your BlazeLayout template name is
'FunkyBlazeLayoutName' and you have wrapped the dynamic template in `<div
id="WrapperForContentRegion">...</div>`_

You can create a new Configuration with:

    var myConf = FlowDynamicsAnimation.confDefault();
    myConf.layout = "FunkyBlazeLayoutName";
    myConf.contentSelector = "#WrapperForContentRegion";
    myConf.modInFrom = { translateX: -1000; translateY: -1000 };
    myConf.modOutTo =  { translateX: -1000; translateY: -1000 };
    myConf.movement =  {
      type: dynamics.gravity,
      duration: 1085,
      bounciness: 434,
      elasticity: 228
    }
    FlowDynamicsAnimation.config("myCustomConf", myConf);

_NOTE: the above config assumes your BlazeLayout template name is
'FunkyBlazeLayoutName' and you have wrapped the dynamic template in `<div
id="WrapperForContentRegion">...</div>`_

Creating multiple configurations allows you to easily toggle between a variety
of animations.

You can set the current Configuration name with:

    FlowDynamicsAnimation.currentName = "myCustomConf";

_Until you change this, we stick with "default" / so for many "basic" needs,
you could just update the default Configuration_

You can also use the `render()` shortcut:

    // this uses the currentName for config and the configured layout
    FlowDynamicsAnimation.render(<regions>);

    // this uses the <name> for config and the configured layout
    FlowDynamicsAnimation.render(<regions>, <name>)

    // this uses the <name> for config and <layout>
    FlowDynamicsAnimation.render(<regions>, <name>, <layout>)


