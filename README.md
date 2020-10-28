# ae-api-ts
[chrome dev](https://developers.google.com/web/fundamentals)

[在浏览器输入 URL 回车之后发生了什么](https://juejin.im/post/6844903922084085773)
[浏览器缓存](https://juejin.im/post/6844904105329033230#heading-2)
[讲讲tcp三次握手，为什么需要三次握手](https://www.cnblogs.com/xiaolincoding/p/12638546.html)

[深拷贝循环引用](https://juejin.im/post/6844903998823088141)

[webpack 工作流](https://juejin.im/post/6844904161515929614)
[webpack](https://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-18%E4%BD%BF%E7%94%A8WebpackDevMiddleware.html)
[](https://github.com/lgwebdream/FE-Interview/issues/25)
[koa2](https://chenshenhai.github.io/koa2-note/note/jsonp/info.html)
[vue 和 react 的区别](https://segmentfault.com/a/1190000018742160)
[vue 揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/next-tick.html)
[flutter](https://zhuanlan.zhihu.com/p/63771307)

怎么做性能优化

[首屏优化](https://zhuanlan.zhihu.com/p/56121620)
[性能指标](https://juejin.im/post/6844903662020460552#heading-4)
[性能监控如何做](https://www.zhihu.com/question/37585246)
[性能监控如何做](https://cloud.tencent.com/developer/article/1650831)
[性能监控如何做](https://juejin.im/post/6844904094784552973)
[预加载](https://juejin.im/entry/6844903990002450446)
[面试题](https://juejin.im/post/6847902225423925255)

性能监控如何做
webpack 你是如何做优化的
https://shubo.io/babel-preset-env/
react 性能优化

讲讲 React 生命周期
vue 如何做权限检验
讲讲 http2.0
如何实现 Redux 异步功能
Redux 如何优化

Koa 中间件原理
Koa 如何实现监控处理
commonjs 的实现原理
讲讲垃圾回收机制
函数式编程 如何理解纯函数
Node 原生 api 错误处理有了解吗
treeshaking 原理
按需加载的原理
了解过那些前端构建工具 分别介绍他 webpack rollup gulp
双向数据绑定原理
说 vue 如何收集依赖的
超大数据加载不卡顿
懒加载
UDP TCP 区别
说说 XSS 攻击
说说你的 vuex 持久化插件
函数柯里化

字节
组件库相关问题
项目自己搭的？如何支持 treeshaking
如何做版本号管理
less 样式如何做按需加载
webpack 项目如何优化
ts 泛型
怎么通过实例拿到构造函数
extend 原理
Object.create 原理
虚拟列表原理
浏览器缓存原理
什么 csrf 攻击
csrftoken 怎么获取，存到哪里
并发调度手写题




```
unknown 的正确用法
我们可以通过不同的方式将 unknown 类型缩小为更具体的类型范围:
function getLen(value: unknown): number {
  if (typeof value === 'string') {
    // 因为类型保护的原因，此处 value 被判断为 string 类型
  	return value.length
  }

  return 0
}
```

```
联合类型(union type)表示多种类型的 “或” 关系
function genLen(x: string | any[]) {
  return x.length
}

genLen('') // ok
genLen([]) // ok
genLen(1) // error

```

```
交叉类型表示多种类型的 “与” 关系
interface Person {
  name: string
  age: number
}

interface Animal {
  name: string
  color: string
}

const x: Person & Animal = {
  name: 'x',
  age: 1,
  color: 'red
}

```


```
2. typeof 关键词
在 ts 中，代码实现中的 typeof 关键词能够帮助 ts 判断出变量的基本类型:
function fn (x: string | number) {
  if (typeof x === 'string') { // x is string
    return x.length
  } else { // x is number
    // .....
  }
}
```


```
in 关键词
in 也是一个 类型关键词, 可以对联合类型进行遍历，只可以用在 type 关键词下面。

type Person = {
  [key in 'name' | 'age']: number
}
```

```
keyof 也是一个 类型关键词 ，可以用来取得一个对象接口的所有 key 值:
interface Person {
  name: string
  age: number
}

type PersonAttrs = keyof Person // 'name' | 'age'

```

in 和 keyof组合

```
type Copy<T> = {
  [key in keyof T]: T[key]
}

interface Person {
  name: string
  age: number
}

type Person1 = Copy<Person>
```

泛型相当于一个类型的参数，在 ts 中，泛型可以用在 类、接口、方法、类型别名 等实体中。

小试牛刀

```
function createList<T>(): T[] {
  return [] as T[]
}

const numberList = createList<number>() // number[]
const stringList = createList<string>() // string[]
```

映射类型

typescript 2.8 在 lib.d.ts 中内置了几个映射类型:
```
Partial<T> -- 将 T 中的所有属性变成可选。
Readonly<T> -- 将 T 中的所有属性变成只读。
Pick<T, U> -- 选择 T 中可以赋值给U的类型。
Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
Extract<T, U> -- 提取T中可以赋值给U的类型。
NonNullable<T> -- 从T中剔除null和undefined。
ReturnType<T> -- 获取函数返回值类型。
InstanceType<T> -- 获取构造函数类型的实例类型。

所以我们平时写 TS 时可以直接使用这些类型工具：
interface ApiRes {
  code: string;
  flag: string;
  message: string;
  data: object;
  success: boolean;
  error: boolean;
}

type IApiRes = Pick<ApiRes, 'code' | 'flag' | 'message' | 'data'>

// {
//   code: string;
//   flag: string;
//   message: string;
//   data: object;
// }
```

全局模块 vs. 文件模块


默认情况下，我们所写的代码是位于全局模块下的：
const foo = 2
复制代码此时，如果我们创建了另一个文件，并写下如下代码，ts 认为是正常的：
const bar = foo // ok
复制代码如果要打破这种限制，只要文件中有 import 或者 export 表达式即可：
export const bar = foo // error







模块解析策略
Tpescript 有两种模块的解析策略：Node 和 Classic。当 tsconfig.json 中 module 设置成 AMD、System、ES2015 时，默认为 classic ，否则为 Node ，也可以使用 moduleResolution  手动指定模块解析策略。
两种模块解析策略的区别在于，对于下面模块引入来说：
import moduleB from 'moduleB'
复制代码Classic 模式的路径寻址：
/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
/root/src/moduleB.ts
/root/src/moduleB.d.ts
/root/moduleB.ts
/root/moduleB.d.ts
/moduleB.ts
/moduleB.d.ts
复制代码Node 模式的路径寻址：
/root/src/node_modules/moduleB.ts
/root/src/node_modules/moduleB.tsx
/root/src/node_modules/moduleB.d.ts
/root/src/node_modules/moduleB/package.json (如果指定了"types"属性)
/root/src/node_modules/moduleB/index.ts
/root/src/node_modules/moduleB/index.tsx
/root/src/node_modules/moduleB/index.d.ts

/root/node_modules/moduleB.ts
/root/node_modules/moduleB.tsx
/root/node_modules/moduleB.d.ts
/root/node_modules/moduleB/package.json (如果指定了"types"属性)
/root/node_modules/moduleB/index.ts
/root/node_modules/moduleB/index.tsx
/root/node_modules/moduleB/index.d.ts

/node_modules/moduleB.ts
/node_modules/moduleB.tsx
/node_modules/moduleB.d.ts
/node_modules/moduleB/package.json (如果指定了"types"属性)
/node_modules/moduleB/index.ts
/node_modules/moduleB/index.tsx
/node_modules/moduleB/index.d.ts






声明文件

什么是声明文件
声明文件已 .d.ts 结尾，用来描述代码结构，一般用来为 js 库提供类型定义。
平时开发的时候有没有这种经历：当用npm安装了某些包并使用的时候，会出现这个包的语法提示，下面是 vue 的提示：

这个语法提示就是声明文件的功劳了，先来看一个简单的声明文件长啥样，这是jsonp这个库的声明文件:
type CancelFn = () => void;
type RequestCallback = (error: Error | null, data: any) => void;

interface Options {
    param?: string;
    prefix?: string;
    name?: string;
    timeout?: number;
}

declare function jsonp(url: string, options?: Options, cb?: RequestCallback): CancelFn;
declare function jsonp(url: string, callback?: RequestCallback): CancelFn;

export = jsonp;
复制代码有了这份声明文件，编辑器在使用这个库的时候就可以根据这份声明文件来做出相应的语法提示。
编辑器是怎么找到这个声明文件？

如果这个包的根目录下有一个index.d.ts，那么这就是这个库的声明文件了。
如果这个包的package.json中有types或者typings字段，那个该字段指向的就是这个包的声明文件。

上述两种都是将声明文件写在包里面的情况，如果某个库很长时间不维护了，或者作者消失了该怎么办，没关系，typescript官方提供了一个声明文件仓库，尝试使用@types前缀来安装某个库的声明文件:
npm i @types/lodash
复制代码当引入lodash的时候，编辑器也会尝试查找node_modules/@types/lodash 来为你提供lodash的语法提示。
还有一种就是自己写声明文件，编辑器会收集项目本地的声明文件，如果某个包没有声明文件，你又想要语法提示，就可以自己在本地写个声明文件：
// types/lodash.d.ts
declare module "lodash" {
  export function chunk(array: any[], size?: number): any[];
  export function get(source: any, path: string, defaultValue?: any): any;
}
复制代码
如果源代码是用ts写的，在编译成js的时候，只要加上-d 参数，就能生成对应的声明文件。
tsc -d
复制代码声明文件该怎么写可以参考www.tslang.cn/docs/handbo…
还要注意的是，如果某个库有声明文件了，编辑器就不会再关心这个库具体的代码了，它只会根据声明文件来做提示。










扩展原生对象
可能写过 ts 的小伙伴有这样的疑惑，我该如何在 window 对象上自定义属性呢？
window.myprop = 1 // error
复制代码默认的，window 上是不存在 myprop 这个属性的，所以不可以直接赋值，当然，可以输用方括号赋值语句，但是 get 操作时也必须用 [] ，并且没有类型提示。
window['myprop'] = 1 // OK

window.myprop  // 类型“Window & typeof globalThis”上不存在属性“myprop”
window['myprop'] // ok，但是没有提示，没有类型
复制代码此时可以使用声明文件扩展其他对象，在项目中随便建一个xxx.d.ts：
// index.d.ts
interface Window {
  myprop: number
}

// index.ts
window.myprop = 2  // ok
复制代码也可以在模块内部扩展全局对象：
import A from 'moduleA'

window.myprop = 2

declare global {
  interface Window {
    myprop: number
  }
}




<!--  -->

hook 动机


<!--  -->
函数编程

函数副作用指当调用函数时，除了返回函数值之外，还对主调用函数产生附加的影响。例如修改全局变量（函数外的变量），修改参数或改变外部存储。

**函数就是纯函数**

```
f(x) {
    return x + 1
  }
f(x)
```
**非纯函数**

q(x)访问了函数外部的变量
```
  a = 0
  q(x) {
    b = a
  }
```

函数内部有隐式（Implicit）的数据流，这种情况叫做副作用（Side Effect）。上述的I/O，外部变量等，都可以归为副作用。因此，纯函数的定义也可以写为“没有副作用的函数”

```
function foo(x) {
    y = x * 2;
}

var y;

foo( 3 );
```
这段代码有相同的输出，但是却有很大的差异，这里的因果是没有联系的。这个影响是间接的。这种方式设置 y 就是我们所说的副作用。

注意： 当函数引用外部变量时，这个变量就称为自由变量。并不是所有的自由变量引用都是不好的，但是我们要对它们非常小心。


使用固定的状态
避免副作用就意味着函数 foo(..) 不能引用自由变量了吗？

思考下这段代码：

function foo(x) {
    return x + bar( x );
}

function bar(x) {
    return x * 2;
}

foo( 3 );            // 9
很明显，对于函数 foo(..) 和函数 bar(..)，唯一和直接的原因就是参数 x。但是 bar(x) 被称为什么呢？bar 仅仅只是一个标识符，在 JS 中，默认情况下，它甚至不是一个常量（不可重新分配的变量）。foo(..) 函数依赖于 bar 的值，bar 作为一个自由变量被第二个函数引用。

所以说这个函数还依赖于其他的原因吗？

我认为不。虽然可以用其他的函数来重写 bar 这个变量，但是在代码中我没有这样做，这也不是我的惯例或先例。无论出于什么意图和目的，我的函数都是常量（从不重新分配）。

思考一下：

const PI = 3.141592;

function foo(x) {
    return x * PI;
}

foo( 3 );            // 9.424776000000001
注意： JavaScript 有内置的 Math.PI 属性，所以我们在本文中仅仅是用 PI 做一个方便的说明。在实践中，总是使用 Math.PI 而不是你自己定义的。

上面的代码怎么样呢？PI 是函数 foo(..) 的一个副作用吗？

两个观察结果将会合理地帮助我们回答这个问题：

想一下是否每次调用 foo(3)，都将会返回 9.424..？答案是肯定的。 如果每一次都给一个相同的输入（x），那么都将会返回相同的输出。

你能用 PI 的当前值来代替每一个 PI 吗，并且程序能够和之前一样正确地的运行吗？是的。 程序没有任何一部分依赖于 PI 值的改变，因为 PI 的类型是 const，它是不能再分配的，所以变量 PI 在这里只是为了便于阅读和维护。它的值可以在不改变程序行为的情况下内联。

我的结论是：这里的 PI 并不违反减少或避免副作用的精神。在之前的代码也没有调用 bar(x)。

在这两种情况下，PI 和 bar 都不是程序状态的一部分。它们是固定的，不可重新分配的（“常量”）的引用。如果他们在整个程序中都不改变，那么我们就不需要担心将他们作为变化的状态追踪他们。同样的，他们不会损害程序的可读性。而且它们也不会因为变量以不可预测的方式变化，而成为错误的源头。

注意： 在我看来，使用 const 并不能说明 PI 不是副作用；使用 var PI 也会是同样的结果。PI 没有被重新分配是问题的关键，而不是使用 const。我们将在后面的章节讨论 const。



<!--  -->
一些不易观察的副作用被用于性能优化的操作
```
var cache = [];
function specialNumber(n) {
        // 如果我们已经计算过这个特殊的数，
    // 跳过这个操作，然后从缓存中返回
    if (cache[n] !== undefined) {
        return cache[n];
    }
    var x = 1, y = 1;
    for (let i = 1; i <= n; i++) {
        x += i % 2;
        y += i % 3;
    }
    cache[n] = (x * y) / (n + 1);
    return cache[n];
}

specialNumber( 6 );                // 4
specialNumber( 42 );            // 22
specialNumber( 1E6 );            // 500001
specialNumber( 987654321 );        // 493827162

````
这种性能优化方面的副作用是通过隐藏缓存结果产生的，因此它们不能被程序的任何其他部分所观察到。但是 cache 可能发生意想不到的改变。

思考一下：
```
var specialNumber = (function memoization(){
    var cache = [];
    return function specialNumber(n){
            // 如果我们已经计算过这个特殊的数，
            // 跳过这个操作，然后从缓存中返回
        if (cache[n] !== undefined) {
            return cache[n];
        }

        var x = 1, y = 1;

        for (let i = 1; i <= n; i++) {
            x += i % 2;
            y += i % 3;
        }

        cache[n] = (x * y) / (n + 1);

        return cache[n];
    };
})();
```

上面代码通过 IIFE 隔离 cache ，保证定程序任何的部分都不能观察或修改它们，避免副作用


如果副作用的本质是使用词法自由变量，并且您可以选择修改周围的代码，那么您可以使用作用域来封装它们。

<!-- 值的不可变性 -->

常量：一个无法进行重新赋值（reassignment）的变量。

**以不可变的眼光看待数据**

```
function updateLastLogin(user) {
    var newUserRecord = Object.assign( {}, user );
    newUserRecord.lastLogin = Date.now();
    return newUserRecord;
}

```
将 user 看做一个不应该被改变的数据来对待；对比一下下面的实现：

```
function updateLastLogin(user) {
    user.lastLogin = Date.now();
    return user;
}
```

这个版本更容易实现，性能也会更好一些，但直接改变了user 在维护时难以排查，且可能产生其他问题。

应当总是将 user 看做不可变的值，这样我们就没必要知道数据从哪里来，也没必要担心数据改变会引发潜在问题。

总结：

值的不可变性并不是不改变值。它是指在程序状态改变时，不直接修改当前数据，而是创建并追踪一个新数据。这使得我们在读代码时更有信心，因为我们限制了状态改变的场景，状态不会在意料之外或不易观察的地方发生改变。

由于其自身的信号和意图，const 关键字声明的常量通常被误认为是强制规定数据不可被改变。事实上，const 和值的不可变性声明无关，而且使用它所带来的困惑似乎比它解决的问题还要大。另一种思路，内置的 Object.freeze(..) 方法提供了顶层值的不可变性设定。大多数情况下，使用它就足够了。

对于程序中性能敏感的部分，或者变化频繁发生的地方，处于对计算和存储空间的考量，每次都创建新的数据或对象（特别是在数组或对象包含很多数据时）是非常不可取的。遇到这种情况，通过类似 Immutable.js 的库使用不可变数据结构或许是个很棒的主意。

值不变在代码可读性上的意义，不在于不改变数据，而在于以不可变的眼光看待数据这样的约束。


### 函数组合

- 起初你有一个将小写转化成大写和截取字符串的长度的两个函数

```
function upper (str) {
  return str.toUpperCase()
}

function splitStr (str, start = 3) {
  return str.substr(start)
}
```

- 某一天你需要将小写转化大写，并截取第3位数之后的数据，你可以先存储一个中间变量，然后在赋值个另一个函数进行处理，但是一旦该功能在多出被使用后，代码就变得冗余，杂乱，难以维护

```
const str = 'abcdefg'
const temp1 = upper(str)
const result1 = splitStr(temp1)

const temp2 = upper(str)
const result2 = splitStr(temp2)
```

整合直接将输出放到输入

```
const str = 'abcdefg'
const result = splitStr(upper(str))
```

**函数组合思想**

将独立功能的函数返回直接作为其他函数的输入

```
function compose (str) {
  return splitStr(upper(str))
}
```

类比事务：

将数据的流向想象成糖果工厂的一条生产线，糖果原料入口相当于输入字符串，传送带相当于数据的操作（中间变量）中转，糖果成品相当于输出结果。

销量好时我们需要生产更多的糖果，因此要提升生产效率，过多的增加生产线是不可行的，会占用更过空间。因此要采用其他的改良方式。聪明的工人想到一个好的办法，去掉传送带，将输入和输出接在一起，这样就不在需要在传送带上慢吞吞的移动了。


```
const str = 'abcdefg'
const result = splitStr(upper(str))
```


越来越多的新生产线被安装，发现每次组装,都要产生好多的线路，看起来非常乱，于是工人想为什么不给它套一个外壳，让他看起来干净整齐。


```
function compose (str) {
  return splitStr(upper(str))
}
```

虽然工程发展越来越好，机器不断增加，发现从A商家买了的原料处理机器和B商家买来的糖果输出机器，每次都要组合安装，浪费人力。所以工程师们联系了一家工业机器制供应商来帮他们，刚好供应商有 机器合成生产线 可以快速组装甚至还给做了非常好看的包装。这牛x的组装生产线，不仅可以组装糖果机器，还可以组装其他的类似的输入输出机器。非常的上天

```
function compose2(fn2,fn1) {
    return function composed(origValue){
        return fn2( fn1( origValue ) );
    };
}

```
定义参数的顺序是 fn2,fn1，第二个函数（也被称作 fn1）会首先运行，然后才是参数中的第一个函数（fn2），以从右往左的顺序组合的。

大部分传统的 FP 库为了顺序而将它们的定义为从右往左的工作


###　通用组合

如果我们能够定义两个函数的组合，我们也同样能够支持组合任意数量的函数

```
function compose(...fns) {
    return function composed(result){
        // 拷贝一份保存函数的数组
        var list = fns.slice();
        while (list.length > 0) {
            // 将最后一个函数从列表尾部拿出并执行，从右往左的执行顺序
            result = list.pop()( result );
        }

        return result;
    };
}
```



[nginx](https://moonbingbing.gitbooks.io/openresty-best-practices/content/ngx/nginx_local_pcre.html)


[跨域问题](https://ningyu1.github.io/site/post/92-cors-ajax/)

[ts](https://juejin.im/post/6844904037922373639#heading-31)

[虚拟列表](https://juejin.im/post/6844903893441183751)


[大数据](https://www.zhihu.com/question/267560156)

<!-- 时间切片 -->

把长任务分割成若干个小任务执行，比如1s 改成 10 个 100ms

两个API

- window.requestAnimationFrame
- window.requestIdleCallback

**window.requestAnimationFrame**

- 告诉浏览器执行一个动画，并在下次重绘之前调用指定的回调函数

- 若想继续更新下一帧动画，那么回调函数自身必须再次调 `window.requestAnimationFrame`

- 回调函数会被传入DOMHighResTimeStamp参数，指示当前被 requestAnimationFrame 排序的回调函数被触发的时间

**使用**

**单一帧**

```
window.requestAnimationFrame((e) => {
  console.log(e, 'eee')
})
```

**每一帧都执行**

```
const renderAnimation = () => {
    window.requestAnimationFrame((e) => {
        console.log(e)
        renderAnimation()
    })
}
renderAnimation()
```

requestAnimationFrame 兼容性非常好

**window.requestIdleCallback**

- 在浏览器的空闲时段内调用的函数

- 函数一般会按先进先调用的顺序执行，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序

**使用**

**单一帧**

```
window.requestIdleCallback((e) => {
  console.log(e, 'eee')
})
```

**每一帧**

- 每一帧，并不一定是每一帧，要看该帧执行完后是否有空余时间，如果有，则执行

- 指定 timeout 字段，可以保证让回调在超过 timeout 指定的时间后，执行一次。如果不指定，回调可能几秒钟都不会执行（浏览器一直没有空闲帧）

```
const renderAnimation = () => {
    window.requestIdleCallback((e) => {
        console.log(e.didTimeout)
        renderAnimation()
    }, { timeout: 5} )
}
renderAnimation()
```

**DocumentFragment**

- 一个没有父对象的最小文档对象。作为一个轻量版的 Document 使用，存储由节点（nodes）组成的文档结构

- 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题

- 最常用的方法是使用文档片段作为参数承接appendChild, insertBefore 方法添加的节点

- 然后将 DocumentFragment 添加到指定的dom位置，这种情况下片段的所有子节点, 而非片段本身。因为所有的节点会被一次插入到文档中，只进行一次重渲染的操作

- 可以使用document.createDocumentFragment 方法或者构造函数来创建一个空的 DocumentFragment

```
// HTML
<ul class="list"></ul>

// JS
let listData = document.querySelector('.list')
let text = ['1', '2', '3']

let fragment = new DocumentFragment()

text.forEach(function (m) {
let li = document.createElement('li')
li.innerHTML = m
  // 利用 DocumentFragment 充当介质，可以一次性将多个 li 插入。不必引入额外的标签
  // DocumentFragment 并非真实的 dom 不会插入新的 dom 实体
  // 也不会产生重绘操作
  fragment.appendChild(li)
})

listData.appendChild(fragment)
```

- 接下来简单实现一个10万数据加载，如果一次性加载肯定是免不了卡顿的

- 将10万数据分到每一帧（16ms）处理，一帧加载20条

**优点**

1. 首次加载不会卡顿很久白屏
2. 滑动滚动条时，不会出现严重的闪屏

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="root"></div>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .list {
            width: 300px;
            left: 50%;
        }
        .list li {
            border-bottom: 1px solid #ddd;
            margin-bottom: 6px;
        }
    </style>
    <ul class="list"></ul>
    <script>
        let list = document.querySelector('.list')
        let total = 100000
        let curPage = 20
        let index = 0
        const render = (total, index) => {
            if (total <= 0) {
                return
            }
            // requestAnimationFrame 每一帧都执行  ==========
            window.requestAnimationFrame((e) => {
                console.log(e)
                let domFra = new DocumentFragment()
                for (let i = 0; i < curPage; ++i) {
                    let item = document.createElement('li')
                    item.innerText = `我是${index + i}`
                    domFra.appendChild(item)
                }
                list.appendChild(domFra)
                render(total - curPage, index + curPage)
            })
        }
        render(total, index)
    </script>
  </body>
</html>

```







<!-- ============== -->
应用
微服务应用，类似于前端所说的模块。
主要功能：每个应用都需要在用户中心进行注册，用户中心分配cliend_id/client_secret。
其他功能：配置应用访问过期时间，是否支持离职，设备审核，设备验证等。
权限
主要用于后端进行接口级/数据级权限配置。
注意：不区分主机厂、经销商。
菜单
用于前端页面及按钮权限控制。基于权限实现。
主要功能：
1.侧边栏展示。（根据接口获取数据展示侧边栏）
2.按钮或内容的显示隐藏----不同类别、不同角色，展示不同的内容/不同的操作。（利用pageId与resourceId实现）
注意：区分主机厂、经销商。
角色
权限的集合。
角色关联菜单，用户关联角色实现用户权限控制。
主要功能：关联菜单。
注意：区分主机厂、经销商。

