# TypeScript 概述

TypeScript 是 JavaScript 的超集，在其原有基础上做了丰富、扩充。

可选的静态类型
基于类的面向对象编程

1. 编写项目 - 更利于架构维护
2. 自主检测 - 编译期间检测
3. 类型检测 - 支持了动态和静态类型检测 => 本质存在类型转换
4. 运行流程 - 依赖编译
5. 复杂特性 - 模块化、泛型、接口

更精准的类型提示和检查，将错误尽早的暴露在编译阶段，避免团队协作，单靠口头约定出现的规范执行问题

TypeScript 是结构化类型系统

类型的重要意义之一是**限制了数据的可用操作与实际意义**

## 执行工具
### `ts-node`

`ts-node index.ts`

**选项**
- `-P/--project`：指定 `tsconfig` 文件位置，默认查找项目下的 `tsconfig.json`
- `-T/--tanspileOnly`：禁用执行过程中的类型检查
- `--swc`：在 tanspileOnly 的基础上，使用 `swc` 来进行编译，提升执行速度
- `--emit`：执行的同时将编译产物输出到 `.ts-node` 文件夹下(与 `--compilerHost` 选项同时使用)

### `ts-node-dev`

```
ts-node-dev --respawn index.ts
// 全局安装
tsnd --respawn index.ts
```

**选项**
- respawn，启用监听重启