const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { LocalStorage } = require('node-localstorage');
const bcrypt = require('bcrypt');

const PORT = 5000;
const localStorage = new LocalStorage('./storage');

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
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
