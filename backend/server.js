const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { LocalStorage } = require('node-localstorage');
const bcrypt = require('bcrypt');

const PORT = 5000;
const localStorage = new LocalStorage('./storage');

// 初始化商品列表（如果尚未存在）
const initializeProducts = () => {
    const defaultList = [
        // 这里使用你的默认商品列表
        {
            id: 1,
            name: '烟台苹果',
            price: 99,
            subcategory_id: 1,
            imgs: [
                'https://img11.360buyimg.com/n1/jfs/t1/240487/24/6878/188440/660bd903F7f2a7e2d/95ac00f4fa4bcae5.jpg.avif',
                'https://img12.360buyimg.com/n1/jfs/t1/249525/17/6721/206703/660a4a66F395a0ede/271dfaa2e67f804e.jpg.avif',
            ]
        },
        // 其余商品信息...
    ];

    const products = JSON.parse(localStorage.getItem('products')) || [];
    if (products.length === 0) {
        localStorage.setItem('products', JSON.stringify(defaultList));
    }
};

initializeProducts();

const initializeOrders = () => {
    const defaultList = [
        {
            id: '1145141', // 确保ID唯一
            user_id: 1,
            state: 0, // 0: unpaid, 1: paid, 2: delivered 3: canceled
            goods_list: [
                {
                    good_id: 1,
                    good_price: 99,
                    count: 1
                }
            ],
            price: 99,
            actual_price: 90,
            submit_time: new Date().getTime(),
            pay_time: null,
            address: {
                name: '张三',
                phone: '12345678901',
                address: '广东省广州市天河区'
            },
            pay_way: null
        }
    ];

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length === 0) {
        localStorage.setItem('orders', JSON.stringify(defaultList));
    }
};

initializeOrders();


