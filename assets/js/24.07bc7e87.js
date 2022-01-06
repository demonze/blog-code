(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{311:function(v,_,e){"use strict";e.r(_);var a=e(0),n=Object(a.a)({},(function(){var v=this,_=v.$createElement,e=v._self._c||_;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("h2",{attrs:{id:"内存限制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#内存限制","aria-hidden":"true"}},[v._v("#")]),v._v(" 内存限制")]),v._v(" "),e("p",[v._v("由于V8最开始就是为JavaScript在浏览器执行而打造的，不太可能遇到使用大量内存的场景，\n所以它可以申请的最大内存就没有设置太大，在64位系统下大约为1.4GB，在32位系统下大约为700MB。")]),v._v(" "),e("p",[v._v("但这只是一方面，其实还有另外两个最主要的原因")]),v._v(" "),e("ol",[e("li",[e("p",[e("code",[v._v("js单线程机制")]),v._v("：js是单线程的，意味着v8执行垃圾回收时，程序中的其他逻辑都要进入暂停等待阶段，\n直到垃圾回收结束后才会再次重新执行逻辑。\n因此，由于JS的单线程机制，垃圾回收的过程阻碍了主线程逻辑的执行。")])]),v._v(" "),e("li",[e("p",[e("code",[v._v("垃圾回收机制")]),v._v("：垃圾回收本身是一件非常耗内存的操作，假设V8的堆内存为1.5G，那么V8做一次小的\n垃圾回收需要50ms以上，而做一次非增量式回收甚至需要1s以上，可见其耗时之久，而在这1s的时间内，\n浏览器一直处于等待的状态，同时会失去对用户的响应，如果有动画正在运行，也会造成动画卡顿掉帧的情况，\n严重影响应用程序的性能。因此如果内存使用过高，那么必然会导致垃圾回收的过程缓慢，也就会导致\n主线程的等待时间越长，浏览器也就越长时间得不到响应。")])])]),v._v(" "),e("p",[v._v("基于以上两点，V8引擎为了减少对应用的性能造成的影响，采用了一种比较粗暴的手段，那就是直接限制堆内存的大小，\n毕竟在浏览器端一般也不会遇到需要操作几个G内存这样的场景。")]),v._v(" "),e("h2",{attrs:{id:"v8内存结构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#v8内存结构","aria-hidden":"true"}},[v._v("#")]),v._v(" v8内存结构")]),v._v(" "),e("p",[v._v("垃圾回收的过程主要出现在"),e("code",[v._v("新生代")]),v._v("和"),e("code",[v._v("老生代")]),v._v("，所以对于其他的部分我们没必要做太多的深入，\n有兴趣的小伙伴儿可以查阅下相关资料，V8的内存结构主要由以下几个部分组成:")]),v._v(" "),e("ul",[e("li",[e("p",[e("code",[v._v("新生代(new_space)")]),v._v("：大多数的对象开始都会被分配在这里，这个区域相对较小但是垃圾回收特别频繁，\n该区域被分为两半，一半用来分配内存，另一半用于在垃圾回收时将需要保留的对象复制过来。")])]),v._v(" "),e("li",[e("p",[e("code",[v._v("老生代(old_space)")]),v._v("：新生代中的对象在存活一段时间后就会被转移到老生代内存区，相对于新生代\n该内存区域的垃圾回收频率较低。老生代又分为老生代指针区和老生代数据区，前者包含大多数可能存在指向\n其他对象的指针的对象，后者只保存原始数据对象，这些对象没有指向其他对象的指针。")])]),v._v(" "),e("li",[e("p",[e("code",[v._v("大对象区(large_object_space)")]),v._v("：存放体积超越其他区域大小的对象，每个对象都会有自己的内存，\n垃圾回收不会移动大对象区。")])]),v._v(" "),e("li",[e("p",[e("code",[v._v("代码区(code_space)")]),v._v("：代码对象，会被分配在这里，唯一拥有执行权限的内存区域。")])]),v._v(" "),e("li",[e("p",[e("code",[v._v("map区(map_space)")]),v._v("：存放Cell和Map，每个区域都是存放相同大小的元素，结构简单。")])])]),v._v(" "),e("p",[e("img",{attrs:{src:"http://img.demonze.cn/blog/20200406_stack.jpg",alt:""}})]),v._v(" "),e("p",[v._v("上图中的带斜纹的区域代表暂未使用的内存，新生代(new_space)被划分为了两个部分，\n其中一部分叫做inactive new space，表示暂未激活的内存区域，另一部分为激活状态")]),v._v(" "),e("h2",{attrs:{id:"垃圾回收策略"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收策略","aria-hidden":"true"}},[v._v("#")]),v._v(" 垃圾回收策略")]),v._v(" "),e("h3",{attrs:{id:"新生代"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#新生代","aria-hidden":"true"}},[v._v("#")]),v._v(" 新生代")]),v._v(" "),e("p",[v._v("在V8引擎的内存结构中，新生代主要用于存放存活时间较短的对象。新生代内存是由两个semispace(半空间)构成的，\n内存最大值在64位系统和32位系统上分别为32MB和16MB，在新生代的垃圾回收过程中主要采用了Scavenge算法。")]),v._v(" "),e("p",[v._v("在Scavenge算法的具体实现中，主要采用了Cheney算法，它将新生代内存一分为二，每一个部分的空间称为"),e("code",[v._v("semispace")]),v._v("，\n也就是我们在上图中看见的"),e("code",[v._v("new_space")]),v._v("中划分的两个区域，其中处于激活状态的区域我们称为"),e("code",[v._v("From")]),v._v("空间，未激活(inactive\nnew space)的区域我们称为"),e("code",[v._v("To")]),v._v("空间。这两个空间中，始终只有一个处于使用状态，另一个处于闲置状态。")]),v._v(" "),e("p",[v._v("我们的程序中声明的对象首先会被分配到"),e("code",[v._v("From")]),v._v("空间，当进行垃圾回收时，如果"),e("code",[v._v("From")]),v._v("空间中尚有存活对象，\n则会被复制到"),e("code",[v._v("To")]),v._v("空间进行保存，非存活的对象会被自动回收。当复制完成后，"),e("code",[v._v("From")]),v._v("空间和"),e("code",[v._v("To")]),v._v("空间完成一次角色互换，\n"),e("code",[v._v("To")]),v._v("空间会变为新的"),e("code",[v._v("From")]),v._v("空间，原来的"),e("code",[v._v("From")]),v._v("空间则变为"),e("code",[v._v("To")]),v._v("空间。")]),v._v(" "),e("p",[e("code",[v._v("Scavenge")]),v._v("算法的垃圾回收过程主要就是将存活对象在From空间和To空间之间进行复制，\n同时完成两个空间之间的角色互换，因此该算法的缺点也比较明显，浪费了一半的内存用于复制。\n是一种典型的牺牲空间换取时间的算法。")]),v._v(" "),e("h3",{attrs:{id:"对象晋升"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#对象晋升","aria-hidden":"true"}},[v._v("#")]),v._v(" 对象晋升")]),v._v(" "),e("p",[v._v("当一个对象在经过多次复制之后依旧存活，那么它会被认为是一个生命周期较长的对象，在下一次进行垃圾回收时，\n该对象会被直接转移到老生代中，这种对象从新生代转移到老生代的过程我们称之为晋升。")]),v._v(" "),e("p",[v._v("对象晋升的条件主要有以下两个：")]),v._v(" "),e("ul",[e("li",[v._v("对象是否经历过一次Scavenge算法")]),v._v(" "),e("li",[v._v("To空间的内存占比是否已经超过25%")])]),v._v(" "),e("h3",{attrs:{id:"老生代"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#老生代","aria-hidden":"true"}},[v._v("#")]),v._v(" 老生代")]),v._v(" "),e("p",[v._v("在老生代中，因为管理着大量的存活对象，如果依旧使用"),e("code",[v._v("Scavenge")]),v._v("算法的话，很明显会浪费一半的内存，因此已经不再使用"),e("code",[v._v("Scavenge")]),v._v("算法，\n而是采用新的算法"),e("code",[v._v("Mark-Sweep(标记清除)")]),v._v("和"),e("code",[v._v("Mark-Compact(标记整理)")]),v._v("来进行管理。")]),v._v(" "),e("p",[e("code",[v._v("Mark-Sweep(标记清除)")]),v._v("分为"),e("code",[v._v("标记")]),v._v("和"),e("code",[v._v("清除")]),v._v("两个阶段，在标记阶段会遍历堆中的所有对象，然后标记活着的对象，在清除阶段中，\n会将死亡的对象进行清除。"),e("code",[v._v("Mark-Sweep")]),v._v("算法主要是通过判断某个对象是否可以被访问到，从而知道该对象是否应该被回收，具体步骤如下：")]),v._v(" "),e("ul",[e("li",[v._v("垃圾回收器会在内部构建一个根列表，用于从根节点出发去寻找那些可以被访问到的变量。比如在JavaScript中，window全局对象可以看成一个根节点。")]),v._v(" "),e("li",[v._v("然后，垃圾回收器从所有根节点出发，遍历其可以访问到的子节点，并将其标记为活动的，根节点不能到达的地方即为非活动的，将会被视为垃圾。")]),v._v(" "),e("li",[v._v("最后，垃圾回收器将会释放所有非活动的内存块，并将其归还给操作系统。")])]),v._v(" "),e("blockquote",[e("p",[v._v("以下几种情况都可以作为根节点：")]),v._v(" "),e("ol",[e("li",[v._v("全局对象")]),v._v(" "),e("li",[v._v("本地函数的局部变量和参数")]),v._v(" "),e("li",[v._v("当前嵌套调用链上的其他函数的变量和参数")])])]),v._v(" "),e("p",[v._v("但是Mark-Sweep算法存在一个问题，就是在经历过一次标记清除后，内存空间可能会出现不连续的状态，因为我们所清理的对象的内存地址可\n能不是连续的，所以就会出现内存碎片的问题，导致后面如果需要分配一个大对象而空闲内存不足以分配，就会提前触发垃圾回收，而这次垃圾回\n收其实是没必要的，因为我们确实有很多空闲内存，只不过是不连续的。")]),v._v(" "),e("p",[v._v("为了解决这种内存碎片的问题，"),e("code",[v._v("Mark-Compact(标记整理)")]),v._v("算法被提了出来，该算法主要就是用来解决内存的碎片化问题的，回收过程中\n将死亡对象清除后，在整理的过程中，会将活动的对象往堆内存的一端进行移动，移动完成后再清理掉边界外的全部内存")]),v._v(" "),e("p",[v._v("为了减少垃圾回收带来的停顿时间，V8引擎又引入了"),e("code",[v._v("Incremental Marking(增量标记)")]),v._v("的概念，即将原本需要一次性遍历堆内存的操作改为\n增量标记的方式，先标记堆内存中的一部分对象，然后暂停，将执行权重新交给JS主线程，待主线程任务执行完毕后再从原来暂停标记的地方继\n续标记，直到标记完整个堆内存。这个理念其实有点像React框架中的Fiber架构，只有在浏览器的空闲时间才会去遍历Fiber Tree执行对应\n的任务，否则延迟执行，尽可能少地影响主线程的任务，避免应用卡顿，提升应用性能。")]),v._v(" "),e("p",[v._v("得益于增量标记的好处，V8引擎后续继续引入了"),e("code",[v._v("延迟清理(lazy sweeping)")]),v._v("和"),e("code",[v._v("增量式整理(incremental compaction)")]),v._v("，让清理和整理的\n过程也变成增量式的。同时为了充分利用多核CPU的性能，也将引入"),e("code",[v._v("并行标记")]),v._v("和"),e("code",[v._v("并行清理")]),v._v("，进一步地减少垃圾回收对主线程的影响，为应用提升更多的性能。")]),v._v(" "),e("p",[v._v("参考：")]),v._v(" "),e("ol",[e("li",[e("a",{attrs:{href:"https://juejin.im/post/5de909436fb9a016583595b1",target:"_blank",rel:"noopener noreferrer"}},[v._v("一文搞懂V8引擎的垃圾回收"),e("OutboundLink")],1)]),v._v(" "),e("li",[e("a",{attrs:{href:"https://juejin.im/post/5ad3f1156fb9a028b86e78be",target:"_blank",rel:"noopener noreferrer"}},[v._v("聊聊V8引擎的垃圾回收"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);_.default=n.exports}}]);