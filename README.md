# CMS-Server API Documentation

## 1. Add new Product

* URL

    /products

* Method

    `POST`

* URL Params

    None

* Data Params

    ```
    {
        "name" : "Product Name",
        "category" : "Product Category",
        "image_url" : "Link to an image",
        "stock" : "Product stock",
        "price" : "Product price",
    },
    {
        headers: {access_token}
    }
    ```

* Success Response
    
    Code: `201 CREATED`
    
    Content:
    
    ```
    {
        "name" : "Product Name",
        "category" : "Product Category",
        "image_url" : "Link to an image",
        "stock" : "Product stock",
        "price" : "Product price",
    },
    ```

* Error Response
    
    Code: `400 BAD REQUEST`
    
    Content:
    
    ```
    {
        error: ['Name is required', 
                ...,
                'Category is required']
    }
    ```

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
    
## 2. Get all Products

* URL

    /products

* Method

    `GET`

* URL Params

    None

* Data Params

    {
        headers: {access_token}
    }


* Success Response
        
    Code: `200 OK`
        
    Content:
    ```
    [
        {
            "id": 1,
            "name" : "Product Name",
            "category" : "Product Category",
            "image_url" : "Link to an image",
            "stock" : "Product stock",
            "price" : "Product price",
        },
        {
            "id": 2,
            "name" : "Product Name",
            "category" : "Product Category",
            "image_url" : "Link to an image",
            "stock" : "Product stock",
            "price" : "Product price",
        },
    ]
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

## 3. Get specific Product by ID

* URL

    /products/:id

* Method

    `GET`

* URL Params

    Required: `id = [integer]`

* Data Params

    ```
    {
        headers: {access_token}
    }
    ```


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "id": 1,
        "name" : "Product Name",
        "category" : "Product Category",
        "image_url" : "Link to an image",
        "stock" : "Product stock",
        "price" : "Product price",
    },
    ```

* Error Response
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Product not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Not Authorized'
    }
    ```
    
## 4. Edit Product by ID

* URL

    /products/:id

* Method

    `PUT`

* URL Params

    Required: `id = [integer]`

* Data Params

    ```
    {
        "name" : "Product Name",
        "category" : "Product Category",
        "image_url" : "Link to an image",
        "stock" : "Product stock",
        "price" : "Product price",
    },
    {
        headers: {access_token}
    }
    ```


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "id": 1,
        "name" : "Product Name",
        "category" : "Product Category",
        "image_url" : "Link to an image",
        "stock" : "Product stock",
        "price" : "Product price",
    },
    ```

* Error Response

    Code: `400 BAD REQUEST`
    
    Content:
```
{
    error: ['Name is required', 
            ...,
            'Category is missing']
}
```
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Content not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Not Authorized'
    }
    ```
    
## 5. Delete specific Task by ID

* URL

    /products/:id

* Method

    `DELETE`

* URL Params

    Required: `id = [integer]`

* Data Params
    
    ```
    {
        headers: {access_token}
    }
    ```


* Success Response
        
    Code: `200 OK`
        
    Content:
    
    ```
    {
        "message" : "Successfuly deleted a Product"   
    }
    ```

* Error Response
    
    Code: `404 NOT FOUND`
    
    Content:
        
    ```
    {
        error: 'Product not found.'
    }
    ```
    
    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
        
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix the problem.'
    }
    ```
    
    Code: `401 Authentication Failed`
    
    Content:
        
    ```
    {
        err: 'Access Token not found in headers'
    }
    ```
    
## 6. User Registration

* URL

    /users/register

* Method

    `POST`

* URL Params

    None

* Data Params

    ```
    {
        "email" : "Email",
        "passsword" : "Password",
    }, 
    ```

* Success Response
    
    Code: `201 CREATED`
    
    Content:
    
    ```
    {
        "id" : "id",
        "username" : "Username",
        "email" : "Email",
    }, 
    ```

* Error Response
    
    Code: `400 BAD REQUEST`
    
    Content:
    
    ```
    {
        error: ['Invalid username', 
                ...,
                'Password is required']
    }
    ```

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
## 7. User Login

* URL

    /users/login

* Method

    `POST`

* URL Params

    None

* Data Params

    ```
    {
        "email" : "Email",
        "passsword" : "Password",
    }, 
    ```

* Success Response
    
    Code: `201 CREATED`
    
    Content:
    
    ```
    {
        "access_token" : access_token,
        "email": email
    }, 
    ```

* Error Response
    
    Code: `400 BAD REQUEST`
    
    Content:
    
    ```
    {
        error: 'Email/password didn't match'
    }
    ```

    Code: `500 INTERNAL SERVER ERROR`
    
    Content:
    
    ```
    {
        error: 'Our server ran into troubles. Please wait few moments for our engineer to fix                 the problem.'
    }
    ```
    
## 8. User Google SignIn

* URL

    /users/google-login

* Method

    `POST`

* URL Params

    None

* Data Params

    ```
    {
        GoogleAccountInformation
    }, 
    ```

* Success Response
    
    Code: `201 CREATED`
    
    Content:
    
    ```
    {
        "access_token" : access_token
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
    