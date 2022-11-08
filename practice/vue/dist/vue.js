(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function parse(templateString) {
      //Pointer
      var index = 0;
      //Remaining string
      var restString = "";
      //Start tag
      var startRegExp = /^<([a-z]+[1-6]?)(\s[^<]+)?>/;
      //The end tag
      var endRegExp = /^<\/([a-z]+[1-6]?)>/;
      //Define two stacks one to store labels and one to store content
      var stackTag = [];
      var stackLetter = [{
        children: []
      }];
      //Grab the text before the end tag
      var wordRegExp = /^([^<]+)<\/[a-z]+[1-6]?>/;
      while (index < templateString.length - 1) {
        restString = templateString.substring(index);
        if (startRegExp.test(restString)) {
          var tag = restString.match(startRegExp)[1];
          var attrsString = restString.match(startRegExp)[2];
          //Push the tag and the object onto the stack, respectively
          stackTag.push(tag);
          stackLetter.push({
            'tag': tag,
            'children': [],
            "attrs": parseAttrsString(attrsString)
          });
          var attrsStringLength = attrsString !== undefined ? attrsString.length : 0;
          index += tag.length + 2 + attrsStringLength;
        } else if (endRegExp.test(restString)) {
          var _tag = restString.match(endRegExp)[1];
          var pop_tag = stackTag.pop();
          var pop_letter = stackLetter.pop();
          if (_tag === pop_tag) {
            if (stackLetter.length > 0) {
              stackLetter[stackLetter.length - 1].children.push(pop_letter);
            }
          } else {
            throw new Error("".concat(pop_tag, " tag is not closed"));
          }
          index += _tag.length + 3;
        } else if (wordRegExp.test(restString)) {
          var word = restString.match(wordRegExp)[1];
          if (!/^\s+$/.test(word)) {
            //Text is detected on top of stack
            stackLetter[stackLetter.length - 1].children.push({
              "text": word,
              'type': 3
            });
          }
          index += word.length;
        } else {
          index++;
        }
      }
      return stackLetter[0].children[0];
    }
    function parseAttrsString(attrsString) {
      if (attrsString === undefined) return [];
      //Whether the current is in quotation marks
      var isYinHao = false;
      //breakpoint
      var point = 0;
      //result array
      var result = [];
      for (var i = 0; i < attrsString.length; i++) {
        var _char = attrsString[i];
        if (_char === '"') {
          isYinHao = !isYinHao;
        } else if (_char === " " && !isYinHao) {
          if (!/^\s*?$/.test(attrsString.substring(point, i))) {
            result.push(attrsString.substring(point, i).trim());
            point = i;
          }
        }
      }
      result.push(attrsString.substring(point));
      result = result.map(function (item) {
        var o = item.match(/^(.+)=(.+)$/);
        return {
          name: o[1],
          value: o[2].substring(1, o[2].length - 1)
        };
      });
      return result;
    }

    function compileToFunction(template) {
      var ast = parse(template);
      console.log(ast);
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }

    var Observer = /*#__PURE__*/function () {
      function Observer(data) {
        _classCallCheck(this, Observer);
        this.walk(data);
      }
      _createClass(Observer, [{
        key: "walk",
        value: function walk(data) {
          Object.keys(data).forEach(function (key) {
            return defineRactive(data, key, data[key]);
          });
        }
      }]);
      return Observer;
    }();
    function defineRactive(data, key, value) {
      observe(value);
      Object.defineProperty(data, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          value = newValue;
        }
      });
    }
    function observe(data) {
      if (_typeof(data) !== 'object' || data === null) {
        return;
      }
      return new Observer(data);
    }

    function initState(vm) {
      var opts = vm.$options;
      if (opts.data) {
        initData(vm);
      }
    }
    function propxy(vm, target, key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[target][key];
        },
        set: function set(newValue) {
          vm[target][key] = newValue;
        }
      });
    }
    function initData(vm) {
      var data = vm.$options.data;
      data = typeof data === 'function' ? data.call(vm) : data;
      vm._data = data;
      observe(data);
      for (var key in data) {
        propxy(vm, '_data', key);
      }
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        this.$options = options;
        var vm = this;
        initState(vm);
        if (options.el) {
          vm.$mount(options.el);
        }
      };
      Vue.prototype.$mount = function (el) {
        var vm = this;
        var element = document.querySelector(el);
        var opts = vm.$options;
        var template;
        if (!opts.template && el) {
          template = element.outerHTML;
        } else {
          template = opts.template;
        }
        if (template) {
          var render = compileToFunction(template);
          opts.render = render;
        }
      };
    }

    function Vue(options) {
      this._init(options);
    }
    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
