import React, { useEffect, useState } from 'react'

const URL = "https://dummyjson.com/products?limit=0";
//front controlled pagination
const Pagination = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1);

    const fetchProducts = async (uri) => {
        setLoading(true);
        try {
            const res = await fetch(uri);
            const data = await res.json();
            setLoading(false);
            if (data && data.products)
                setProducts(data.products);
            // console.log(products);
        }
        catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts(URL);
    }, [page])

    if (loading) { return <h2 className='loading-message'>Loading...</h2> };

    //handling pagination
    const PageHandler = (selectedpage) => {
        console.log("page called");
        if (selectedpage >= 1 && selectedpage <= products.length / 10 && selectedpage !== page)
            setPage(selectedpage);
    }

    return (
        <>
            <h1>Pagination</h1>
            {products.length > 0 &&
                <div className="products container grid grid-three-col">
                    {products.slice(page * 10 - 10, page * 10).map((i, index) => {
                        const { thumbnail, images, title } = i;
                        const newtitle = title.substring(0, 20);
                        return (
                            <div key={index + title} className="card">
                                <figure className='card-img'>
                                    <img src={images[0]}
                                        className='product-img' alt={title} />
                                </figure>
                                <p>{newtitle}</p>
                            </div>
                        )
                    })}

                </div>

            }
            {
                products.length > 0 &&
                <div className="pagination">
                    <span className={page > 1  ? "" : "disablebtn"} 
                    onClick={() => PageHandler(page- 1)}>
                    ◀</span>
                    {
                        [...Array(products.length / 10)].map((_, index) => {
                            return <span
                                className={page === index + 1 ? "activePage" : ""}
                                key={index} onClick={() => PageHandler(index + 1)}>{index + 1}</span>
                        })
                    }

                    <span
                        className={page < products.length / 10 ? "t" : "disablebtn"}
                        onClick={() => PageHandler(page + 1)}>
                    ▶</span>
                </div>
            }
        </>
    )
}

export default Pagination