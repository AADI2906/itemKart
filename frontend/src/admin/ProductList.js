import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";

import {
  clearErrors,
  getAdminProducts,
//   deleteProduct,
} from "../actions/productActions";
import { Link , useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import {Edit , Delete} from "@material-ui/icons";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../constants/productConstants";

const ProductList = () => {

    const dispatch = useDispatch();

     useEffect(() => {
          if(error){
            console.log(error);
          }
        dispatch(getAdminProducts());
        }, [dispatch])
        

    const {error , products} = useSelector((state) => state.product);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <Edit />
                </Link>
    
                <Button
         
                >
                  <Delete />
                </Button>
              </Fragment>
            );
          },
        },
      ];

      const rows = [];

      products &&
        products.forEach((item) => {
          rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
          });
        });

       
    

      return(
        <>
            <div className="dashboard">
              <SideBar/>
              <div className="productListContainer">
                <h1 id="productListHeading">All Products</h1>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight 
                />
              </div>  
            </div>
        </>
      )

}

export default ProductList