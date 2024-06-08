const defaultUser = 
    {
        id : 1,
        name : 'admin',
        password : 'admin',
        email : '21301117@bjtu.edu.cn',
        role : 'admin',
        addresses : [
            {
                name : '周书扬',
                phone : '12345678901',
                address : '北京交通大学'
            },
            {
                name: '张昌钰',
                phone: '010-12345678',
                address: '北京大学'
            }
        ]

    };

class UserService {
    user = {};

    constructor() {
        this.loadUser();
    }

    loadUser() {
        const user = localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
        } else {
            this.user = defaultUser;
            this.saveUser(defaultUser);
        }
    }

    getUser() {
        return this.user;
    }

    saveUser() {
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    getAddresses() {
        return this.user.addresses;
    }
}

const userService = new UserService();
export default userService;