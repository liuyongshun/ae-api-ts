# ae-api-ts
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







<!-- ====================== -->
node事件循环

Node.js采用V8作为js的解析引擎，而I/O处理方面使用了自己设计的libuv，libuv是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的API，事件循环机制也是它里面的实现

- V8引擎解析JavaScript脚本。

- 解析后的代码，调用Node API。

- libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。

- V8引擎再将结果返回给用户

### event loop 机制

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）

- 定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。

- 待定回调：执行延迟到下一个循环迭代的 I/O 回调。

- idle, prepare：仅系统内部使用。

- 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。

- 检测：setImmediate() 回调函数在这里执行。

- 关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。

注意：上面六个阶段都不包括 process.nextTick()(下文会介绍)

(1) timer
timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。 同样，在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行。

(2) poll
poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情
1.回到 timer 阶段执行回调
2.执行 I/O 回调
并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
如果 poll 队列为空时，会有两件事发生

如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去



当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。



(3) check阶段
setImmediate()的回调会被加入check队列中，从event loop的阶段图可以知道，check阶段的执行顺序在poll阶段之后。
我们先来看个例子:
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
//start=>end=>promise3=>timer1=>timer2=>promise1=>promise2
复制代码
一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出start end，并将2个timer依次放入timer队列）,会先去执行微任务（这点跟浏览器端的一样），所以打印出promise3
然后进入timers阶段，执行timer1的回调函数，打印timer1，并将promise.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；这点跟浏览器端相差比较大，timers阶段有几个setTimeout/setInterval都会依次执行，并不像浏览器端，每执行一个宏任务后就去执行一个微任务（关于Node与浏览器的 Event Loop 差异，下文还会详细介绍）。








5 Node.js事件循环原理

**node 的初始化**

- 执行输入代码

- 执行 process.nextTick 回调

- 执行 microtasks

```
// 尽管时间是0, 但是最后执行
setTimeout(() => {
  console.log('macro');
}, 0);

var micro = new Promise((resolve) => {
  resolve('micro')
})
micro.then(res => {
  console.log(res)
})
process.nextTick(() => {
  console.log('nextTick')
})

// nextTick
// micro
// macro
```

**进入 event-loop**

1. 进入 timers 阶段

- 检查 timer 队列是否有到期的 timer 回调，如果有，将到期的 timer 回调按照 timerId 升序执行。

- 检查是否有 process.nextTick 任务，如果有，全部执行。

- 检查是否有microtask，如果有，全部执行。

- 退出该阶段。

// 分析下面代码先不急,稍等先发现
```

setTimeout(() => {
  console.log('延时100毫秒')
}, 100)
setTimeout(() => {
  console.log('延时200毫秒')
}, 200)

const readStartTime = Date.now()
function someAsyncOperation(callback) {
  fs.readFile('./file.js', callback);
}

someAsyncOperation(() => {
  console.log(Date.now() - readStartTime, '读取文件耗时')
  const timestart = Date.now()
  while (Date.now() - timestart < 500) {}
})

process.nextTick(() => {
  console.log('nextTick-out')
})

setTimeout(() => {
  console.log('延时0毫秒')
  process.nextTick(() => {
    console.log('nextTick-inner')
  })
})
// nextTick-out
// 延时0毫秒
// nextTick-inner
// 18 读取文件耗时
// 延时100毫秒
// 延时200毫秒
```

上面代码读下来要弄清楚几件事情:

- node 事件顺序是 node初始化(process.nextTick -> microtask) -> timer (process.nextTick -> microtask) -> I/O callback -> idle，prepare -> poll -> check -> 关闭回调

- 轮询阶段控制何时定时器执行,当事件循环进入 轮询 阶段时，它有一个空队列（此时 fs.readFile() 尚未完成），fs.readFile() 完成读取文件，它的那个需要 500 毫秒才能完成的回调，将被添加到 轮询 队列中并执行。当回调完成时，队列中不再有回调，因此事件循环机制将查看最快到达阈值的计时器，然后将回到 计时器 阶段，以执行定时器的回调。示例中，调度计时器到它的回调被执行之间的总延迟将为 500+ 毫秒。

