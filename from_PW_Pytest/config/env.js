
const environments = {
    env1: {
        baseUrl: 'https://rahulshettyacademy.com',
        routes: {
            webtable: '/seleniumPractise/#/offers',
            login: '/loginpagePractise/',
            dashboard: '/client/#/dashboard/dash',
            weblogin: '/client/#/auth/login',
        }
    },
    env2: {
        baseUrl: 'https://rahulshettyacademy.com/AutomationPractice/',
    },
};

module.exports = environments;

/*
When there's only one env: 

const env = {
    baseUrl: process.env.BASE_URL || 'https://rahulshettyacademy.com',
    routes: {
        webtable: '/seleniumPractise/#/offers',
        login: '/loginpagePractise/',
        dashboard: '/angularpractice/shop',
    }
};
module.exports = env; 
*/