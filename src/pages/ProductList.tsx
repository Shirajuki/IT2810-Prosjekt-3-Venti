
import React, {  useState ,useEffect} from 'react'
import Product from "../models/product"
import api from '../api'


import styled from 'styled-components'



const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

interface Column {
    Header: string
    accessor: string
    filterable: boolean
}

function ProductList() {
        const [products, setProducts] = useState<Product[]>([])
        const [columns, setColumns] = useState<Column[]>([])
        const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(()=>{
        const getAllProducts = async () => {
            setIsLoading(true)
            await api.getAllProducts().then(products => {
                setProducts(products.data.data)
                setIsLoading(false)
            })
        }
        getAllProducts()
        },[])

        console.log('TCL: ProductList -> render -> products', products)

        setColumns([
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Image',
                accessor: 'image',
                filterable: true,
            },
            {
                Header: 'Product_type',
                accessor: 'product_type',
                filterable: true,
            },
            {
                Header: 'Description',
                accessor: 'description',
                filterable: true,
            },
            {
                Header: 'Product_colors',
                accessor: 'product_colors',
                filterable: true,
            },
        ])

        let showTable:boolean = true
        if (!products.length) {
            showTable = false
        }

        

        return (
            <Wrapper>
                {showTable && !isLoading && (
                    <table>
                        <thead>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                        </thead>
                        <tbody>
                            {products.map((product, i) => (
                                <tr key={i}>
                                    <td>{product?.name}</td>
                                    <td></td>
                                    <td></td>
                                </tr>)
                            )}
                        </tbody>
                    </table>
                )}
            </Wrapper>
        )
}

export default ProductList
