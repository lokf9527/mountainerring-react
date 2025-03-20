import axios from "axios";
import { Link, useParams  } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../components/common/Toast"
import { pushMessage } from "../redux/toastSlice";
import { useDispatch } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutPaymentPage() {
  const [order,setOrder] = useState({})
 
  const dispatch = useDispatch();
  
  const {id: order_id} = useParams()

  const getOrder = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/order/${order_id}`)
      setOrder(res.data.order)
      
    } catch (error) {
      const {message} = error.response.data
          dispatch(pushMessage({
            text:message.join(""),
            status:'failed'
          }))
    }
  }

  useEffect(() => {
    getOrder();
    
  }, []);

  const payOrder = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/pay/${order_id}`)
      dispatch(pushMessage({
        text:'付款成功',
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

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <nav className="navbar navbar-expand-lg navbar-light px-0">
              {/* <a className="navbar-brand" href="./index.html">
              選擇付款方式
              </a> */}
              <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                <li className="me-md-6 me-3 position-relative custom-step-line">
                  <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                  <span className="text-nowrap">填寫聯絡資訊</span>
                </li>
                <li className="me-md-6 me-3 position-relative custom-step-line">
                  <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                  <span className="text-nowrap">選擇付款方式</span>
                </li>
                <li>
                  <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                  <span className="text-nowrap">付款成功</span>
                </li>
              </ul>
            </nav>  
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h3 className="fw-bold mb-4 pt-3">選擇付款方式</h3>
          </div>
        </div>
        <div className="row flex-row-reverse justify-content-center pb-5">
          <div className="col-md-4">
            <div className="border p-4 mb-4">
              {order?.products && Object.keys(order.products).map((key) => {
                 const orderItem = order.products[key];
                 const product = orderItem.product;
                 return (
                  <div key={orderItem.id} className="d-flex mb-2">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="me-2"
                    style={{ width: "48px", height: "48px", objectFit: "cover" }}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 fw-bold">{product.title}</p>
                      <p className="mb-0">NT${product.price}</p>
                    </div>
                    <p className="mb-0 fw-bold">X{orderItem.qty}</p>
                  </div>
                </div>
                 )
              })} 
              <table className="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-4 font-weight-normal"
                    >
                      小計
                    </th>
                    <td className="text-end border-0 px-0 pt-4">NT${order.total}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                    >
                      付款方式
                    </th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">總計</p>
                <p className="mb-0 h4 fw-bold">NT${order.total}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="accordion" id="accordionExample">
              <div className="card rounded-0">
                <div
                  className="card-header bg-white border-0 py-3"
                  id="headingOne"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <p className="mb-0 position-relative custom-checkout-label">
                    現金支付
                  </p>
                </div>
                
              </div>
              <div className="card rounded-0">
                <div
                  className="card-header bg-white border-0 py-3 collapsed"
                  id="headingTwo"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  <p className="mb-0 position-relative custom-checkout-label">
                    ApplePay
                  </p>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body bg-light ps-5 py-4">
                    <div className="mb-2">
                      <label for="Lorem ipsum1" className="text-muted mb-0">
                        信用卡號
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Lorem ipsum1"
                        placeholder="請輸入信用卡號"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card rounded-0">
                <div
                  className="card-header bg-white border-0 py-3 collapsed"
                  id="headingThree"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="true"
                  aria-controls="collapseThree"
                >
                  <p className="mb-0 position-relative custom-checkout-label">
                    LinePay
                  </p>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body bg-light ps-5 py-4">
                    <div className="mb-2">
                      <label for="Lorem ipsum1" className="text-muted mb-0">
                        LinePay
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Lorem ipsum1"
                        placeholder="Lorem ipsum"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              {/* <Link to="/checkout-form" className="text-dark mt-md-0 mt-3">
                <i className="fas fa-chevron-left me-2"></i> 填寫聯絡資訊
              </Link> */}
              <Link
                onClick={payOrder}
                to="/checkout-success"
                className="btn btn-dark py-3 px-7"
              >
                付款
              </Link>
            </div>
          </div>
        </div>
        <Toast/>
      </div>
    );
  }
  