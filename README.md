# TSTL

## TSTL(Typescript STL)
类似C++ STL的一个项目，目的是为Javascript引入常见的数据结构和算法

### 功能概述
1. 容器：各种数据结构，如 vector, list, map, set等，用来存放数据，主要分为两类：
    1. 序列式容器：vector, list, deque, slist
    2. 关联式容器：set, map, multiset, mulitmap, unordered_set, unordered_map
2. 迭代器：容器与算法之间的胶合剂，比如：begin(), end()等。所有容器都有自己专属的迭代器，因为只有容器设计者才知道如何遍历自己的元素
3. 算法： 各种常见的算法，如sort，search，copy，erase等
4. 仿函数（functor）:
5. 配接器（adapter）:  一种用来修饰容器、仿函数、迭代器的接口的东西。比如，queue，stack等，虽然看似是容器，其实是一种配接器，其底层全部借助deque
6. 配置器（allocators）: 负责空间配置与管理，js不能自处理，这部分没有对应


### 容器
容器就是数据结构，比如array bst red_black_tree等。任何特定的数据结构都是为了实现特定的算法。根据STL的划分，我们可以把容器分为两大类：

#### 1. 序列式容器
所谓序列式容器，其中的元素都可序（ordered），但未必有序（sorted）。本项目提供：vector, list, deque, stack, queue, priority_queue等序列式容器（stack, queue实现上其实是一种配接器，但我们可以直接将其视为一种容器）。其中
各个容器主要的区别与特点有：

1. **vector**：vector是一个可以动态调整大小的数组（这里的数组是指C++这类的静态数组，但其实JS数组本身就可以动态分配，所以内部实现就是基于一个数组），其存储空间是连续的（因为V8对JS数组实现上，数组可能实质上是一个hash_map，所以不一定空间连续，但对用户方来说，完全不影响，这样讲只为更严谨一些）。

2. **list**: list相比于vector的连续空间，实现上是一个循环双端链表，这样可以每次删除或插入都是O(1)的复杂度，同时空间复杂度更低。

3. **deque**: vector是一个单向开口的连续性空间，deque则是一种双向开口的连续性空间。所谓双向开口，意思就是可以在头尾两端分别做元素的插入和删除。当然也可以在vector头部做操作，但从技术上讲，效率太低。

4. **stack**: stack是一种先进后出的数据结构。他只有一个口运行元素操作。实现上只需要以一个deque作为基础数据结构，并关闭deque的尾端的操作，变可以实现。而只是修改容器接口，就可以实现的方式，我们称为adapter（配接器）。

5. **queue**: queue是中先进先出的数据结构，它有两个出口。但只能从尾部加入（推入），头部取出（推出）。没有其他方式存取queue的其他元素。换言之，queue不允许有遍历行为。将元素推入的操作称为 push, 推出称为pop。实现上仍可以基于deque，也就是说queue是一种配接器。

6. **priority_queue**: priority_queue是一个拥有权值概念的queue，由于是一个queue，所以操作还是只能在容器的两头。priority_queue带有权值，其内部的元素并非依照被推入的次序排列，而是自动按照元素的权值排列。默认权值高者在前。

7. **slist**: list是一个双向链表，同时也提供一个单向链表slist。主要的区别就是slist的迭代器是单向的，而后者是双向的。

#### 2. 关联式容器
所谓关联式容器，观念上类似观念数据库。每个元素都有一个键值(key)和实值(value)， 当元素被插入关联容器中时，容器内部结构便依照其键值的大小，以某种特定规则将这个元素放置于适当的位置。关联容器没有所谓的头尾（只有最大元素和最小元素）。

标准的STL的关联容器分为set(集合)和map(映射表)两大类，以及这两大类衍生体multiset(多键集合)和multimap(多键映射表)。这些容器的底层机制均以red_black_tree(红黑树)完成。red_black_tree也是一个独立容器，但是是内部实现。
此外，STL还提供一个关联式容器: hash_table(散列表)，以及以此hash_table为底层机制实现的hash_set(散列集合)和hash_map(散列映射表)，hash_multiset(散列多键集合)，hash_multimap(散列多键映射)。

值得注意的是，STL的hash_table与js的map是有区别的，js的map是insertsorted，也就是按插入排序的，STL的hash_map则没有排序。

1. **set**: set的特性是，所有元素都会根据元素的键值自动排序。set的元素不像map那样可以同时拥有实值(value)和键值(key)，set元素的键值就是实值。

2. **map**: map的特性是，所有元素都会根据键值自动被排序，map的所有元素都同时拥有实值(value)和键值(key)。

3. **multiset**: mulitset和set特性完全一致，唯一区别在于它允许键值重复。

4. **multimap**: mulitmap和map特性完全一致，唯一区别在于它允许键值重复。

5. **hashtable**: map，set都是基于红黑树的，所以操作有log(n)的复杂度。而hashtable结构在主要操作上有常数级别的复杂度。

6. **hashset**: hashset是基于hashtable的set结构，使用方式与set完全一致，与set的区别是set的元素有自动排序功能而hashset没有。

7. **hashmap**: hashmap是基于hashtable的map结构，使用方式与map完全一致，与set的区别是set的元素有自动排序功能而hashset没有。

8. **hash_multiset**:hash_multiset是基于hashtable的multiset结构，使用方式与multiset完全一致，与hash_set的区别是可以有重复的键值。

9. **hash_multismap**:hash_multimap是基于hashtable的multimap结构，使用方式与multimap完全一致，与hash_map的区别是可以有重复的键值。

### 迭代器
迭代器是一种抽象的设计概念和设计模式，其定义为：提供一种方法，使之能够依次序巡防某个容器所含有的各个元素，而又无需暴露该容器的内部表示方式。

STL的中心思想在于：将数据容器(containers)和算法(alorithms)分开，彼此独立设计，最后再用迭代器将其粘合在一起。换个角度我们可以发现，所有STL的算法都作用在由迭代器[first, last)所标示出来的区间上。

常用的迭代器有，begin(), end(), cbegin(), cend()。一些算法返回的通常也是一个迭代器，比如：find(), insert()等。

### 算法
算法主要的目的是，以有限的步骤，解决逻辑和数学上的问题。STL主要集中一些有复用价值的算法，比如：排序(sort)，查找(search)，排列组合(premutation)，以及用于数据移动，复制，删除，比较，组合，运算等常用算。

特定的算法往往需要搭配特定的数据结构，比如BST，red_black_tree，hashtable能快速查找。heap可以完成堆排序等。

为了能和容器独立开来，STL设计了迭代器，所有STL的算法都作用在由迭代器[first, last)所标示出来的区间上

### 仿函数
待写

### 配接器
配接器也是一种设计模式，其定义为：将一个class的接口转换为另一class的接口，使原本因接口不兼容而不能合作的class，可以一起运作。

STL提供不同的配接器，改变容器接口的containers adapter(比如, stack, queue)，和改变迭代器接口的iterator adapter(比如，insert iterator， reverse iterator), 有改变仿函数接口的function adapter(比如，bind, negate)

### 引用参考
[STL源码剖析](https://book.douban.com/subject/1110934/)