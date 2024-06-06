const defaultUser = 
    {
        id : 1,
        name : 'admin',
        password : 'admin',
        email : '21301117@bjtu.edu.cn',
        role : 'admin',
        addresses : [
            {
                name : 'zcy',
                phone : '12345678901',
                address : 'Beijing Jiaotong University'
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
}

const userService = new UserService();
export default userService;