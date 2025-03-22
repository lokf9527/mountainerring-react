import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from 'bootstrap';
import Pagination from "../../components/common/Pagination";
import Toast from "../../components/common/Toast"
import { useDispatch } from "react-redux";
import { pushMessage } from "../../redux/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function AdminOrdersPage () {
    const defaultModalState = {
        create_at: '',
        id: '',
        is_paid: false,
        message: '',
        products: {},
        user: {
        address: '',
        email: '',
        name: '',
        tel: ''
        },
        num: 0,
        total: 0,
        remark: ''
    };

    const [orders,setOrders] = useState([])
    const [pageInfo , setPageInfo] = useState({})
    const dispatch = useDispatch();

    const getOrders = async (page = 1) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/orders?page=${page}`)
      setOrders(res.data.orders);
      setPageInfo(res.data.pagination);
      dispatch(pushMessage({
        text:'取得訂單列表成功',
        status:'success'
      }))
    } catch (error) {
        const {message} = error.response.data
        dispatch(pushMessage({
          text:message.join(""),
          status:'failed'
        }))
      
    }
    }

    const checkUserLogin = async () => {
        try {
          await axios.post(`${BASE_URL}/v2/api/user/check`);

        } catch (error) {
            const {message} = error.response.data
            dispatch(pushMessage({
              text:message.join(""),
              status:'failed'
            }))
        }
      };

      useEffect(() => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1",);
        axios.defaults.headers.common['Authorization'] = token;
        checkUserLogin();
      }, [])

      useEffect(() => {
        getOrders();
    
      }, []);

    useEffect (() => {
        new Modal(orderModalRef.current);

        new Modal(delOrderModalRef.current);

      }, [])

    const orderModalRef = useRef(null)
    const delOrderModalRef = useRef(null)

    const [tempOrder, setTempOrder] = useState(defaultModalState);
    
    const handleOpenOrderModal = (order) => {
        const modalInstance = Modal.getInstance(orderModalRef.current);
        setTempOrder(order)
        modalInstance.show()

    }

    const handleCloseOrderModal = () => {
        const modalInstance = Modal.getInstance(orderModalRef.current);

        modalInstance.hide()
    }
    
    const handleModalInputChange = (e) => {
        const {value, name, checked, type} = e.target;
        setTempOrder ({
            ...tempOrder,
            [name]:type === "checkbox" ? checked : value
        })
      }
    
    const updateOrderPaid = async() => {
        try {
            await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${tempOrder.id}`,{
                data:{
                    ...tempOrder,
                    is_paid:tempOrder.is_paid ? true : false
                }
            })
            handleCloseOrderModal();
            getOrders();
            dispatch(pushMessage({
                text:'修改付款狀態成功',
                status:'success'
              }))
        } catch (error) {
            const {message} = error.response.data
            dispatch(pushMessage({
                text:message.join(""),
                status:'failed'
            }))

        }
    }
     
      const handleOpenDelOrderModal = (order) => {
        const modalInstance = Modal.getInstance(delOrderModalRef.current);

        setTempOrder(order)

        modalInstance.show()

    }   
    
      const handleCloseDelOrderModal = () => {
        const modalInstance = Modal.getInstance(delOrderModalRef.current)
        modalInstance.hide()

    }

    const deleteOrder = async () => {
        try {
            await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${tempOrder.id}`,
                )
            handleCloseOrderModal();
            getOrders();
            dispatch(pushMessage({
                text:'訂單刪除成功',
                status:'success'
              }))
        } catch (error) {
            const {message} = error.response.data
            dispatch(pushMessage({
                text:message.join(""),
                status:'failed'
            }))
        }
      }
    
      const handlePageChange = (page) => {
        getOrders(page)
      }  

    return (
        <>
        <table className="table mt-4">
            <thead>
                <tr>
                <th>購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th>應付金額</th>
                <th>是否付款</th>
                <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) =>(
                        <tr key={order.id} className={!order.is_paid ? "text-secondary" : ""}>
                        <td>{new Date(order.create_at * 1000).toLocaleDateString()}</td>
                        <td>{order.user?.email}</td>
                        <td>
                            <ul className="list-unstyled">
                            {Object.values(order.products).map((product, i) => (
                                <li key={i}>
                                {product.product.title} 數量：{product.qty} {product.product.unit}
                                </li>
                            ))}
                            </ul>
                        </td>
                        <td className="text-right">{order.total}</td>
                        <td>
                            {/* <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`paidSwitch${order.id}`}
                                checked={order.is_paid}
                                // onChange={() => updatePaid(item)}
                            />
                            <label className="form-check-label" htmlFor={`paidSwitch${order.id}`}>
                                {order.is_paid ? "已付款" : "未付款"}
                            </label>
                            </div> */}
                            {order.is_paid ? (<span className="text-success">已付款</span>):(<span>未付款</span>)}
                        </td>
                        <td>
                            <div className="btn-group">
                            <button onClick={() => handleOpenOrderModal(order)} className="btn btn-outline-primary btn-sm" type="button">
                                檢視
                            </button>
                            <button onClick={() => handleOpenDelOrderModal(order)} className="btn btn-outline-danger btn-sm" type="button" >
                                刪除
                            </button>
                            </div>
                        </td>
                        </tr>
                ))}  
            </tbody>
        </table>
        <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>

        {/* 訂單modal */}
        <div ref={orderModalRef} className="modal fade" id="productModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content border-0">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title" id="exampleModalLabel">
                        <span>訂單細節</span>
                        </h5>
                        <button
                        onClick={handleCloseOrderModal}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                        <div className="col-md-4">
                            <h3>用戶資料</h3>
                            <table className="table">
                            {tempOrder?.user && (
                                <tbody>
                                <tr>
                                    <th style={{ width: "100px" }}>姓名</th>
                                    <td>{tempOrder.user.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{tempOrder.user.email}</td>
                                </tr>
                                <tr>
                                    <th>電話</th>
                                    <td>{tempOrder.user.tel}</td>
                                </tr>
                                <tr>
                                    <th>地址</th>
                                    <td>{tempOrder.user.address}</td>
                                </tr>
                                </tbody>
                            )}
                            </table>
                        </div>
                        <div className="col-md-8">
                            <h3>訂單細節</h3>
                            <table className="table">
                            <tbody>
                                <tr>
                                <th style={{ width: "100px" }}>訂單編號</th>
                                <td>{tempOrder?.id}</td>
                                </tr>
                                <tr>
                                <th>下單時間</th>
                                <td>{new Date(tempOrder?.create_at * 1000).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                <th>付款時間</th>
                                <td>
                                    {tempOrder?.paid_date ? new Date(tempOrder.paid_date * 1000).toLocaleDateString() : "時間不正確"}
                                </td>
                                </tr>
                                <tr>
                                <th>付款狀態</th>
                                <td>
                                    {tempOrder.is_paid ? <strong className="text-success">已付款</strong> : <span className="text-muted">尚未付款</span>}
                                </td>
                                </tr>
                                <tr>
                                <th>總金額</th>
                                <td>{tempOrder?.total}</td>
                                </tr>
                            </tbody>
                            </table>
                            <h3>選購商品</h3>
                            <table className="table">
                            <tbody>
                                {tempOrder?.products &&
                                Object.values(tempOrder.products).map((item) => (
                                    <tr key={item.id}>
                                    <th>{item.product.title}</th>
                                    <td>{item.qty} / {item.product.unit}</td>
                                    <td className="text-end">{item.final_total}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                            <div className="d-flex justify-content-end">
                            <div className="form-check">
                                <input
                                checked = {tempOrder.is_paid}
                                onChange={handleModalInputChange}
                                name = "is_paid"
                                className="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                {tempOrder.is_paid ? "已付款" : "未付款"}
                                </label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                        onClick={handleCloseOrderModal}
                        type="button"
                        className="btn btn-outline-secondary"
                        data-bs-dismiss="modal"
                        >
                        取消
                        </button>
                        <button
                        onClick={updateOrderPaid}
                        type="button"
                        className="btn btn-primary"
                        ata-bs-dismiss="modal"
                        // onClick={() => updatePaid(tempOrder)}
                        >
                        修改付款狀態
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
        
        {/* 刪除modal */}
        <div ref={delOrderModalRef} className="modal fade" id="delCouponModal" tabIndex="-1" style={{ backgroundColor:"rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5">刪除優惠卷</h1>
                <button
                    onClick={handleCloseDelOrderModal}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
                </div>
                <div className="modal-body">
                你是否要刪除 
                <span className="text-danger fw-bold">訂單編號：{tempOrder.id}</span>
                </div>
                <div className="modal-footer">
                <button
                    onClick={handleCloseDelOrderModal}
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-secondary"
                >
                    取消
                </button>
                <button onClick={deleteOrder} data-bs-dismiss="modal" type="button" className="btn btn-danger">
                    刪除
                </button>
                </div>
            </div>
            </div>
        </div>
        <Toast/>
        </>
    )
}