**2. 进入IO callbacks阶段**

这个阶段执行一些系统操作的回调，比如 TCP 错误。名字会让人误解为执行 I/O 回调处理程序, 实际上 I/O 回调会由 poll 阶段处理

- 检查是否有 pending 的 I/O 回调。如果有，执行回调。如果没有，退出该阶段。

- 检查是否有 process.nextTick 任务，如果有，全部执行。

- 检查是否有microtask，如果有，全部执行。

- 退出该阶段。

3. 进入 idle，prepare 阶段

4. 进入 poll 阶段

获取新的 I/O 事件, 例如操作读取文件等等，适当的条件下 node 将阻塞在这里

**它有两个重要功能：**

- 处理 poll 队列的事件

- 当有已超时的 timer，执行它的回调函数

**轮询队列不是空**

事件循环将同步执行 poll 队列里的回调，直到队列为空或执行的回调达到系统上限。如果没有其他阶段的事要处理，事件循环将会一直阻塞在这个阶段，等待新的 I/O 事件加入 poll 队列中。

**轮询队列是空**

1. 如果 check 队列已经被 setImmediate 设定了回调, 事件循环将结束 poll 阶段往下进入 check 阶段来执行 check 队列（里面的回调 callback）。

- 检查是否有 process.nextTick 回调，如果有，全部执行。

- 检查是否有 microtaks，如果有，全部执行。

2. 如果脚本 未被 setImmediate()调度，则事件循环将等待回调被添加到队列中，然后立即执行

- 检查是否有 process.nextTick 回调，如果有，全部执行。

- 检查是否有 microtaks，如果有，全部执行。

3. 一旦 轮询 队列为空（且没有 setImmediate），如果一个或多个计时器已准备就绪，则事件循环将绕回计时器阶段以执行这些计时器的回调

```
const fs = require('fs')

const readStartTime = Date.now()

setTimeout(() => {
  console.log('延时8毫秒')
}, 8)
setTimeout(() => {
  console.log('延时200毫秒', `实际执行用时${Date.now() - readStartTime}`)
}, 200)

function someAsyncOperation(callback) {
  fs.readFile('./file.js', callback);
}

someAsyncOperation(() => {
  const timestart = Date.now()
  while (Date.now() - timestart < 500) {}
  console.log(`读取文件和执行回调耗时${Date.now() - readStartTime}`)
})

setTimeout(() => {
  console.log('延时0毫秒')
})
setImmediate(() => {
  console.log('setImmediate')
})

// setImmediate  和 延时0毫秒的setTimout 随机1，2位
// 延时0毫秒
// 延时8毫秒
// 读取文件和执行回调耗时548
// 延时200毫秒 实际执行用时549
```

**为什么 setTimeout 和 setImmediate 打印先后不一？**

setTimeout 在 timers 阶段执行，而 setImmediate 在 check 阶段执行，且 setTimeout 延时是0，理论setTimeout会早于setImmediate完成

但实际上，Node 做不到0毫秒，最少也需要1毫秒，setTimeout(f, 0)等同于setTimeout(f, 1)

实际执行进入事件循环以后，有可能到了1毫秒，也可能没到，取决于运行状况。如果没到，说明 timers 阶段没有到期的回调可以执行，进入下一个阶段


但是，下面的代码一定是先输出2，再输出1，因为 代码会先进入 I/O callbacks 阶段，然后是 check 阶段，最后才是 timers 阶段

```
const fs = require('fs');
fs.readFile('test.js', () => {
  setTimeout(() => console.log(1));
  setImmediate(() => console.log(2));
});
```

**为什么200毫秒的timer回调会到549之后才执行？**

