# state-machine

> TS实现的简单状态机，目前支持`FSM(finite state machine)`

[![license](https://img.shields.io/github/license/awefeng/state-machine)]((https://github.com/awefeng/state-machine/blob/master/LICENSE))
[![@awefeng/state-machine](https://img.shields.io/npm/v/@awefeng/state-machine)](https://www.npmjs.com/package/@awefeng/npm-template)

## introduction

用TS实现了一个简单的状态机，目前仅支持`FSM`状态机，后续会增加其他类型状态机。

支持`commonjs`和`es moudle`两种规范。
## install

项目使用 [node](http://nodejs.org) 和 [npm](https://npmjs.com)，请确保你本地安装了它们。

```sh
npm i @awefeng/state-machine
```

## Finite State Machine

有限状态机，[定义](https://zh.wikipedia.org/wiki/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)。

### 初始化一个FSM

1. 从包中引入`FiniteStateMachine`
2. 初始化一个`FSM`对象，其中`state`和`transitions`为必填项，`onTransiteError`为转换过程出现错误时的回调函数
3. `state`为默认状态
4. `transitions`为各状态之间的关系：`from`状态通过`event`时间到达下一状态`to`

```typescript
  import { FiniteStateMachine } from '@awefeng/state-machine'

  const fsm = new FiniteStateMachine({
    state: 'opened', // 默认状态
    transitions: [{
      // 门开启时关门流程，从状态“门开着的”通过事件“关门”到达下一状态“门关着的”
      { event: 'close', from: 'opened', to: 'closed' }, 
      {
        event: 'open',
        from: 'closed',
        to: 'opened',
        // beforeTransite 状态过渡前的回调函数，参数from,to,event
        beforeTransite: ({ from, to, event }) => {},
        // afterTransite 状态过渡后的回调函数，参数from,to,event
        afterTransite: ({ from, to, event }) => {},
        //  状态过渡的完以后需要执行的事件（某种意义上和afterTransite是一样的）
        action: ({ from, to, event }) => {}
      }
    }],
    // 转换状态时错误兜底函数
    onTransiteError: ({from, to, event}) => console.log
  })
```

### API
#### fsm.getState()
获取当前所在状态，返回值为当前`state`

#### fsm.setState(state)
设置当前状态，该API不会调用任何回调，只是单纯设置状态

#### fsm.getStateTransitions()
获取当前状态下可以进行的转换，返回值为部分`transitions`

#### fsm.canTransite(event)
获取当前状态下是否可以进行某一`event`的转换，返回值为`boolean`类型。例：`state`在`'closed'`状态下，`fsm.canTransite('close') //false`

#### fsm.getHistory()
获取状态改变的历史数据，返回值为一个数组`{from: string, to: string, event: string, type :'setState' |'transite'}[]`，其中type指的是通过`setState`改变或者通过`transite`改变。

#### fsm.transite(event?)
转换状态，将当前状态转换到下一状态，返回值为`boolean`类型，转换成功为`true`，失败为`false`。

如果关系图中当前状态没有传入的`event`关系，则转换失败。

如果当前状态下，该`event`只有一个关系图时，可以不传入`event`，因为是唯一的；如果不是唯一的（即当前状态对应多个下一状态），则必须指定`event`，否则转换失败。


### 欢迎贡献

非常欢迎！[提一个Issue](https://github.com/awefeng/state-machine/issues) 或者提交一个 Pull Request。
