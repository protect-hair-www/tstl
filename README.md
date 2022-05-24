# About 
It's a project like C++ STL for Typescript. Include regular data structures (TreeSet, TreeMap, LinkedList) and algorithms (binary_search, partition, merge).

Contributions are welcome!

# Components
- [x] Associative container 
    - [x] Set(TreeSet)
    - [x] Map(TreeMap)
    - [x] MultiSet
    - [x] MultiMap
    - [ ] HashSet
    - [ ] HashMap
    - [ ] HashMultiMap
    - [ ] HashMultiSet
- [x] Sqeuence container 
    - [x] Vector
    - [x] List
    - [x] Deque 
    - [ ]  Slist
- [x] Adapter
    - [x] Stack
    - [x] Queue 
    - [x] PriorityQueue 
    - [x] Heap
- [x] Algorithms
    - [x] binary_search
    - [x] none_modifying
    - [x] modifying
    - [x] merge
    - [x] parition
    - [x] sort
- [x] Iterator
    - [x] input
    - [x] output
    - [x] forward
    - [x] bidirectional
    - [x] random
- [x] Functor
    - [x] comparable
    - [x] relations
    - [ ] arithmetic
    - [ ] logic

# Features
1. **Container**：A container is a holder object that stores a collection of other objects (its elements). The container manages the storage space for its elements and provides member functions to access them, either directly or through iterators.

    1. **Sequence**：vector, list, deque, slist, queue, priority_queue, stack
    2. **Associative**：set, map, multiset, mulitmap, unordered_set, unordered_map

2. **Iterator**：An iterator is an object that, pointing to some element in a range of elements. Depending on the properties
supported by iteators, they are calssified into five diffrent categories:

   1. Input_Iterator
   2. Output_Iterator
   3. Forward_Iterator
   4. Bidirectional_Iterator
   5. Random_Access_Iterator

3. **Algorithms**： Algorithms act on containers. all algorithms operate on the range indicated by the iterator [first, last). they are calssified into six diffrent categories.
    1. Merge
    2. NoneModifying
    3. Modifying
    4. Partition
    5. Sort
    6. BinarySearch
    7. Heap

4. **Functor**: A function objects is simply any object of a class that provides at least one definition for operator() What this means is that if you then declare an object f of the class in which this operator() is defined you can subsequently use that object f just like you would use an "ordinary" function.
    1. Arithmetic
    2. Relational
    3. Logical
    4. Comparable

5. **Adapter**: The adapter is a design pattern, which is defined as converting the interface of one class to the interface of another class so that the classes that cannot cooperate due to incompatible interfaces can work together.
    1. Containers adapter
    2. Iterator adapter
    3. Function adapter

# Project Structure
```
TSTL
|
|___src 
|    |  index // main entry
|    |  
|    |___adapter
|    |    |  index
|    |    |  queue
|    |    |  stack
|    |___algorithm
|    |     |  index
|    |     |  binary_search
|    |     |  merge
|    |     |  heap
|    |     |  none_modifying
|    |     |  modifying
|    |     |  sort
|    |     |  partition
|    |___container
|    |     |  index
|    |     |___associative 
|    |     |    |   set
|    |     |    |   map
|    |     |    |   multiset
|    |     |    |   multimap
|    |     |    |   hash_set
|    |     |    |   hash_map
|    |     |    |   hash_multiset
|    |     |    |   hash_mulitmap
|    |     |___sequence
|    |     |    |   vector
|    |     |    |   deque
|    |     |    |   list
|    |     |    |   slist
|    |     |    |   heap(adapter internaly implementation)
|    |     |    |   queue
|    |     |    |   priority_queue
|    |     |___tree // associative container internally implementation datastruct(red black tree)
|    |     |    |   index   // entry
|    |     |    |   RBTNode // tree node
|    |     |    |   tree    // red black tree implementation
|    |     |    |   iterator 
|    |___iterator
|    |     |  index
|    |     |  base_iterator
|    |     |  input_iterator
|    |     |  output_iterator
|    |     |  forward_iterator
|    |     |  bidirectional_iterator
|    |     |  random_access_iterator
|    |     |  iterable
|    |___functor
|    |     |  index 
|    |     |  arithmitic
|    |     |  relational
|    |     |  logic
|    |     |  identity
|    |___utils
|    |     |  ...
|    |     |  assert
|    |     |  copy 
|    |     |  object
|    |     |  jstype
|    |     |  ...
|    |____test__ 
|    |     |  ...
|    |     |  algorithms
|    |     |  ...
│___ ...
│___ project config files
│___ ...
```

# Links 
1. [STL源码剖析](https://book.douban.com/subject/1110934/)  
2. [GCC STL 源码](https://github.com/gcc-mirror/gcc/tree/master/libstdc%2B%2B-v3/include/bits)  
3. [Standard C++ Library reference](https://www.cplusplus.com/reference/)
4. [C++ reference](https://en.cppreference.com/w/)