---
title: tree命令的使用技巧
tags:
    - 工具类
    - tree
createTime: 2025/01/03 10:09:11
permalink: /article/oqs2iroa/
---

## tree 命令的介绍

tree 命令是一个以树状图列出目录的内容的命令行工具。它可以帮助我们直接地了解目录结构，在项目文档编写和目录结构展示非常有用。

### 安装方法

**Linux/Ubutun/Debian**
``` bash
apt-get install tree

```

**macOS**
``` bash 
brew install tree

```

**Windows**
Windows 10 以上的版本已经内置了 tree 命令，如果没有可以通过 [GnuWin32](http://gnuwin32.sourceforge.net/packages/tree.htm) 下载安装。

#### 基本用法

1. **显示当前的树状结构**

``` bash 
tree

```

2. **限制目录显示层级**

``` bash
tree -L 2 # 只显示两层

```

3. **只显示目录**

``` bash
tree -d
```

4. **显示文件的大小**

``` bash
tree -h # 以人类可读的格式显示大小

```

### 常见参数

| 参数 | 说明 |
|------|------|
| -a | 显示所有文件,包括隐藏文件 |
| -d | 只显示目录 |
| -f | 显示完整的相对路径 |
| -i | 不显示树枝(连接线) |
| -L n | 限制目录显示层级为 n 层 |
| -h | 显示文件大小 |
| -I | 忽略特定文件 |
| --dirsfirst | 目录优先显示 |

### 进阶用法

1. **过滤特定文件或目录**

忽略 node_modules 和 .git 目录

``` bash

    tree -I "node_modules | .git"

```

2. **输出到文件**

``` bash

tree > tree.txt

```

3. **自定义输出格式**

``` bash

# 只显示目录，并限制两层
tree -dL 2 --dirsfirst

```

4. **显示文件权限**

``` bash

tree -p

```

### 实用示例

1. **生成项目结构文档**

``` bash
# 生成不包含 node_modules 和 .git 的项目结构
tree -I 'node_modules|.git' -L 3 > project-structure.md

```

2. **查看特定类型文件**

``` bash 
# 只显示 .js 文件

tree -P '.js'

```

3. **统计文件数量**

``` bash 
tree --prune # 显示文件和目录的总数

```

### 在文档中的应用

当你需要在文档中展示项目结构时,可以这样使用:

``` bash

tree -L 2

```

### 注意事项

1. **大型目录处理**
- 对于大型目录,建议使用 `-L` 限制层级
- 可以使用 `-I` 排除不需要显示的目录

2. **输出格式**
- 默认输出是 ASCII 字符
- 可以使用 `--charset` 参数指定其他字符集

3. **性能考虑**
- 处理大型目录时可能会比较慢
- 建议使用过滤参数减少输出内容

### 常见问题

1. **中文乱码**

``` bash 
# 使用 UTF-8 字符集

tree --charset=utf-8

```

2. **输出太多**

``` bash

# 限制输出深度和内容

tree -L 2 -I 'node_modules|.git|dist'

```

3. **权限问题**

``` bash 

# 使用 sudo 获取权限
sudo tree /some/restricted/path

```

### 最佳实践

1. **在项目文档中使用**
- 生成项目结构时排除不必要的目录
- 使用适当的层级限制
- 考虑添加到 .gitignore 中的文件不需要显示

2. **日常使用**
- 创建别名简化常用命令
- 结合其他命令使用(如 grep)
- 适当使用过滤器提高效率

3. **输出美化**
- 使用 `--dirsfirst` 使结构更清晰
- 考虑使用 `-h` 显示文件大小
- 适当使用颜色标记(`-C`)
