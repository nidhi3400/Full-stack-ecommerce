import React, { useContext, useEffect } from "react";
import useGetRequest from "../../hooks/useGetRequest";
import { apis } from "../../constants";
import { Context } from "../../App";

const AllOrders = () => {

    const { setOpenOrderDetail } = useContext(Context)
    const { fetchData, data } = useGetRequest(apis.GET_ALL_ORDERS);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return (
        <>
            {data?.map(item => {
                return <div
                    style={{ cursor: "pointer", padding: 10, borderStyle: "solid", borderColor: "black", margin: 10 }}
                    key={JSON.stringify(item)}
                    onClick={() => setOpenOrderDetail({ isOpen: true, data: item })}>
                    <b>Order Id: {item.orderId}</b>
                </div>
            })}
        </>
    )
}

export default AllOrders;