# CMS-Customer API Documentation

## 1. Get Current Logged-in User

* URL

    /carts

* Method

    `GET`

* URL Params

    None

* Data Params

    ```
    {
        headers: {access_token}
    }
    ```

* Success Response
    
    Code: `200`
    
    Content:
    
    ```
    {
        "id" : Number,
        "totalPrice" : Number,
        "status" : Cart Status,
        "UserId" : User Id,
        "CartDetails" : [
            {
                "id": 1,
                "ProductId": 1,
                "CartId": 1,
                "quantity": 5,
                "price": 50000000,
                "Product": {
                    "id": Product Id,
                    "name": Product Name,
                    "image_url": Product Image URL,
                    "price": Product Price,
                    "stock": Product Stock,
                    "UserId": User Id,
                    "category": Product Category,
                }
            },
        ],
    },
    ```

* Error Response

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Authentication failed.'
    }
    ```

## 2. Add Product To Cart

* URL

    /carts/add-cart

* Method

    `POST`

* URL Params

    None

* Data Params

    ```
    {
        headers: {access_token},
        data: {
            ProductId: ProductId,
            quantity: Product Quantity
        }
    },
    ```

* Success Response
    
    Code: `200`
    
    Content:
    
    ```
    {
        "id" : Number,
        "totalPrice" : Number,
        "status" : Cart Status,
        "UserId" : User Id,
        "CartDetails" : [
            {
                "id": 1,
                "ProductId": 1,
                "CartId": 1,
                "quantity": 5,
                "price": 50000000,
                "Product": {
                    "id": Product Id,
                    "name": Product Name,
                    "image_url": Product Image URL,
                    "price": Product Price,
                    "stock": Product Stock,
                    "UserId": User Id,
                    "category": Product Category,
                }
            },
        ],
    },
    ```

* Error Response

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Authentication failed.'
    }
    ```

## 3. Checkout

* URL

    /carts/checkout/:id

* Method

    `POST`

* URL Params

    id: CartId (Number)

* Data Params

    ```
    {
        headers: {access_token},
    },
    ```

* Success Response
    
    Code: `201`
    
    Content:
    
    ```
    {
        {
            id: ProductId,
            name: Product Name,
            stock: Product Stock,
            image_url: Product Image URL,
            category: Product Category
        }
    },
    ```

* Error Response

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Authentication failed.'
    }
    ```

## 4. Edit Cart Quantity

* URL

    /carts/edit-cart/:id

* Method

    `PUT`

* URL Params

    id: CartId (Number)

* Data Params

    ```
    {
        headers: {access_token},
        data: {
            status: 0 (-1 Qty) or 1 (+1 Qty),
            ProductId: ProductId
        }
    },
    ```

* Success Response
    
    Code: `201`
    
    Content:
    
    ```
    {
        {
            id: CartDetails Id,
            ProductId: ProductId,
            CartId: Cart Id,
            quantity: Cart Quantity,
            price: Cart Price
        }
    },
    ```

* Error Response

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Authentication failed.'
    }
    ```
    
    Code: `401 Authorization Failed`
    
    Content:
        
    ```
    {
        err: 'Not Authorized'
    }
    ```