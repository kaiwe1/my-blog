---
title: '如何阅读链上交易数据'
slug: 'read-block-data'
published_at: '2025-07-26'
updated_at: '2025-07-26'
tag: ['eth']
description: '当我们通过钱包和智能合约交互时, 区块链上发生了什么?'
---

当我们使用钱包, 例如MetaMask/OKX Wallet与智能合约进行交互时, 区块链发生了什么? 让我们以一个实际协议存款的案例来分析.

## 场景分析
当我们对某个协议提供的理财APY感到满意, 从网页前端点击存款, 调用某个智能合约的 deposit() 方法存入 500 USDC.

### 1. 钱包发起交易
1. 你点击 dApp 页面上的 deposit
- 前端JS代码构造一个交易请求（如调用 deposit() 函数，参数等信息）
- dApp 使用 ethers.js / web3.js 向你的钱包发出签名请求

2. 钱包弹窗显示交易详情
- 钱包展示你要调用哪个合约、哪个方法、消耗多少gas、最多付多少钱。
- 你点击“确认” ⇒ 钱包用你的私钥对交易签名。

### 2. 发送签名交易 & 广播

3. 钱包将签名交易广播给网络
- 交易被发送到一个以太坊节点（本地或infura、Alchemy等提供的RPC节点）。
4. 节点将你的交易广播给其他节点
- 所有节点收到你的交易，把它放进一个 “交易池”（mempool）中等待执行。

### 3. 区块打包 & 执行
5. 轮到某个验证者成为“区块提议者”
- 它从mempool里挑选一些交易（比如你的交易），打包成一个新区块。

6. 这个区块在链上执行
- 以太坊EVM运行 deposit() 函数：把你的 500 USDC 从你地址转入合约、记录状态变更。
如果执行成功 ⇒ 交易被打包进区块，状态写入链中。

### 4. 区块被确认 & 你看到最终结果
7. 区块被其他验证者 attestation，最终确认

- 多个验证者投票这个区块是合法的。
- 一旦确认，你的交易就“上链了”。

8. 你在钱包或区块浏览器看到结果

- 成功执行（状态改变，事件触发）或失败（例如revert或out-of-gas）。
- 交易收据中包含：gas使用量、日志、事件、状态码等。

## BaseScan案例
在理解了区块链在背后完成的动作后, 我们看一个BaseScan(Base 是一个以太坊的二层网络)上真实的存款案例, 这是一位用户调用 yoUSD Token 的 deposit 函数的一笔交易.

![Transaction案例](https://6n9ck0v3cffymhqw.public.blob.vercel-storage.com/read-block-data/transaction.png)

从上至下的信息依次是:
- 交易哈希: 一笔交易的唯一标识符
- 状态: 成功/失败
- 区块: 当前交易被包含在哪一个区块中
- 时间戳: 交易发送的时间
- From: 用户地址
- Interacted With: 智能合约地址
- ERC-20 Tokens Transfered: ERC-20 代币转账信息
- Value: 价值, 通常对于智能合约交互来说, 价值为0
- Transaction Fee: 交易费, 支付给验证者(即质押者)的费用. 当我们拥有32个ETH时, 我们可以自建节点进行以太坊质押, 参与到区块提议、打包交易、验证区块中来, 同时获取ETH奖励.
- Gas Price: 当我们执行 deposit 时, 我们实际上执行了智能合约的函数, 这个函数的复杂程度决定了我们需要的 Gas, 而 Gas Price 就是我们需要对这次交易执行代码需要支付的单位成本.

![Transaction案例](https://6n9ck0v3cffymhqw.public.blob.vercel-storage.com/read-block-data/block.png)