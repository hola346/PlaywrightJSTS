
class APIUtils {

    constructor(request) {
        this.request = request;

        this.baseURL = 'https://rahulshettyacademy.com';

        this.token = null;
        this.userId = null;
    }

    // =========================
    // LOGIN
    // =========================
    async login(email, password) {

        const response = await this.request.post(
            `${this.baseURL}/api/ecom/auth/login`,
            {
                data: {
                    userEmail: email,
                    userPassword: password,
                },
            }
        );

        if (!response.ok()) {
            throw new Error(
                `Login failed: ${response.status()}`
            );
        }

        const body = await response.json();

        this.token = body.token;
        this.userId = body.userId;

        console.log('Logged in user:', email);
        console.log('User ID:', this.userId);

        return body;
    }

    // =========================
    // GET AUTH HEADERS
    // =========================
    getHeaders() {

        return {
            Authorization: this.token,
            'Content-Type': 'application/json',
        };
    }

    // =========================
    // ADD PRODUCT TO CART
    // =========================
    async addToCart(product) {

        const response = await this.request.post(
            `${this.baseURL}/api/ecom/user/add-to-cart`,
            {
                data: {
                    _id: this.userId,
                    product: product,
                },

                headers: this.getHeaders(),
            }
        );

        if (!response.ok()) {
            throw new Error(
                `Add to cart failed: ${response.status()}`
            );
        }

        const body = await response.json();

        console.log('Added to cart:', product.productName);

        return body;
    }

    // =========================
    // GET CART COUNT
    // =========================
    async getCartCount() {

        const response = await this.request.get(
            `${this.baseURL}/api/ecom/user/get-cart-count/${this.userId}`,
            {
                headers: this.getHeaders(),
            }
        );

        if (!response.ok()) {
            throw new Error(
                `Get cart count failed: ${response.status()}`
            );
        }

        const body = await response.json();

        return body;
    }

    // =========================
    // CREATE ORDER
    // =========================
    async createOrder(country, productId) {

        const response = await this.request.post(
            `${this.baseURL}/api/ecom/order/create-order`,
            {
                data: {
                    orders: [
                        {
                            country: country,
                            productOrderedId: productId,
                        },
                    ],
                },

                headers: this.getHeaders(),
            }
        );

        if (!response.ok()) {
            throw new Error(
                `Create order failed: ${response.status()}`
            );
        }

        const body = await response.json();

        console.log('Order created');
        console.log(body);

        return body;
    }

    // =========================
    // CREATE MULTIPLE ORDERS
    // =========================
    async createMultipleOrders(country, productIds) {

        const ordersPayload = productIds.map(id => ({
            country: country,
            productOrderedId: id,
        }));

        const response = await this.request.post(
            `${this.baseURL}/api/ecom/order/create-order`,
            {
                data: {
                    orders: ordersPayload,
                },

                headers: this.getHeaders(),
            }
        );

        if (!response.ok()) {
            throw new Error(
                `Create multiple orders failed: ${response.status()}`
            );
        }

        return await response.json();
    }

    // =========================
    // CLEAR CART (optional)
    // =========================
    async clearCart(productId) {

        const response = await this.request.delete(
            `${this.baseURL}/api/ecom/user/remove-from-cart/${productId}`,
            {
                headers: this.getHeaders(),
            }
        );

        return response;
    }
}

module.exports = { APIUtils };