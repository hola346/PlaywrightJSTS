

class APIUtils {

    constructor(request) {
        this.request = request;
    }

    async getToken(email, password) {
        const response = await this.request.post(
            'https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: {
                    userEmail: email,
                    userPassword: password,
                },
            }
        );
        console.log('this is email and password: ' + email);
        if (!response.ok()) {
            throw new Error('Login failed');
        }
        const responseBody = await response.json();
        console.log(responseBody);
        const token = responseBody.token;
        console.log('This is the value of the token:', token);
        return token;
        /*
        const body = await response.json();

    this.token = body.token;
    this.userId = body.userId;

    return body;*/
    }

    async createOrder(email, password) {
        const token = await this.getToken(email, password);
        const response = await this.request.post(
            'https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: {
                    orders: [
                        {
                            country: "Bulgaria",
                            productOrderedId: "6960ea76c941646b7a8b3dd5",
                        }
                    ]
                },
                headers: {
                    Authorization: token,
                    Content_Type: "application/json",
                },
            }
        )
        console.log(response.json());
        return response.json();
    }
    async createOrderParam(email, password) {
        const token = await this.getToken(email, password);
        await page.addInitScript(token => {
            window.localStorage.setItem('token', token);
        }, token);
        const response = await this.request.post(
            'https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: {
                    orders: [
                        {
                            country: "Bulgaria",
                            productOrderedId: "6960ea76c941646b7a8b3dd5",
                        }
                    ]
                },
                headers: {
                    Authorization: token,
                    Content_Type: "application/json",
                },
            }
        )
        console.log(response.json());
        return response.json();

    }

    async selectItems2Cart(email, password) {
        const token = await this.getToken(email, password);

        const products = [
            {
                _id: "6960eae1c941646b7a8b3ed3",
                productName: "ADIDAS ORIGINAL",
            },
            {
                _id: "6960eac0c941646b7a8b3e68",
                productName: "ZARA COAT 3",
            }
        ];

        for (const product of products) {
            await this.request.post(
                'https://rahulshettyacademy.com/api/ecom/user/add-to-cart',
                {
                    data: {
                        _id: "6a019a7c965c23b43b0f7672",
                        product
                    },
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    }
                }
            );
        }

    }
}
module.exports = { APIUtils };