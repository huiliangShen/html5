function myVue(options) {
    this._init(options);
}

myVue.prototype._init = function (options) {
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$methods = options.methods;
    this._binding = {};
    this._obverse(this.$data);
    this._complie(this.$el);

    console.log('this.$options:', this.$options)
    console.log('this.$data:', this.$data)
    console.log('this.$methods:', this.$methods)
    console.log('this._binding:', this._binding)
}

myVue.prototype._obverse = function (obj) {
    let vaule;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            vaule = obj[key];
            if (typeof vaule === 'object') {
                this._obverse(vaule);
            }
            this._binding[key] = {
                _directive: []
            };
            var binding = this._binding[key];
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    console.log(`获取${vaule}`);
                    return vaule;
                },
                set: function (newValue) {
                    console.log(`更新${newValue}`);
                    if (vaule != newValue) {
                        vaule = newValue;
                        binding._directive.forEach(e => {
                            e.update();
                        });
                    }
                }
            })
        }
    }
}

myVue.prototype._complie = function (root) {
    var _this = this;
    var nodes = root.children;
    for (let i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        // 对所有元素进行遍历，并进行处理
        if (node.children.length) {
            this._complie(node)
        }
        // 解析v-click 将对应的方法this只想data中
        if (node.hasAttribute('v-click')) {
            node.onclick = (function () {
                var attrVal = nodes[i].getAttribute('v-click');
                return _this.$methods[attrVal].bind(_this.$data);
            })();
        }
        // 解析v-model
        if (node.hasAttribute('v-model') && (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA')) {
            node.addEventListener('input', (function (key) {
                var attrVal = node.getAttribute('v-model');
                _this._binding[attrVal]._directive.push(new Watchter(
                    'input',
                    node,
                    _this,
                    attrVal,
                    'value'
                ));
                return function () {
                    _this.$data[attrVal] = nodes[key].value;
                }
            })(i));
        }
        if (node.hasAttribute('v-bind')) {
            var attrVal = node.getAttribute('v-bind');
        
            _this._binding[attrVal]._directive.push(new Watchter(
                'text',
                node,
                _this,
                attrVal,
                'innerHTML'
            ))
        }
    }
}

/**
 * 指令类Watcher，用来绑定更新函数，实现对DOM元素的更新
 */
function Watchter(name, el, vm, exp, attr) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.exp = exp;
    this.attr = attr;

    this.update();
}

Watchter.prototype.update = function () {
    this.el[this.attr] = this.vm.$data[this.exp];
}