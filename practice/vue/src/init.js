import { compileToFunction } from "./compiler/index.js";
import { initState } from "./state";

export default function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        this.$options = options

        const vm = this;

        initState(vm)

        if (options.el) {
            vm.$mount(options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        const vm = this
        let element = document.querySelector(el)
        let opts = vm.$options
        let template
        if (!opts.template && el) {
            template = element.outerHTML
        }
        else {
            template = opts.template
        }
        if (template) {
            const render = compileToFunction(template)
            opts.render = render
        }
    }
}
