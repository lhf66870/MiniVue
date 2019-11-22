# MiniVue
简单粗暴实现vue数据双向绑定：
  
	○ 通过 Object.defineProperty() 实现 vue2.0的数据双向绑定原理
	○ vue2.0的数据双向绑定对数组的特殊处理
	○ 通过 Proxy() 实现 vue3.0的数据双向绑定原理


Proxy 的简单实用 / 数据校验实现 / 私有属性实现

改用proxy的好处：

	○ defineProperty只能监听耨个属性，不能对全对象监听
	○ 可以省去for in提升效率
	○ 可以监听数组，无需单独对数组做特异操作