经过timer阶段，进入I/O callbacks阶段，发现队列为空，进入下一个内部阶段无（idle，prepare），完成后进入 poll 循环阶段，此时它有一个空队列（fs.readFile 尚未完成，一般要100ms左右），而空队列的时候有两种情况，有 setImmediate 调度则进入 check 阶段，执行 setImmediate， 没有 setImmediate 则事件循环将等待（阻塞再次）回调(I/O回调)被添加到队列中，然后立即执行，第一轮循环存在 setImmediate且未执行，因此结束poll 阶段，进入check 执行  setImmediate，执行完后，发现check队列已经清空，进入 关闭阶段，发现队列为空，结束此阶段并检查是否有活跃的 handles（定时器、IO等事件句柄），发现仍存在未执行的内容，再次进入timer，而此时 8 ms的定时器已经到达时间限制（200ms 还没有到），将该回调拿出并执行。 执行完成后不再有可执行回调，再次结束进入下一个阶段。再次到达 poll 阶段时，此时 readFile 可能完成，亦可能未完成，如果完成了，则回调进入poll队列，立即同步至执行，如果为完成，队列依然为空。检测 setImmediate 是否有调度，上一个轮询 setImmediate 已经执行完， 所以不在有 setImmediate 调度，则事件循环将在此等待回调（readFile）被添加到队列中，然后立即执行（执行花费500ms，此时setTimeout 已经到时间了，但是阻塞在这里），执行结束，poll 轮询清空，此时已经有到期的定时器，然后一步一步的绕回到timer，执行 setTimeout 回调

5. 进入 check 阶段, setImmediate() 回调函数在这里执行

- 如果有immediate回调，则执行所有immediate回调

- 检查是否有 process.nextTick 回调，如果有，全部执行

- 检查是否有 microtaks，如果有，全部执行

- 退出 check 阶段

```
setImmediate(() => {
  console.log('setImmediate 一次')
})

setImmediate(() => {
  console.log('setImmediate 二次')
})

process.nextTick(() => {
  console.log('nextTick')
})

const P = new Promise((resolve) => {
  resolve('micro')
})
P.then(res => {
  console.log(res)
})
// nextTick
// micro
// setImmediate 一次
// setImmediate 二次
```

**6. 进入 closing 阶段 一些关闭的回调函数在此执行，如：socket.on('close', ...)**

- 如果有immediate回调，则执行所有immediate回调

- 检查是否有 process.nextTick 回调，如果有，全部执行

- 检查是否有 microtaks，如果有，全部执行

- 退出 closing 阶段

**7.检查是否有活跃的 handles（定时器、IO等事件句柄）**

- 如果有，继续下一轮循环

- 如果没有，结束事件循环，退出程序






<!-- =========================== -->
Vue三要素

响应式: 例如如何监听数据变化,其中的实现方法就是我们提到的双向绑定
模板引擎: 如何解析模板
渲染: Vue如何将监听到的数据变化和解析后的HTML进行渲染

基于数据劫持的双向绑定, 目前Vue在用的Object.defineProperty,另一个是ES2015中新增的Proxy,而Vue的作者宣称将在Vue3.0版本后加入Proxy从而代替Object.defineProperty


### 数据劫持的优势

目前业界分为两个大的流派,一个是以React为首的单向数据绑定,另一个是以Angular、Vue为主的双向数据绑定

**数据劫持的优势所在**

无需显示调用: 例如Vue运用数据劫持+发布订阅,直接可以通知变化并驱动视图,

可精确得知变化数据：我们劫持了属性的setter,当属性值改变,我们可以精确获知变化的内容newVal,因此不需要额外的diff操作, 如果只知道变化不知道变化在哪里，需要大量的diff比较。

**数据劫持双向绑定的实现思路**

- 利用Proxy或Object.defineProperty生成的Observer针对对象/对象的属性进行"劫持",在属性发生变化后通知订阅者

- 解析器Compile解析模板中的Directive(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染

- Watcher属于Observer和Compile桥梁,它将接收到的Observer产生的数据变化,并根据Compile提供的指令进行视图渲染,使得数据变化促使视图变化

**Object.defineProperty缺陷**

- Object.defineProperty的第一个缺陷,无法监听数组变化

- Object.defineProperty的第二个缺陷,只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历

**Proxy 优势**

Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。
Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改。
Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利。
当然,Proxy的劣势就是兼容性问题,而且无法用polyfill磨平,因此Vue的作者才声明需要等到下个大版本(3.0)才能用Proxy重写。
