# ae-api-ts

### 缺点

Promise 缺点：

ECMAScript 6 Promise 缺少两个有时很有用的特性

- 不能取消执行

- 无法获取当前执行的进度信息（比如，要在用户界面展示进度条）

Q Promise 库对于后者提供了支持 [Q Promise](https://github.com/kriskowal/q#progress-notification)
[题库](https://github.com/lgwebdream/FE-Interview)

### js数字范围

- 2的53次幂 - 1 是 Javascript中可以用 Number 表示的最大数字

- BigInt 可以表示任意大的整数BigInt 是一种内置对象，它提供了一种方法来表示大于 2的53次幂 - 1 的整数

使用方式：

```
const a = 9007199254740991n;

const b = BigInt(9007199254740991);
```

转化布尔：

```
BigInt 在需要转换成 Boolean 的时表现跟 Number 类似：如通过 Boolean 函数转换；用于 Logical Operators  ||, `&&`, 和 ! 的操作数；或者用于在像 if statement 这样的条件语句中。
if (0n) {
  console.log('Hello from the if!');
} else {
  console.log('Hello from the else!');
}

// ↪ "Hello from the else!"

0n || 12n
// ↪ 12n

0n && 12n
// ↪ 0n

Boolean(0n)
// ↪ false

Boolean(12n)
// ↪ true

!12n
// ↪ false

!0n
// ↪ true
```

与Number不同点：

- 不能用于 Math 对象中的方法；

- 不能和任何 Number 实例混合运算，两者必须转换成同一种类型。BigInt 变量在转换成 Number 变量时可能会丢失精度

```
typeof 1n === 'bigint'; // true
typeof BigInt('1') === 'bigint'; // true
```

### 对象深比较

1. lodash 的 isEqual

2. immutable 的 equals 和 Immutable.is


### 自定义hook

### useContext 和 useReducer