class myVue {
    constructor(options) {
        this.init(options);
    }
    init(options) {
        this.$el = document.querySelector(options.el)
        this.$options = options;
        this.$methods = options.methods
        this.$data = options.data;
        this._binding = {};
        this.observer(this.$data);
        this.compile(this.$el);

        console.log('this.$data:', this.$data)
        console.log('this.$methods:', this.$methods)
        console.log('this._binding:', this._binding)
    }
    observer(data) {
        let value;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                value = data[key];

                this._binding[key] = {
                    _directive: []
                }
                let binding = this._binding[key];
                Object.defineProperty(data, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        // 获得value
                        return value
                    },
                    set: function (newValue) {
                        if (value != newValue) {
                            value = newValue;
                            binding._directive.forEach(element => {
                                element.update();
                            });
                        }
                    }
                })
            }
        }
    }

    compile(root) {
        let nodes = root.children;
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            if (node.children.length) {
                this.compile(node)
            }

            if (node.hasAttribute('v-click')) {
                var k = () => {
                    var attrVal = node.getAttribute('v-click')
                    return this.$methods[attrVal].bind(this.$data);
                }
                console.log(k);
                console.log(k());
                node.onclick = (() => {
                    var attrVal = node.getAttribute('v-click')
                    return this.$methods[attrVal].bind(this.$data);
                })();
            }
            if (node.hasAttribute('v-model') && node.tagName == 'INPUT') {
                // 监听input内容改变时 实时改变data值
                node.addEventListener('input', (() => {
                    var attrVal = node.getAttribute('v-model');
                    // 
                    this._binding[attrVal]._directive.push(new Watcher(
                        node,
                        this,
                        attrVal,
                        'value'
                    ))

                    return () => {
                        this.$data[attrVal] = node.value
                    }
                })())
            }

            if (node.hasAttribute('v-bind')) {
                var attrVal = node.getAttribute('v-bind');
                this._binding[attrVal]._directive.push(new Watcher(
                    node,
                    this,
                    attrVal,
                    'innerHTML'
                ))
            }
        }
    }
}

class Watcher {
    constructor(el, vm, attrVal, attr) {
        this.el = el;
        this.vm = vm;
        this.attr = attr;
        this.attrVal = attrVal;

        this.update();
    }
    update() {
        this.el[this.attr] = this.vm.$data[this.attrVal];
    }
}