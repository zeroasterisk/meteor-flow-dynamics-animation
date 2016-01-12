FlowDynamicsAnimation = {
  currentName: "default",
  config: {},
  start: function(name) {
    if (name && _.isString(name)) {
      // set currentName if set
      this.currentName = name;
    }
    // setup animation
    this.ani();
  },
  // convenience helper to trigger animations & trigger BlazeLayout.render()
  render: function(regions, name, layout) {
    if (_.isObject(name) && _.isString(regions)) {
      layout = regions;
      regions = name;
      name = undefined;
    }
    // setup animation
    this.start(name);
    // render layout
    if (!layout) {
      layout = this.conf().layout;
    }
    BlazeLayout.render(layout, regions);
  },
  // confDefault - standardized, after render, so we can rely on dynamics object
  confDefault: function() {
    return {
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
    };
  },
  // get/set config for name / default
  conf: function(name, config) {
    if (!_.isString(name)) {
      name = this.currentName;
    }
    if (!_.has(this.config, 'default')) {
      this.config.default = this.confDefault();
    }
    if (!_.has(this.config, name)) {
      this.config[name] = this.config.default;
    }
    if (config && _.isObject(config)) {
      this.config[name] = _.extend(this.config[name], config);
    }
    return this.config[name];
  },
  // verify that the contentSelector exists
  vet: function() {
    return ($(this.conf().contentSelector).size() === 1);
  },
  ani: function() {
    if (!this.vet()) {
      console.error("FlowDynamicsAnimation can not animate, " +
                    "unable to vet existence of animation wrapper");
      return;
    }
    this.aniSetup();
    this.aniOut();
    this.aniIn();
  },
  aniSetup: function() {
    var content = $(this.conf().contentSelector);
    var contentClone = $("<div class='flow-dynamics-animation-clone'></div>");
    $(content).after(
      $(contentClone)
      .css({
        position: "absolute",
        height: $(content).height(),
        width: $(content).width(),
        left: $(content).position().left,
        top: $(content).position().top
      })
      .html(
        $(content).clone(false).removeAttr("id").removeAttr("style")
      )
    );
    this.config[this.currentName].contentClone = contentClone;
  },
  aniOut: function() {
    var oldDom = $(this.config[this.currentName].contentClone)[0];
    dynamics.stop(oldDom);
    dynamics.animate(
      oldDom,
      FlowDynamicsAnimation.conf().modCurrent,
      {
        duration: 1,
        complete: function() {
          dynamics.animate(
            oldDom,
            FlowDynamicsAnimation.conf().modOutTo,
            _.extend(
              { complete: function() { $(oldDom).html(""); } },
              FlowDynamicsAnimation.conf().movement
            )
          );
        }
      }
    );
  },
  aniIn: function() {
    var newDom = $(this.config[this.currentName].contentSelector)[0];
    dynamics.stop(newDom);
    dynamics.animate(
      newDom,
      FlowDynamicsAnimation.conf().modInFrom,
      {
        duration: 1,
        complete: function() {
          dynamics.animate(
            newDom,
            FlowDynamicsAnimation.conf().modCurrent,
            FlowDynamicsAnimation.conf().movement
          );
        }
      }
    );
  }
};


// helpful shortcut
FlowDA = FlowDynamicsAnimation;
