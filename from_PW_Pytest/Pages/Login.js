import {expect} from '@playwright/test';
import env from '../config/env';

class LoginPage  {
    constructor (page){
        this.page=page;
        this.userEmail= page.getByPlaceholder('email@example.com');
        this.password= page.getByPlaceholder('enter your passsword');
        this.loginButton= page.getByRole('button', {name: 'login'});

    }

    async navigate (){
        await this.page.goto(env.env1.baseUrl+env.env1.routes.weblogin);
    }
    async log_in (userEmail, password){

        await this.userEmail.fill(userEmail);
        await this.password.fill(password);
        await this.loginButton.click();
        
    }
}
module.exports = { LoginPage  };