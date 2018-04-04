window.ydoc_plugin_search_json = {
  "教程": [
    {
      "title": "YApi",
      "content": "在开始使用 YApi 之前，我们先来熟悉一下 YApi 的网站结构，这将让你快速了解YApi。",
      "url": "/documents/index.html",
      "children": [
        {
          "title": "登录与注册",
          "url": "/documents/index.html#登录与注册",
          "content": "登录与注册想要使用 YApi ，首先要注册账号。"
        },
        {
          "title": "首页",
          "url": "/documents/index.html#首页",
          "content": "首页登录后进入首页，首页展示了分组与项目。此时你作为新用户，没有任何分组与项目的权限，因此只能搜索、浏览 “公开项目” 的接口，如果在首页找不到任何项目，请联系管理员将你加入对应项目。1首页头部展示了当前所在的位置、搜索框、新建项目、查看文档和用户信息。2首页左侧展示分组信息，“分组”是“项目”的集合，只有超级管理员可以管理分组。3首页右侧是分组下的项目和成员列表，点击左侧的某个分组，右侧会出现该分组下的项目和成员信息。4点击项目右上角的星星即可关注项目，关注的项目可以在“我的关注”页面查看。"
        },
        {
          "title": "项目页",
          "url": "/documents/index.html#项目页",
          "content": "项目页点击一个项目，进入项目页，项目页展示了属于该项目的全部接口，并提供项目、接口的全部操作。此时你作为新用户，只能浏览接口信息，不可以编辑项目或接口，如果需要编辑，请联系管理员将你加入该项目。1项目页左侧的 “接口列表” 展示了该项目下的所有接口，右侧默认显示该项目下所有接口的列表。2点击左侧的某个接口，右侧会出现“预览”、“编辑”和“运行”。3点击左侧的 “测试集合” 使用测试集功能。4点击二级导航的“设置”，项目组长即可编辑项目信息和管理成员列表。5点击二级导航的“动态”，即可查看项目的操作日志。"
        },
        {
          "title": "个人中心",
          "url": "/documents/index.html#个人中心",
          "content": "个人中心鼠标移动到右上角的用户头像或用户名上，即可点击“个人中心”查看个人信息。在个人信息页面可以查看并修改自己的用户名、密码等信息。"
        }
      ]
    },
    {
      "title": "如何创建接口？",
      "content": "把大象装进冰箱分几步？三步：把冰箱门打开，把大象装进去，关门，搞定~新建接口分几步？也是三步：获取权限\n找到一个项目\n新建接口\n搞定~",
      "url": "/documents/quickstart.html",
      "children": [
        {
          "title": "获取权限",
          "url": "/documents/quickstart.html#获取权限",
          "content": "获取权限新用户登录拥有 个人空间 分组下的全部权限，个人空间分组仅自己可见，因此可以在这里任意试用 YApi 的功能。除此以外没有任何项目或分组的权限，只能浏览已存在分组下面的公开项目。如果找不到想找的项目，可能是尚未成为项目成员，此时应联系 项目组长 将你加入该项目。怎样联系组长？想创建分组，请看: 创建分组\n想创建项目，请看: 创建项目\n想了解更多权限信息，请查看权限列表\n"
        },
        {
          "title": "选择项目",
          "url": "/documents/quickstart.html#选择项目",
          "content": "选择项目\n如果你已经登录，会在首页右侧看到一些项目 (可以在左侧的分组列表切换分组来查看不同分组下的项目)。\n\n\n点击一个项目，进入该项目的详情页。\n\n"
        },
        {
          "title": "新建接口",
          "url": "/documents/quickstart.html#新建接口",
          "content": "新建接口点击左侧接口分组右侧的菜单按钮，选择 添加接口，或者点击接口列表右上角的 添加接口。\n选择接口分类，输入接口名称和接口路径，点击 提交。\n恭喜你！创建了第一个YApi的接口，你可以看到在左侧看到接口名称，右侧有该接口的信息预览。\n"
        }
      ]
    },
    {
      "title": "权限权利",
      "content": "接口管理的逻辑较为复杂，操作频率高，层层审批将严重拖慢生产效率，因此传统的金字塔管理模式并不适用。YApi 将扁平化管理模式的思想引入到产品的权限管理中，超级管理员 拥有最高的权限，并将权限分配给若干 组长，超级管理员 只需管理组长 即可，实际上管理YAPI各大分组与项目的是“组长”。组长对分组或项目负责，一般由BU负责人/项目负责人担任。",
      "url": "/documents/manage.html",
      "children": [
        {
          "title": "认识组长",
          "url": "/documents/manage.html#认识组长",
          "content": "认识组长组长分为 分组组长 与 项目组长，他们的关系就是 一个分组内有若干 分组组长 ，这些 分组组长 在创建项目时就可以指定 项目组长。因此他们在职责上的区别就在于 分组组长 对分组负责 项目组长 对项目负责，二者其他具体区别如下：分组组长 的权限包括修改分组、删除分组、创建分组下的项目。一般来说，分组组长 只需要对项目负责，将项目的操作任务安排给 项目组长 处理即可。项目组长 只属于某一个项目因此它无法操作项目所属分组，但拥有项目的全部权限，项目组长 是 YApi 的基层管理者，承担了 YApi 绝大部分的日常管理工作。"
        },
        {
          "title": "创建分组",
          "url": "/documents/manage.html#创建分组",
          "content": "创建分组只有 超级管理员 有权限创建分组"
        },
        {
          "title": "创建项目",
          "url": "/documents/manage.html#创建项目",
          "content": "创建项目成为 分组成员，即可在分组中创建项目。想成为 分组组长 ，在分组成员列表中找到 分组组长，联系 分组组长 将你设置为分组组长。\n怎样联系组长？"
        },
        {
          "title": "权限列表",
          "url": "/documents/manage.html#权限列表",
          "content": "权限列表新用户未加入项目或分组时，我们称为 “游客”。"
        },
        {
          "title": "项目权限",
          "url": "/documents/manage.html#权限列表-项目权限",
          "content": "项目权限\n\n操作\n游客\n项目开发者\n项目组长\n超级管理员\n\n\n\n\n浏览公开项目与接口\n✓\n✓\n✓\n✓\n\n\n浏览私有项目与接口\n\n✓\n✓\n✓\n\n\n编辑项目信息\n\n✓\n✓\n✓\n\n\n新建接口\n\n✓\n✓\n✓\n\n\n编辑接口\n\n✓\n✓\n✓\n\n\n编辑项目头像\n\n\n✓\n✓\n\n\n删除项目\n\n\n✓\n✓\n\n\n"
        },
        {
          "title": "分组权限",
          "url": "/documents/manage.html#权限列表-分组权限",
          "content": "分组权限\n\n操作\n游客\n分组开发者\n分组组长\n超级管理员\n\n\n\n\n浏览分组\n✓\n✓\n✓\n✓\n\n\n在分组中新建项目\n\n✓\n✓\n✓\n\n\n编辑分组信息\n\n\n✓\n✓\n\n\n管理分组成员\n\n\n✓\n✓\n\n\n删除分组\n\n\n✓\n✓\n\n\n"
        }
      ]
    },
    {
      "title": "项目操作",
      "content": "",
      "url": "/documents/project.html",
      "children": [
        {
          "title": "新建项目",
          "url": "/documents/project.html#新建项目",
          "content": "新建项目点击右上角的 + 新建项目，进入新建项目页面。在新建项目页，填写项目信息：\n项目名称不允许重复，包括其他分组\n基本路径为接口统一添加了前缀\n新建项目页只列出了部分配置，其他详细配置(环境配置、项目图标等)需要进入项目页的“设置”面板进行配置。\n\n"
        },
        {
          "title": "修改项目",
          "url": "/documents/project.html#修改项目",
          "content": "修改项目在项目页点击上方的 设置 Tab 进入项目设置面板，这个面板涵盖了项目的所有配置。这里比新建项目页面新增的功能如下："
        },
        {
          "title": "修改项目图标",
          "url": "/documents/project.html#修改项目-修改项目图标",
          "content": "修改项目图标点击项目图标，可以修改图标及背景色："
        },
        {
          "title": "删除项目",
          "url": "/documents/project.html#删除项目",
          "content": "删除项目点击下方的删除按钮，输入项目名称进行删除。删除项目是高风险操作，因此 YApi 对这个操作进行了特别的约束。\n"
        },
        {
          "title": "配置环境",
          "url": "/documents/project.html#配置环境",
          "content": "配置环境环境配置 一项可以添加该项目下接口的实际环境，供 接口测试 使用，这里增加了全局header，可以在项目中设置全局header值。在接口运行页面的选择环境select中也增加环境配置弹层。"
        },
        {
          "title": "请求配置",
          "url": "/documents/project.html#请求配置",
          "content": "请求配置通过自定义 js 脚本方式改变请求的参数和返回的 response 数据"
        },
        {
          "title": "请求参数示例",
          "url": "/documents/project.html#请求配置-请求参数示例",
          "content": "请求参数示例以 jquery ajax 为例，假设当前的请求参数是{  url: '/api/user?id=1',\n  method: 'POST',\n  headers: {\n    xxx: 'xxx'\n  },\n  data: {\n    type: 1\n  }\n}\n那么公共变量 context 包含以下属性：context = {  pathname: '/api/user',\n  query: {\n    id: 1\n  },\n  requestHeader: {\n    xxx: 'xxx'\n  },\n  method: 'POST',\n  requestBody: {\n    type:1\n  }\n}\n假设我们需要在 url 增加一个 token 参数，可以写如下自定义脚本：context.query.token = context.utils.md5(context.pathname + 'salt');\n"
        },
        {
          "title": "返回数据示例",
          "url": "/documents/project.html#请求配置-返回数据示例",
          "content": "返回数据示例在上面的示例请求完成后，假设返回 responseBody={a:1},公共变量 context 包含以下属性：context = {  pathname: '/api/user',\n  query: {\n    id: 1\n  },\n  requestHeader: {\n    xxx: 'xxx'\n  },\n  method: 'POST',\n  requestBody: {\n    type:1\n  },\n  responseData: {\n    a:1\n  },\n  responseHeader: {\n    content-type: 'application/json'\n    ...\n  }\n}\n假设我们需要修改响应数据 responseBody a 的值为 2，可以填写如下自定义脚本：context.responseBody.a = 2;\n"
        },
        {
          "title": "工具函数",
          "url": "/documents/project.html#请求配置-工具函数",
          "content": "工具函数context.utils = {  _         //underscore 函数,详细 API 查看官网 http://underscorejs.org/\n  base64    //转换字符串为 base64 编码\n  md5       //转换字符串为 md5 编码\n  sha1      //转换字符串为 sha1 编码\n  sha224    //转换字符串为 sha224 编码\n  sha256    //转换字符串为 sha256 编码\n  sha384    //转换字符串为 sha384 编码\n  sha512    //转换字符串为 sha512 编码\n  unbase64  //转换 base64 编码为字符串  \n}\n"
        },
        {
          "title": "token配置",
          "url": "/documents/project.html#token配置",
          "content": "token配置每个项目都有唯一的标识token，用户可以使用这个token值来请求项目的所有资源数据。目前用到的地方是接口的自动化测试，用户不需要登录就可以访问接口测试结果信息。"
        }
      ]
    },
    {
      "title": "接口设置",
      "content": "进入项目页，可以看到项目下的所有接口，需要注意的是，YApi有 接口集合 和 测试集合 两个概念。接口集合 将接口进行分类，使结构结构更清晰，一个接口只能属于一个集合，且不允许与其他接口重名。\n测试集合 为了方便我们测试接口，测试集合 将若干接口组合在一起，在这里一个接口可以属于不同集合。\n",
      "url": "/documents/api.html",
      "children": [
        {
          "title": "接口配置",
          "url": "/documents/api.html#接口配置",
          "content": "接口配置新建接口 后，点击新添加的接口，右侧可以看到接口的预览信息，点击右侧的 编辑 Tab项进入编辑面板。在该面板中你可以看到接口的基本信息(接口名称、分类、路径)，除此以外，你还可以完善以下接口信息："
        },
        {
          "title": "基本设置",
          "url": "/documents/api.html#接口配置-基本设置",
          "content": "基本设置接口路径：可以更改 HTTP 请求方式，并且支持 restful 动态路由，例如 /api/{id}/{name}, id和name是动态参数\n选择分类：可以更改接口所在分类\n状态：用于标识接口是否开发完成。\n"
        },
        {
          "title": "请求参数设置",
          "url": "/documents/api.html#接口配置-请求参数设置",
          "content": "请求参数设置Query参数： 接口 url 的查询字符串，点击『添加Query参数』按钮来添加参数，可以通过拖动来交换参数位置\n请求Body：http 请求 body 部分，如果http请求方式是 post, put 等请求方式时会有 req_body 部分。req_body_type 形式有4种，分别是 form, json, file 和 raw 。\nHeaders:  http 请求头字段，在 req_body 形式是 form 格式下会在 header 中自动生成 'Content-Type\tapplication/x-www-form-urlencoded'，其他3种格式也会自动生成不同 header\n"
        },
        {
          "title": "返回数据设置",
          "url": "/documents/api.html#接口配置-返回数据设置",
          "content": "返回数据设置返回数据分为 json & raw 两种形式。基于 mockjs （具体使用方法详见Mock 介绍）和 json5，使用注释方式写参数说明。 为了方便数据编写可以按F9来使用全局编辑\n选择json-schema 则进入了 json 结构可视化编辑器形式, 数据以 json schema 格式解析 快速入门 Json Schema 。\n"
        },
        {
          "title": "备注 & 其他",
          "url": "/documents/api.html#接口配置-备注-&-其他",
          "content": "备注 & 其他接口描述: 用简短的文字描述接口的作用。\n邮件通知：开启后将此次接口的改动以邮件的形式发送至项目组所有成员和关注该项目的成员（邮件默认情况下自动开启）\n开放接口：默认为关闭状态，用户可以在 数据导出 时选择只导出公开接口\n"
        },
        {
          "title": "接口运行",
          "url": "/documents/api.html#接口运行",
          "content": "接口运行接口运行功能，是用来测试真实接口的，类似『Postman』的功能。点击运行 tab ,可进入到接口测试页面，首先安装\b『chrome crossRequest』扩展，才可正常使用此功能。点击保存按钮可把当前接口保存到测试集，方便下次调试。安装完插件记得刷新页面\n"
        }
      ]
    },
    {
      "title": "Mock介绍",
      "content": " YApi的 Mock 功能可以根据用户的输入接口信息如协议、URL、接口名、请求头、请求参数、返回数据（[返回数据](#mock)）生成 Mock 接口，这些接口会自动生成模拟数据，创建者可以自由构造需要的数据。 mock地址解析：YApi平台网址 + mock + 您的项目id +\b 接口实际请求path假设你 YApi 的部署地址为：http://yapi.xxx.com 然后用这个地址作为示例mockd 地址： http://yapi.xxx.com/mock/29/api/hackathon/login注：项目 id 可以在项目设置里查看到\n",
      "url": "/documents/mock.html",
      "children": [
        {
          "title": "定义 mock 数据示例",
          "url": "/documents/mock.html#定义-mock-数据示例",
          "content": "定义 mock 数据示例项目 -> 接口编辑 -> 返回数据设置返回数据设置有两种方式，最新版本默认是基于 json-schema 定义数据结构，另外一种是基于 json+注释 的方式,请根据实际情况灵活选择使用。"
        },
        {
          "title": "方式1. json-schema",
          "url": "/documents/mock.html#方式1.-json-schema",
          "content": "方式1. json-schema开启 json-schema 功能后，将不再使用 mockjs 解析定义的返回数据，而是根据 json-schema 定义的数据结构，生成随机数据。"
        },
        {
          "title": "如何生成随机的邮箱或 ip？",
          "url": "/documents/mock.html#方式1.-json-schema-如何生成随机的邮箱或-ip？",
          "content": "如何生成随机的邮箱或 ip？点击高级设置，选择 format 选项，比如选择 email 则该字段生成随机邮箱字符串。"
        },
        {
          "title": "方式2. json5+注释",
          "url": "/documents/mock.html#方式2.-json5+注释",
          "content": "方式2. json5+注释"
        },
        {
          "title": "原理",
          "url": "/documents/mock.html#方式2.-json5+注释-原理",
          "content": "原理YApi Mock 功能基于 node 和 mockjs，跟 Mockjs 区别是 yapi 基于 json 定义 mock ，无法使用 mockjs 原有的函数功能，正则表达式需要基于 rule 书写，示例如下：{  \"name|regexp\": \"[a-z0-9_]+?\",\n  \"type|regexp\": \"json|text|xml\" //\b\b枚举数据类型可这样实现\n}\n\n2 支持替换请求的 query, body 参数{  \"name\": \"${query.name}\", //请求的url是/path?name=xiaoming, 返回的name字段是xiaoming\n  \"type\": \"${body.type}\"   //请求的requestBody type=1,返回的type字段是1\n}\n\n其他基本用法请查看：Mockjs 官网"
        },
        {
          "title": "如何使用 Mock",
          "url": "/documents/mock.html#方式2.-json5+注释-如何使用-mock",
          "content": "如何使用 Mock1 在 js 代码直接请求yapi提供的 mock 地址（不用担心跨域问题）在代码直接请求 yapi 提供的 mock 地址，以 jQuery 为例：let prefix = 'http://yapi.xxx.com/mock/2817'$.post(prefix+'/baseapi/path', {username: 'xxx'}, function(res){\n    console.log(res) //返回上图预览部分的数据\n})\n2 \b基于本地服务器反向代理优点:不用修改项目代码2.1 基于 nginx 反向代理location /baseapi{\nproxy_pass   http://yapi.xxx.com/mock/2817/baseapi; #baseapi后面没有\"/\"\n}\n2.2 基于 ykit mock功能{    pattern: /\\/api\\/(.*)/,\n    responder: 'http://yapi.xxx.com/mock/58/api/$1'\n}\n上面通过正则匹配，将所有接口转到 http://yapi.xxx.com 上，比如 http://localhost/api/user/status 会成为 http://yapi.xxx.com/mock/58/api/user/status详细使用指南: ykit-config-mock2.3 基于 ykit Jerry 代理假设您本地服务器访问地址是： http://xxx.com2.4 基于 Charles 代理点击 Charles 工具栏下的 tools >> Rewrite Settings 填写如下信息："
        },
        {
          "title": "Mock 语法规范",
          "url": "/documents/mock.html#方式2.-json5+注释-mock-语法规范",
          "content": "Mock 语法规范了解更多Mock详情：Mock.js 官方文档\nMock.js 的语法规范包括两部分：1. 数据模板定义规范（Data Template Definition，DTD）2. 数据占位符定义规范（Data Placeholder Definition，DPD）"
        },
        {
          "title": "数据模板定义规范（Data Template Definition，DTD）",
          "url": "/documents/mock.html#方式2.-json5+注释-数据模板定义规范（data-template-definition，dtd）",
          "content": "数据模板定义规范（Data Template Definition，DTD）数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：// 属性名   name （与生成规则之间用 \"|\" 隔开）// 生成规则 rule（生成规则有7种详见下面的生成规则）\n// 属性值   value（可以含有 \"@占位符\" 同时也指定了最终值的初始值和类型）\n\n'name|rule': value\n\n生成规则：\n'name|min-max': value\n'name|count': value\n'name|min-max.dmin-dmax': value\n'name|min-max.dcount': value\n'name|count.dmin-dmax': value\n'name|count.dcount': value\n'name|+step': value\n下面提供了6种生成规则以及示例包括 String、Number、Boolean、Object、Array：1. 属性值是字符串 String1. 'name|min-max': string\n通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。\n\n2. 'name|count': string\n\n通过重复 string 生成一个字符串，重复次数等于 count。\n2. 属性值是数字 Number1. 'name|+1': number\n属性值自动加 1，初始值为 number。\n\n2. 'name|min-max': number\n\n生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。\n\n3. 'name|min-max.dmin-dmax': number\n\n生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。\n\n例如：\nMock.mock({\n    'number1|1-100.1-10': 1,\n    'number2|123.1-10': 1,\n    'number3|123.3': 1,\n    'number4|123.10': 1.123\n})\n// =>\n{\n    \"number1\": 12.92,\n    \"number2\": 123.51,\n    \"number3\": 123.777,\n    \"number4\": 123.1231091814\n}\n3. 属性值是布尔型 Boolean1. 'name|1': boolean\n随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。\n\n2. 'name|min-max': value\n\n随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。\n4. 属性值是对象 Object1. 'name|count': object\n从属性值 object 中随机选取 count 个属性。\n\n2. 'name|min-max': object\n\n从属性值 object 中随机选取 min 到 max 个属性。\n5. 属性值是数组 Array1. 'name|1': array\n从属性值 array 中随机选取 1 个元素，作为最终值。\n\n2. 'name|+1': array\n\n从属性值 array 中顺序选取 1 个元素，作为最终值。\n\n3. 'name|min-max': array\n\n通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。\n\n4. 'name|count': array\n\n通过重复属性值 array 生成一个新数组，重复次数为 count。\n数据占位符定义规范（Data Placeholder Definition，DPD）占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。\n占位符 的格式为：\n\n@占位符\n\n说明：\n1. 用 @ 来标识其后的字符串是 占位符，在YApi提供的Mock输入框在输入“@”后会自动提示占位符。\n\n例如：\nname: {\n    first: '@FIRST',\n    middle: '@FIRST',\n    last: '@LAST',\n    full: '@first @middle @last'\n}\n// 上面的示例可以得到如下结果：\n\"name\": {\n    \"first\": \"Charles\",\n    \"middle\": \"Brenda\",\n    \"last\": \"Lopez\",\n    \"full\": \"Charles Brenda Lopez\"\n}\n"
        }
      ]
    },
    {
      "title": "高级Mock",
      "content": "高级 Mock 分为Mock 期望和自定义 Mock 脚本两种方式。",
      "url": "/documents/adv_mock.html",
      "children": [
        {
          "title": "Mock 期望",
          "url": "/documents/adv_mock.html#mock-期望",
          "content": "Mock 期望在测试时，很多时候需要根据不同的请求参数、IP 返回不同的 HTTP Code、HTTP 头和 JSON 数据。Mock 期望就是根据设置的请求过滤规则，返回期望数据。"
        },
        {
          "title": "使用方法",
          "url": "/documents/adv_mock.html#mock-期望-使用方法",
          "content": "使用方法进入接口详情页，点击『高级 Mock』选项。\n2. 点击『添加期望』，填写过滤规则以及期望返回数据，点击『确定』保存。\n3. 然后尝试在浏览器里发送符合规则的请求，查看返回的数据是否符合期望。\n"
        },
        {
          "title": "期望填写",
          "url": "/documents/adv_mock.html#mock-期望-期望填写",
          "content": "期望填写基本信息期望名称：给此条期望命名\nIP 过滤：请求的 IP 是设置的地址才可能返回期望。默认 IP 过滤关闭，任何 IP 地址都可能返回期望。\n参数过滤：请求必须包含设置的参数，并且值相等才可能返回期望。参数可以在 Body 或 Query 中。\n响应HTTP Code：期望响应的 HTTP 状态码\n延时：期望响应的延迟时间\nHTTP 头：期望响应带有的 HTTP 头\n返回 JSON：期望返回的 JSON 数据\n"
        },
        {
          "title": "自定义 Mock 脚本",
          "url": "/documents/adv_mock.html#自定义-mock-脚本",
          "content": "自定义 Mock 脚本在前端开发阶段，对于某些接口，业务相对复杂，而 UI 端也需要根据接口返回的不同内容去做相应的处理。YApi 提供了写\b JS 脚本方式处理这一问题，可以根据用户请求的参数修改返回内容。"
        },
        {
          "title": "全局变量",
          "url": "/documents/adv_mock.html#自定义-mock-脚本-全局变量",
          "content": "全局变量请求header 请求的 HTTP 头\nparams 请求参数，包括 Body、Query 中所有参数\ncookie 请求带的 Cookies\n响应\nmockJson\n接口定义的响应数据 Mock 模板\n\n\nresHeader\n响应的 HTTP 头\n\n\nhttpCode\n响应的 HTTP 状态码\n\n\ndelay\nMock 响应延时，单位为 ms\n\n\nRandom\nMock.Random 方法，详细使用方法请查看 Wiki\n\n"
        },
        {
          "title": "使用方法",
          "url": "/documents/adv_mock.html#自定义-mock-脚本-使用方法",
          "content": "使用方法首先开启此功能\nMock 脚本就是用 JavaScript 对 mockJson 变量修改,请避免被全局变量(httpCode, resHeader, delay)的修改\n"
        },
        {
          "title": "示例1, 根据请求参数重写 mockJson",
          "url": "/documents/adv_mock.html#自定义-mock-脚本-示例1,-根据请求参数重写-mockjson",
          "content": "示例1, 根据请求参数重写 mockJsonif(params.type == 1){  mockJson.errcode = 400;\n  mockJson.errmsg = 'error;\n}\n\nif(header.token == 't'){\n  mockJson.errcode = 300;\n  mockJson.errmsg = 'error;\n}\n\nif(cookie.type == 'a'){\n  mockJson.errcode = 500;\n  mockJson.errmsg = 'error;\n}\n\n"
        },
        {
          "title": "示例2, 生成高度自定义数据内容",
          "url": "/documents/adv_mock.html#自定义-mock-脚本-示例2,-生成高度自定义数据内容",
          "content": "示例2, 生成高度自定义数据内容var a = [1,1,1,1,1,1,1,1,1,1]\nmockJson = {\n    errcode: 0,\n    email: Random.email('qq.com'),\n    data: a.map(function(item){\n        return Random.city() + '银行'\n    })\n}\n\n"
        },
        {
          "title": "Mock 优先级说明",
          "url": "/documents/adv_mock.html#mock-优先级说明",
          "content": "Mock 优先级说明请求 Mock 数据时，规则匹配优先级：Mock 期望 > 自定义 Mock 脚本 > 普通 Mock。如果前面匹配到 Mock 数据，后面 Mock 则不返回。"
        }
      ]
    },
    {
      "title": "自动化测试",
      "content": "Web 应用通常是前后端分离开发的，后端提供调用的接口，前端使用接口返回 json 数据渲染到 UI，接口测试就是保证后端接口的数据正确性。对于很多团队，接口测试就是手动运行接口，肉眼比对接口返回的数据，这样的操作流程效率低下，容易出错。使用 YApi 只需要在可视化 GUI 下，配置下每个接口的入参和对 RESPONSE 断言，即可实现对接口的自动化测试，大大提升了接口测试的效率。自动化测试实践",
      "url": "/documents/case.html",
      "children": [
        {
          "title": "测试列表",
          "url": "/documents/case.html#测试列表",
          "content": "测试列表在测试列表可以看到每个测试用例的 key,还有 开始测试、报告等功能点击开始测试会按照 case 定义的参数从上往下一个一个进行测试，如果顺序有问题，可以拖动调整测试完成之后，点击报告查看该次请求的结果"
        },
        {
          "title": "编辑测试用例",
          "url": "/documents/case.html#编辑测试用例",
          "content": "编辑测试用例"
        },
        {
          "title": "Mock 参数",
          "url": "/documents/case.html#编辑测试用例-mock-参数",
          "content": "Mock 参数Mock 参数每次请求都会生成随机字符串变量参数YApi 提供了强大的变量参数功能，你可以在测试的时候使用前面接口的 参数 或 返回值 作为 后面接口的参数，即使接口之间存在依赖，也可以轻松 一键测试~Tips: 参数只能是测试过程中排在前面的接口中的变量参数\n格式：$.{key}.{params|body}.{path}例如：现有两个接口，分别是“导航标题”和“文章列表”文章列表接口需要传参数: 当前标题(id)，而这个 id 需要通过 导航标题 的返回值获取，这时应在 文章列表 的参数输入框中根据前者的 key 找到对应 id。导航标题 的参数和返回值有如下结构：  参数：\n  \n  返回值：\n  \n则 文章列表 的参数可以如下配置：其中 $. 是使用 动态变量 的标志，$.269.params 即表示 key 值为 269 用例的请求参数，$.269.body 即表示 key 值为 269 用例的返回值。如果 requestBody 是 json 格式也可以在 json 中写变量参数，如下图：Tips: 上下拖动测试集合的列表项可以调整测试的顺序。\n目前 yapi 中的query，body,header和pathParam的输入参数已经支持点击选择功能。无需自己填写表达式，只需在弹窗中选择需要展示的表达式即可。 输入选项包括常量，mock数据，在测试集合中也支持变量选择。具体用法：单击编辑按钮打开表达式生成器，点击需要的数据创建表达式，这里也可以实时查看表达式结果。Tips: 在测试集合中插入变量参数可以会出现下图的提示信息，这是正常现象。因为该参数只能在各个接口顺序执行的时候才能拉到变量参数中的值\n"
        },
        {
          "title": "自动化测试",
          "url": "/documents/case.html#自动化测试",
          "content": "自动化测试点击自动化测试，出现如下弹窗，用户访问该 url 就可以获取当前测试用例的所有测试结果"
        },
        {
          "title": "断言",
          "url": "/documents/case.html#断言",
          "content": "断言可通过 js 脚本写断言，实现精准测试，在接口用例页面点击 Test 编辑。"
        },
        {
          "title": "公共变量",
          "url": "/documents/case.html#断言-公共变量",
          "content": "公共变量1.assert断言函数，详细 api 可查看 document常用 api:\nassert(value)\n判断 value 是否为 truth, 例如 assert(1) 通过， assert(0) 不通过，只要 value 不是 null, 0, false 等值验证通过\n\n\nassert.equal(actual, expected)\n判断 actual 是否等于 expected，例如 assert(1, 1)通过\n\n\nassert.notEqual(actual, expected)\n判断 actual 是否不等于 expected\n\n\nassert.deepEqual(actual, expected)\n假设： actual = {a:1} 是一个对象，即便 expected = {a:1}，如果使用 assert.equal 可能也是不相等的，因为在 js 引用的只是对象的一个指针，需要使用 assert.deepEqual 比较两个对象是否相等\n\n\nassert.notDeepEaual(actual, expected)\n深度比较两个对象是否不相等\n\n2.statushttp 状态码3.paramshttp request params, 合并了 query 和 body4.body返回 response body5.header返回 response header6.records记录的 http 请求信息，假设需要获取 key 为 555 的接口参数或者响应数据，可通过 records[555].params 或 records[555].body 获取7.loglog（message） 函数,调试时使用，log 信息仅仅在断言失败后打印"
        },
        {
          "title": "示例",
          "url": "/documents/case.html#断言-示例",
          "content": "示例assert.equal(body.errcode, 0)assert.equal(body.data.group_name, 'testGroup')\nassert.equal(status, 200)\n"
        }
      ]
    },
    {
      "title": "数据导入",
      "content": "在数据管理可快速导入其他格式的接口数据，方便快速添加接口。YApi 目前支持 postman, swagger, har 数据导入。",
      "url": "/documents/data.html",
      "children": [
        {
          "title": "Postman 数据导入",
          "url": "/documents/data.html#postman-数据导入",
          "content": "Postman 数据导入1.首先在postman导出接口2.选择collection_v1,点击export导出接口到文件xxx3.打开yapi平台，进入到项目页面，点击数据管理，选择相应的分组和postman导入\b方式，\b选择刚才保存的文件路径，开始导入数据"
        },
        {
          "title": "HAR\b\b 数据导入",
          "url": "/documents/data.html#har\b\b-数据导入",
          "content": "HAR\b\b 数据导入可用 chrome 实现录制接口数据的功能，方便开发者快速导入项目接口1.打开 Chrome 浏览器开发者工具，点击network，首次使用请先clear所有请求信息，确保录制功能开启（红色为开启状态）2.操作页面实际功能，完成后点击save as HAR with content,将数据保存到文件xxx3.打开yapi平台，进入到项目页面，点击数据管理，选择相应的分组和har导入\b方式，\b选择刚才保存的文件路径，开始导入数据"
        },
        {
          "title": "Swagger 数据导入",
          "url": "/documents/data.html#swagger-数据导入",
          "content": "Swagger 数据导入什么是 Swagger ？[Swagger从入门到精通](https://www.gitbook.com/book/huangwenchao/swagger/details)1.生成 JSON 语言编写的 Swagger API 文档文件  例如这样的数据 （http://petstore.swagger.io/v2/swagger.json），可以将其内容复制到 JSON 文件中。2.打开yapi平台，进入到项目页面，点击数据管理，选择相应的分组和swagger导入\b方式，\b选择刚才的文件，开始导入数据"
        }
      ]
    },
    {
      "title": "",
      "content": "",
      "url": "/documents/plugin-index.html",
      "children": [
        {
          "title": "安装",
          "url": "/documents/plugin-index.html#安装",
          "content": "安装假设插件名为：yapi-plugin-demo,安装方法如下：cd {项目目录}yapi plugin yapi-plugin-demo\n"
        },
        {
          "title": "卸载插件",
          "url": "/documents/plugin-index.html#卸载插件",
          "content": "卸载插件假设插件名为：yapi-plugin-demo,卸载方法如下：cd {项目目录}yapi unplugin yapi-plugin-demo\n"
        }
      ]
    },
    {
      "title": "",
      "content": "",
      "url": "/documents/plugin-dev.html",
      "children": [
        {
          "title": "运行开发服务器",
          "url": "/documents/plugin-dev.html#运行开发服务器",
          "content": "运行开发服务器npm installnpm install -g ykit #依赖 ykit \nnpm run dev #启动开发服务器\n"
        },
        {
          "title": "加载插件",
          "url": "/documents/plugin-dev.html#加载插件",
          "content": "加载插件在config.json plugins配置项，加入 demo 插件,{  \"port\": \"3000\",\n  \"db\": {\n    \"servername\": \"127.0.0.1\",\n    \"DATABASE\": \"yapi\"\n  },\n  ...\n  \"plugins\": [{\n    \"name\": \"demo\"，\n    \"options\": {}\n  }]\n}\n"
        },
        {
          "title": "初始化目录",
          "url": "/documents/plugin-dev.html#初始化目录",
          "content": "初始化目录可参考 项目vendors/exts 目录下的插件在 vendors/node_modules 下新建 yapi-plugin-demo 目录和 npm init,最后生成的目录接口如下yapi-plugin-demo  client.js  //客户端入口文件\n  server.js  //服务端入口文件\n  packjson.json //插件依赖管理\n  index.js //插件配置文件\n"
        },
        {
          "title": "index.js 配置说明",
          "url": "/documents/plugin-dev.html#index.js-配置说明",
          "content": "index.js 配置说明server: true // 如果为true,表名该插件需要经过后端服务器加载client: true // 如果为true,表名该插件需要经过前端编译\n"
        },
        {
          "title": "server.js",
          "url": "/documents/plugin-dev.html#server.js",
          "content": "server.js在server.js 需要导出一个 function ,例如： module.exports = function(options){}options 可在 config.json 配置"
        },
        {
          "title": "绑定钩子",
          "url": "/documents/plugin-dev.html#server.js-绑定钩子",
          "content": "绑定钩子this.bindHook(hookname, listener) //绑定钩子hookname //钩子名\nlistener //监听函数，可以是普通函数，也可以是 asyncFunction\n"
        },
        {
          "title": "如何使用 YApi vendors/server 目录下的模块",
          "url": "/documents/plugin-dev.html#server.js-如何使用-yapi-vendorsserver-目录下的模块",
          "content": "如何使用 YApi vendors/server 目录下的模块可以直接 require vendors 目录下的模块，注意：后端 node 不能使用 import关键字，只能使用 require例如： require('yapi')"
        },
        {
          "title": "controller 和 model",
          "url": "/documents/plugin-dev.html#server.js-controller-和-model",
          "content": "controller 和 model新增 controller 需要继承 baseController(controller/base.js)新增 model 需要继承 baseModel(model/base.js)"
        },
        {
          "title": "client.js",
          "url": "/documents/plugin-dev.html#client.js",
          "content": "client.js"
        },
        {
          "title": "绑定钩子(同后端 server.js )",
          "url": "/documents/plugin-dev.html#client.js-绑定钩子同后端-server.js-",
          "content": "绑定钩子(同后端 server.js )this.bindHook(hookname, listener) //绑定钩子hookname //钩子名\nlistener //监听函数，可以是普通函数，也可以是 asyncFunction\n"
        }
      ]
    },
    {
      "title": "",
      "content": "",
      "url": "/documents/plugin-list.html",
      "children": [
        {
          "title": "怎么分享我的插件？",
          "url": "/documents/plugin-list.html#怎么分享我的插件？",
          "content": "怎么分享我的插件？Fork github.com/ymfe/yapi ，编辑根目录下的 plugin.json 文件， 然后 Pull-Request 到 ymfe/yapi"
        },
        {
          "title": "插件列表",
          "url": "/documents/plugin-list.html#插件列表",
          "content": "插件列表window.onload = function(){\n  var list = [{\n    title: 'yapi-plugin-qsso',\n    url: 'https://github.com/ymfe/yapi-plugin-qsso',\n    desc: 'qunar 专用 sso 第三方登录'\n  }];\n  var el = $('#list');\n  list.forEach(function(item){\n    el.append(\"\" + '\" + item.title + \"\" + \"&nbsp;\" + item.desc + \"\")\n  })\n}\n"
        }
      ]
    },
    {
      "title": "",
      "content": "",
      "url": "/documents/plugin-hooks.html",
      "children": [
        {
          "title": "后端 hookList",
          "url": "/documents/plugin-hooks.html#后端-hooklist",
          "content": "后端 hookList目前 hooksList 只有下面列出的部分，如果您有其他的需求，可提建议到 github 或者 qq 群/** * 钩子配置\n */\nvar hooks = {\n    /**\n     * 第三方sso登录钩子，暂只支持设置一个\n     * @param ctx\n     * @return 必需返回一个 promise 对象，resolve({username: '', email: ''})\n     */\n    'third_login': {\n        type: 'single',\n        listener: null\n    },\n    /**\n     * 客户端增加接口成功后触发\n     * @param id 接口id\n     */\n    'interface_add': {\n        type: 'multi',\n        listener: []\n    },\n    /**\n     * 客户端删除接口成功后触发\n     * @param id 接口id\n     */\n    'interface_del': {\n        type: 'multi',\n        listener: []\n    },\n    /**\n    * 客户端更新接口成功后触发\n    * @param id 接口id\n    */\n    'interface_update':{\n        type: 'multi',\n        listener: []\n    },\n    /**\n     * 客户端获取接口数据列表\n     * @param id project_id\n     */\n    'interface_list':{\n        type: 'multi',\n        listener: []\n    },\n    /**\n     * 客户端获取一条接口信息触发\n     * @param id 接口id\n     */\n    'interface_get':{\n        type: 'multi',\n        listener: []\n    },\n    /**\n     * 客户端增加一个新项目\n     * @param id 项目id\n     */\n    'project_add':{\n        type: 'multi',\n        listener: []\n    },\n    /**\n     * 客户端删除删除一个项目\n     * @param id 项目id\n     */\n    'project_del':{\n        type: 'multi',\n        listener: []\n    },\n    /**\n     * MockServer生成mock数据后触发\n     * @param context Object\n     * {\n     *  projectData: project,\n        interfaceData: interfaceData,\n        ctx: ctx,\n        mockJson: res\n     * }\n     *\n     */\n    mock_after: {\n        type: 'multi',\n        listener: []\n    },\n    /**\n     * 增加路由的钩子\n     * type Sync\n     * @param addPluginRouter Function\n     * addPLuginPLugin(config)\n     * config = {\n     *  path,      // String\n     *  method,    // String\n     *  controller // Class 继承baseController的class\n     *  action     // String controller的Action\n     * }\n     */\n    add_router: {\n        type: 'multi',\n        listener: []\n    }\n};\n"
        },
        {
          "title": "前端 hookList",
          "url": "/documents/plugin-hooks.html#前端-hooklist",
          "content": "前端 hookList/** * type component  组件\n *      listener   监听函数\n * mulit 是否绑定多个监听函数\n *\n */\n\nhooks = {\n  /**\n   * 第三方登录 //可参考 yapi-plugin-qsso 插件\n   */\n  third_login: {\n    type: 'component',\n    mulit: false,\n    listener: null\n  },\n  /**\n   * 导出数据\n   * @param Object exportDataModule\n   * @param projectId\n   * @info\n   * exportDataModule = {};\n   * exportDataModule.pdf = {\n   *   name: 'Pdf',\n   *   route: '/api/plugin/export/pdf',\n   *   desc: '导出项目接口文档为 pdf 文件'\n   * }\n   */\n  export_data: {\n    type: 'listener',\n    mulit: true,\n    listener: []\n  },\n  /**\n   * 导入数据\n   * @param importDataModule\n   *\n   * @info\n   * 可参考 vendors/exts/yapi-plugin-import-swagger插件\n   * importDataModule = {};\n   *\n   */\n  import_data: {\n    type: 'listener',\n    mulit: true,\n    listener: []\n  },\n  /**\n   * 接口页面 tab 钩子\n   * @param InterfaceTabs\n   *\n   * @info\n   * 可参考 vendors/exts/yapi-plugin-advanced-mock\n   * let InterfaceTabs = {\n      view: {\n        component: View,\n        name: '预览'\n      },\n      edit: {\n        component: Edit,\n        name: '编辑'\n      },\n      run: {\n        component: Run,\n        name: '运行'\n      }\n    }\n   */\n  interface_tab: {\n    type: 'listener',\n    mulit: true,\n    listener: []\n  }\n};\n"
        }
      ]
    },
    {
      "title": "",
      "content": "",
      "url": "/documents/redev.html",
      "children": [
        {
          "title": "安装YApi",
          "url": "/documents/redev.html#安装yapi",
          "content": "安装YApi1.创建工程目录mkdir yapi && cd yapigit clone https://github.com/YMFE/yapi.git vendors --depth=1 # 或者下载 zip 包解压到 vendors 目录\n2.修改配置cp vendors/config_example.json ./config.json # 复制完成后请修改相关配置vi ./config.json\n配置如下，主要配置 MongoDB 数据库，以及 Admin 账号。{  \"port\": \"3011\",\n  \"adminAccount\": \"admin@admin.com\",\n  \"db\": {\n    \"servername\": \"127.0.0.1\",\n    \"DATABASE\":  \"yapi\",\n    \"port\": 27017,\n    \"user\": \"yapi\",\n    \"pass\": \"yapi123\"\n  },\n  \"mail\": {\n    \"enable\": true,\n    \"host\": \"smtp.163.com\",\n    \"port\": 465,\n    \"from\": \"***@163.com\",\n    \"auth\": {\n        \"user\": \"***@163.com\",\n        \"pass\": \"*****\"\n    }\n  }\n}\ndb.user 和 db.pass 是 mongodb 的用户名和密码，如果没有开启 mongo 认证功能，请删除这两个选项。\n3.安装依赖cd vendorsnpm install --production --registry https://registry.npm.taobao.org # 安装依赖\n4.初始化npm run install-server  # 安装程序会初始化数据库索引和管理员账号，管理员账号名可在 config.json 配置# 默认输出\n# 初始化管理员账号成功,账号名：\"admin@admin.com\"，密码：\"ymfe.org\"\n5.启动开发机npm run dev# 启动服务器后，请访问 127.0.0.1:{config.json配置的端口}，初次运行会有个编译的过程，请耐心等候\n# 127.0.0.1:3011\n目录结构|-- config.json|-- init.lock\n|-- log\n`-- vendors\n    |-- CHANGELOG.md\n    |-- LICENSE\n    |-- README.md\n    |-- client\n    |-- common\n    |-- config_example.json\n    |-- doc\n    |-- exts\n    |-- nodemon.json\n    |-- npm-debug.log\n    |-- package.json\n    |-- plugin.json\n    |-- server\n    |-- static\n    |-- test\n    |-- webpack.alias.js\n    |-- yapi-base-flow.jpg\n    |-- ydocfile.js\n    `-- ykit.config.js\n"
        },
        {
          "title": "技术栈说明",
          "url": "/documents/redev.html#技术栈说明",
          "content": "技术栈说明后端： koa mongoose前端： react redux"
        },
        {
          "title": "启动开发环境服务器",
          "url": "/documents/redev.html#启动开发环境服务器",
          "content": "启动开发环境服务器  cd vendors  npm run dev\n  # 启动服务器后，请访问 127.0.0.1:{config.json配置的端口}，初次运行会有个编译的过程，请耐心等候\n"
        },
        {
          "title": "启动生产环境服务器",
          "url": "/documents/redev.html#启动生产环境服务器",
          "content": "启动生产环境服务器  cd vendors  ykit pack -m\n  node server/app.js\n"
        }
      ]
    },
    {
      "title": "常见问题解答",
      "content": "本页面罗列了大家使用 YApi 时遇到的常见问题.如果没有找到您要的答案，请联系管理员.",
      "url": "/documents/qa.html",
      "children": [
        {
          "title": "Q1 怎样联系组长？",
          "url": "/documents/qa.html#q1-怎样联系组长？",
          "content": "Q1 怎样联系组长？组长分为 分组组长 和 项目组长:分组组长：选择首页左侧的分组，点击右侧面板的 成员列表，成员右侧显示着 组长/开发者 的权限信息。\n\n项目组长: 点击项目页的 设置 - 成员列表，成员右侧显示着 组长/开发者 的权限信息。\n\n"
        },
        {
          "title": "Q2 怎么快速迁移旧项目？",
          "url": "/documents/qa.html#q2-怎么快速迁移旧项目？",
          "content": "Q2 怎么快速迁移旧项目？第一步. 使用 Chrome 浏览器开发者工具录制功能第二步 录制当前项目所有请求，导出到 har 文件第三步 将Har数据导入到 YApi 平台具体使用方法请参考 YApi 文档"
        },
        {
          "title": "Q3 忘记密码怎么办？",
          "url": "/documents/qa.html#q3-忘记密码怎么办？",
          "content": "Q3 忘记密码怎么办？请联系 超级管理员 ，只有超级管理员能重置密码。"
        },
        {
          "title": "Q4 发现了 Bug 怎么办？",
          "url": "/documents/qa.html#q4-发现了-bug-怎么办？",
          "content": "Q4 发现了 Bug 怎么办？请反馈到 Github，功能性的问题我们会在一周内修复，并在每周一发布新的版本 Tag."
        },
        {
          "title": "Q5 部署不成功怎么办？",
          "url": "/documents/qa.html#q5-部署不成功怎么办？",
          "content": "Q5 部署不成功怎么办？确保 node 版本=> 7.6,请运行 node -v 查看版本号\n确保 mongodb 版本 => 2.6，请运行 mongo --version 查看版本号\n确保安装了 npm, 运行 npm -v 查看版本号\n确保安装了 git,运行 git --version 查看版本号\n确认版本号没问题，请删除原有的安装文件和数据库，重新安装。如果还是无法安装，请不要选择最新的版本，可选择上一个版本或上上一个版本等，最新版本出问题的概率会比较大。"
        },
        {
          "title": "Q6 部署YApi遇到mongodb认证问题？",
          "url": "/documents/qa.html#q6-部署yapi遇到mongodb认证问题？",
          "content": "Q6 部署YApi遇到mongodb认证问题？mongodb3.03以上开启认证,解决程序认证连接报错以及第三方客户端无法认证问题\n"
        }
      ]
    }
  ],
  "内网部署": [
    {
      "title": "内网部署",
      "content": "使用我们提供的 yapi-cli 工具，部署 YApi 平台是非常容易的。建议部署成 http 站点，因 chrome 浏览器安全限制，部署成 https 会导致测试功能在请求 http 站点时文件上传功能异常。如果您是将服务器代理到 nginx 服务器，请配置 nginx 支持 websocket。在location /添加proxy_http_version 1.1;\nproxy_set_header Upgrade $http_upgrade;\nproxy_set_header Connection \"upgrade\";\n",
      "url": "/devops/index.html",
      "children": [
        {
          "title": "环境要求",
          "url": "/devops/index.html#环境要求",
          "content": "环境要求nodejs（7.6+)\nmongodb（2.6+）\n"
        },
        {
          "title": "安装",
          "url": "/devops/index.html#安装",
          "content": "安装"
        },
        {
          "title": "方式一. 可视化部署[推荐]",
          "url": "/devops/index.html#安装-方式一.-可视化部署[推荐]",
          "content": "方式一. 可视化部署[推荐]执行 yapi server 启动可视化部署程序，输入相应的配置和点击开始部署，就能完成整个网站的部署。部署完成之后，可按照提示信息，执行 node/{网站路径/server/app.js} 启动服务器。在浏览器打开指定url, 点击登录输入您刚才设置的管理员邮箱，默认密码(ymfe.org) 登录系统（默认密码可在个人中心修改）。npm install -g yapi-cli --registry https://registry.npm.taobao.orgyapi server\n"
        },
        {
          "title": "方式二. 命令行部署",
          "url": "/devops/index.html#安装-方式二.-命令行部署",
          "content": "方式二. 命令行部署如果 github 压缩文件无法下载，或需要部署到一些特殊的服务器，可尝试此方法mkdir yapicd yapi\ngit clone https://github.com/YMFE/yapi.git vendors //或者下载 zip 包解压到 vendors 目录\ncp vendors/config_example.json ./config.json //复制完成后请修改相关配置\ncd vendors\nnpm install --production --registry https://registry.npm.taobao.org\nnpm run install-server //安装程序会初始化数据库索引和管理员账号，管理员账号名可在 config.json 配置\nnode server/app.js //启动服务器后，请访问 127.0.0.1:{config.json配置的端口}，初次运行会有个编译的过程，请耐心等候\n安装后的目录结构如下：|-- config.json|-- init.lock\n|-- log\n`-- vendors\n    |-- CHANGELOG.md\n    |-- LICENSE\n    |-- README.md\n    |-- client\n    |-- common\n    |-- config_example.json\n    |-- doc\n    |-- exts\n    |-- nodemon.json\n    |-- npm-debug.log\n    |-- package.json\n    |-- plugin.json\n    |-- server\n    |-- static\n    |-- test\n    |-- webpack.alias.js\n    |-- yapi-base-flow.jpg\n    |-- ydocfile.js\n    `-- ykit.config.js\n"
        },
        {
          "title": "服务器管理",
          "url": "/devops/index.html#服务器管理",
          "content": "服务器管理推荐使用 pm2 管理 node 服务器启动，停止，具体使用方法可参考下面的教程：官网文档\nPM2实用入门指南\n"
        },
        {
          "title": "升级",
          "url": "/devops/index.html#升级",
          "content": "升级升级项目版本是非常容易的，并且不会影响已有的项目数据，只会同步 vendors 目录下的源码文件。cd  {项目目录}yapi ls //查看版本号列表\nyapi update //升级到最新版本\nyapi update -v v1.1.0 //升级到指定版本\n"
        },
        {
          "title": "配置邮箱",
          "url": "/devops/index.html#配置邮箱",
          "content": "配置邮箱打开项目目录 config.json 文件，新增 mail 配置， 替换默认的邮箱配置{  \"port\": \"*****\",\n  \"adminAccount\": \"********\",\n  \"db\": {...},\n  \"mail\": {\n    \"enable\": true,\n    \"host\": \"smtp.163.com\",    //邮箱服务器\n    \"port\": 465,               //端口\n    \"from\": \"***@163.com\",     //发送人邮箱\n    \"auth\": {\n        \"user\": \"***@163.com\", //邮箱服务器账号\n        \"pass\": \"*****\"        //邮箱服务器密码\n    }\n  }\n}\n如何申请STMP服务器账号和密码可以参考下面的教程：如何开通电子邮箱的SMTP功能"
        },
        {
          "title": "配置LDAP登录",
          "url": "/devops/index.html#配置ldap登录",
          "content": "配置LDAP登录打开项目目录 config.json 文件，添加如下字段：{  \"port\": \"*****\",\n  \"adminAccount\": \"********\",\n  \"db\": {...},\n  \"mail\": {...},\n  \"ldapLogin\": {\n      \"enable\": true,\n      \"server\": \"ldap://l-ldapt1.ops.dev.cn0.qunar.com\",\n      \"baseDn\": \"CN=Admin,CN=Users,DC=test,DC=com\",\n      \"bindPassword\": \"password123\",\n      \"searchDn\": \"OU=UserContainer,DC=test,DC=com\",\n      \"searchStandard\": \"mail\"\n   }\n}\n\n这里面的配置项含义如下：enable 表示是否配置 LDAP 登录，true(支持 LDAP登录 )/false(不支持LDAP登录);\nserver LDAP 服务器地址，前面需要加上 ldap:// 前缀，也可以是 ldaps:// 表示是通过 SSL 连接;\nbaseDn LDAP 服务器的登录用户名，必须是从根结点到用户节点的全路径;\nbindPassword 登录该 LDAP 服务器的密码;\nsearchDn 查询用户数据的路径，类似数据库中的一张表的地址，注意这里也必须是全路径;\nsearchStandard 查询条件，这里是 mail 表示查询用户信息是通过邮箱信息来查询的。注意，该字段信息与LDAP数据库存储数据的字段相对应，如果如果存储用户邮箱信息的字段是 email,  这里就需要修改成 email.\n重启服务器后，可以在登录页看到如下画面，说明 ladp 配置成功"
        }
      ]
    }
  ]
}