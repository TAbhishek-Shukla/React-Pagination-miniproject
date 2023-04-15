import React, { useEffect, useState } from 'react'


//server side controllled pagination
const PaginationBackend = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1);
    const [totalpages, settotalPages] = useState(0);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);
            const data = await res.json();
        
            setLoading(false);
            if (data && data.products)
                setProducts(data.products);
                settotalPages(data.total / 10);
            console.log("totlapages:",data.total);
            console.log(data.products);
        }
        catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [page])

    if (loading) { return <h2 className='loading-message'>Loading...</h2> };

    //handling pagination
    const PageHandler = (selectedpage) => {
        console.log("page called");
        if (selectedpage >= 1 && selectedpage <= totalpages && selectedpage !== page)
            setPage(selectedpage);
    }

    return (
        <>
            <h1>Pagination</h1>
            {products.length > 0 &&
                <div className="products container grid grid-three-col">
                    {products.map((i, index) => {
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
                        [...Array(totalpages)].map((_, index) => {
                            return <span
                                className={page === index + 1 ? "activePage" : ""}
                                key={index} onClick={() => PageHandler(index + 1)}>{index + 1}</span>
                        })
                    }

                    <span
                        className={page < totalpages ? "t" : "disablebtn"}
                        onClick={() => PageHandler(page + 1)}>
                    ▶</span>
                </div>
            }
        </>
    )
}

export default PaginationBackend