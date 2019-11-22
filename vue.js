// 发布者
class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data; // 获取数据
    this.$el = document.querySelector(options.el); // 获取元素对象
    // 容器，保存订阅者信息
    this._directive = {};
    this.Observer(this.$data);
    this.Compile(this.$el);
  }
  // 数据劫持功能
  Observer(data) {
    // 准备数据容器
    for (let key in data) {
      this._directive[key] = [];
      let val = data[key];
      // 获取对应订阅者
      let watcher = this._directive[key];
      // 对 data 数据依次劫持
      Object.defineProperty(this.$data, key, {
        get() {
          return val;
        },
        set(newVal) {
          if (val === newVal) return;
          val = newVal;
          // element -> 订阅者的实例对象
          watcher.forEach(element => {
            element.update();
          });
        }
      });
    }
  }
  // 解析指令 -> 依赖收集 -> 更新视图 -> 订阅
  Compile(el) {
    let nodes = el.children; // 获取 #app对象下的所有子对象
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      // 递归算法 查找树形DOM结构
      if (node.children.length) {
        this.Compile(node);
      }
      if (node.hasAttribute("v-text")) {
        // 订阅
        let attrVal = node.getAttribute("v-text");
        // 添加订阅者
        this._directive[attrVal].push(
          new Watcher(node, this, attrVal, "innerHTML")
        );
      }
      if (node.hasAttribute("v-model")) {
        // 订阅
        let attrVal = node.getAttribute("v-model");
        // 添加订阅者
        this._directive[attrVal].push(
          new Watcher(node, this, attrVal, "value")
        );
        let self = this;
        node.addEventListener("input", function() {
          // 当文本框发生数据变化,更新模型
          self.$data[attrVal] = node.value;
          console.log(self.$data[attrVal]);
        });
        // node.addEventListener(
        //   "input",
        //   (function() {
        //     return function() {
        //       this.$data[attrVal] = node.value;
        //       console.log(this.$data[attrVal]);
        //     };
        //   })().bind(this)
        // )
      }
    }
  }
}
// 订阅者(更新视图) -> 负责更新本身状态
class Watcher {
  constructor(el, vm, exp, attr) {
    this.el = el;
    this.vm = vm;
    this.exp = exp;
    this.attr = attr;
    this.update();
  }
  update() {
    this.el[this.attr] = this.vm.$data[this.exp];
  }
}