const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method.toLowerCase();
    const headers = req.headers;

    // 跨域设置
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理预检请求
    if (method === 'options') {
        res.writeHead(200);
        res.end();
        return;
    }

    // 处理 POST /api/login 请求
    if (path === '/api/login' && method === 'post') {
        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (chunk) => {
            buffer += decoder.write(chunk);
        });

        req.on('end', () => {
            buffer += decoder.end();
            const body = JSON.parse(buffer);

            const { username, password } = body;

            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = storedUsers.find(user => user.username === username);

            let response = { success: false, message: '用户名或密码错误' };
            if (user && bcrypt.compareSync(password, user.password)) {
                if (!user.isEnabled) {
                    response = { success: false, message: '用户已被禁用' }; // 用户被禁用时的错误消息
                } else {
                    response = { success: true, roles: user.roles };

                    // 更新用户的最后登录时间
                    user.lastLogin = new Date().toISOString();
                    localStorage.setItem('users', JSON.stringify(storedUsers));
                }
            }

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(response));
        });
    }
    // 处理 POST /api/register 请求
    else if (path === '/api/register' && method === 'post') {
        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (chunk) => {
            buffer += decoder.write(chunk);
        });

        req.on('end', () => {
            buffer += decoder.end();
            const { username, password, email } = JSON.parse(buffer);

            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = { username, password: hashedPassword, email, createdAt: new Date().toISOString(), lastLogin: 'N/A', isEnabled: true, roles: ['普通用户'] };

            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ ...newUser, key: users.length ? users[users.length - 1].key + 1 : 1 });
            localStorage.setItem('users', JSON.stringify(users));

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true }));
        });
    }
    // 处理 GET /api/users 请求
    else if (path === '/api/users' && method === 'get') {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(users));
    }
    // 处理 POST /api/users 请求
    else if (path === '/api/users' && method === 'post') {
        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (chunk) => {
            buffer += decoder.write(chunk);
        });

        req.on('end', () => {
            buffer += decoder.end();
            const { username, password, email, name } = JSON.parse(buffer);

            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = { username, password: hashedPassword, email, name, createdAt: new Date().toISOString(), lastLogin: 'N/A', isEnabled: true, roles: ['普通用户'] };

            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ ...newUser, key: users.length ? users[users.length - 1].key + 1 : 1 });
            localStorage.setItem('users', JSON.stringify(users));

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true }));
        });
    }
    // 处理 PUT /api/users/:id 请求
    else if (path.startsWith('/api/users/') && method === 'put') {
        const id = parseInt(path.split('/').pop(), 10);
        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (chunk) => {
            buffer += decoder.write(chunk);
        });

        req.on('end', () => {
            buffer += decoder.end();
            const updatedUser = JSON.parse(buffer);

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.map(user => {
                if (user.key === id) {
                    // 只更新用户名、邮箱和角色字段
                    return {
                        ...user,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        roles: updatedUser.roles
                    };
                }
                return user;
            });
            localStorage.setItem('users', JSON.stringify(users));

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true }));
        });
    }
    // 处理 DELETE /api/users/:id 请求
    else if (path.startsWith('/api/users/') && method === 'delete') {
        const id = parseInt(path.split('/').pop(), 10);
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(user => user.key !== id);
        localStorage.setItem('users', JSON.stringify(users));

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({ success: true }));
    }
    // 处理 POST /api/products 请求
    else if (path === '/api/products' && method === 'post') {
        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (chunk) => {
            buffer += decoder.write(chunk);
        });

        req.on('end', () => {
            buffer += decoder.end();
            const newProduct = JSON.parse(buffer);

            const products = JSON.parse(localStorage.getItem('products')) || [];
            newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true }));
        });
    }
    // 处理 GET /api/products 请求
    else if (path === '/api/products' && method === 'get') {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(products));
    }
    // 处理 PUT /api/products/:id 请求
    else if (path.startsWith('/api/products/') && method === 'put') {
        const id = parseInt(path.split('/').pop(), 10);
        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (chunk) => {
            buffer += decoder.write(chunk);
        });

        req.on('end', () => {
            buffer += decoder.end();
            const updatedProduct = JSON.parse(buffer);

            let products = JSON.parse(localStorage.getItem('products')) || [];
            products = products.map(product => {
                if (product.id === id) {
                    return { ...product, ...updatedProduct };
                }
                return product;
            });
            localStorage.setItem('products', JSON.stringify(products));

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true }));
        });
    }
    // 处理 DELETE /api/products/:id 请求
    else if (path.startsWith('/api/products/') && method === 'delete') {
        const id = parseInt(path.split('/').pop(), 10);
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(products));

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({ success: true }));
    }
    // 处理 POST /api/orders 请求
    else if (path === '/api/orders' && method === 'post') {
        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (chunk) => {
            buffer += decoder.write(chunk);
        });

        req.on('end', () => {
            buffer += decoder.end();
            const newOrder = JSON.parse(buffer);

            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            newOrder.id = new Date().getTime().toString() + newOrder.user_id; // 生成唯一订单ID
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, id: newOrder.id }));
        });
    }
    // 处理 GET /api/orders 请求
    else if (path === '/api/orders' && method === 'get') {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(orders));
    }
    // 处理 GET /api/orders/:id 请求
    else if (path.startsWith('/api/orders/') && method === 'get') {
        const id = path.split('/').pop();
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const order = orders.find(order => order.id === id);

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(order || {}));
    }
    // 处理 PUT /api/orders/:id 请求
    else if (path.startsWith('/api/orders/') && method === 'put') {
        const id = path.split('/').pop();
        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (chunk) => {
            buffer += decoder.write(chunk);
        });

        req.on('end', () => {
            buffer += decoder.end();
            const updatedOrder = JSON.parse(buffer);

            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders = orders.map(order => {
                if (order.id === id) {
                    return { ...order, ...updatedOrder };
                }
                return order;
            });
            localStorage.setItem('orders', JSON.stringify(orders));

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify({ success: true }));
        });
    }
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
