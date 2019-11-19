function Vue () {
  this.$data = {
    a: 1
  }
  this.el = document.querySelector('#app')
  this._html = ''
  this.observe(this.$data)
  this.render()
}

Vue.prototype.observe = function (obj) {
  var value
  var self = this
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key]
      if (typeof value === 'object') {
        this.observe(value)
      } else {
        Object.defineProperty(this.$data, key, {
          get: function () {
            return value
          },
          set: function (newVal) {
            value = newVal
            self.render()
          }
        })
      }
    }
  }
}

Vue.prototype.render = function () {
  this._html = `I am ${this.$data.a}`
  this.el.innerHTML = this._html
}
