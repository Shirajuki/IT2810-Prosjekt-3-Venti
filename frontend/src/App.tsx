import React, { Fragment, useEffect, useState } from 'react';
import Product from "./models/product"

const App = () => {
    useEffect(() => {
        const getAPI = async () => {
            const response = await fetch('http://localhost:8080/');
            const data = await response.json();

            try {
                console.log(data);
                setLoading(false);
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAPI();
    }, []);

    const [product, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    return (
        <Fragment>
            <h1>Product Home</h1>

            <div>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <div>
                        {product.map((data) => (
                            <div key={data._id}>
                                <ul>
                                    <li>
                                        <h1>
                                            <a href="/{data.id}">{data.name}</a>
                                        </h1>
                                    </li>
                                    <li>
                                        <img src={data.image_link} alt={data.name} />
                                    </li>
                                    <li>
                                        <p>{data.description}</p>
                                    </li>
                                    <li>
                                        <h3>{data.price}</h3>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h1>Add New Product</h1>
                <form method="POST" action="http://localhost:8080/add-product">
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" required />
                    </div>
                    <div>
                        <label>Image Link</label>
                        <input type="text" name="image_link" required />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="text" name="price" required />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description" required />
                    </div>

                    <div>
                        <button type="submit">Add Product</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default App;