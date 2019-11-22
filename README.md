# MiniVue
简单粗暴实现vue数据双向绑定：
  
	○ 通过 Object.defineProperty() 实现 vue2.0的数据双向绑定原理
	○ vue2.0的数据双向绑定对数组的特殊处理
	○ 通过 Proxy() 实现 vue3.0的数据双向绑定原理


Proxy 的简单使用 / 数据校验实现 / 私有属性实现

改用proxy的好处：

	○ defineProperty只能监听耨个属性，不能对全对象监听
	○ 可以省去for in提升效率
	○ 可以监听数组，无需单独对数组做特异操作

什么是数据响应式：
	
	数据响应式即数据双向绑定，就是把Model绑定到View，当我们用javascript代码更新Model时，View就会自动更新；如果用户更新了View，Model的数据也自动更新了，这种情况就是双向绑定
				
		        	
数据响应式原理：

	• vue实现数据响应式的原理就是利用了Object.defineProperty()，这个方法重新定义了对象获取属性值(get)和设置属性值(set)的操作来实现的
	
	• vue3.0版本采用ES6的Proxy对象来实现
	
数据响应式的实现：
	
		
	a. 首先由上图实现一个整体的架构（包括MVVM类或者VUE类，Watcher类），采用发布订阅模式
		
	b. 实现MVVM中的由M到V，把模型里面的数据绑定到视图
		
	c. 实现V-M，当文本框输入文本的时候，由本文事件触发更新模型中的数据，同事更新相应的视图

