import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../components/common/Toast"
import { pushMessage } from "../redux/toastSlice";
import { useDispatch } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutFormPage() {
  const [cart,setCart] = useState({})

  const dispatch = useDispatch();

  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`)
      setCart(res.data.data)
      
    } catch (error) {
      const {message} = error.response.data
          dispatch(pushMessage({
            text:message.join(""),
            status:'failed'
          }))
    }
  }

  useEffect(() => {
    getCart();
    
  }, []);


    const {
      register,
      handleSubmit,
      formState:{errors}
    } = useForm();

    const navigate = useNavigate();

    const onSubmit =  handleSubmit((data) => {
      const {message, ...user} =data;
      const userInfo = {
        data: {
          user,
          message
        }
      }
      checkout(userInfo)
     
    })

    const checkout = async (data) => {
      try  {
        const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`,data)
        const orderId = res.data.orderId
        navigate(`/checkout-payment/${orderId}`);
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
              填寫聯絡資訊
              </a> */}
             
              <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                <li className="me-md-6 me-3 position-relative custom-step-line">
                  <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                  <span className="text-nowrap">填寫聯絡資訊</span>
                </li>
                <li className="me-md-6 me-3 position-relative custom-step-line">
                  <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
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
            <h3 className="fw-bold mb-4 pt-3">填寫聯絡資訊</h3>
          </div>
        </div>
        <div className="row flex-row-reverse justify-content-center pb-5">
          <div className="col-md-4">
            <div className="border p-4 mb-4">
              {cart.carts?.map((cartItem) => (
                <div key={cartItem.id} className="d-flex mb-2">
                <img
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.title}
                  className="me-2"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <p className="mb-0 fw-bold">{cartItem.product.title}</p>
                    <p className="mb-0">NT${cartItem.product.price}</p>
                  </div>
                  <p className="mb-0 fw-bold">X{cartItem.qty}</p>
                </div>
              </div>
              ))}
              {/* <div className="d-flex">
                <img
                  src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                  alt=""
                  className="me-2"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <p className="mb-0 fw-bold">Lorem ipsum</p>
                    <p className="mb-0">NT$12,000</p>
                  </div>
                  <p className="mb-0 fw-bold">x1</p>
                </div>
              </div> */}
              <table className="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-4 font-weight-normal"
                    >
                      小計
                    </th>
                    <td className="text-end border-0 px-0 pt-4">NT${cart.total}</td>
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
                <p className="mb-0 h4 fw-bold">NT${cart.final_total}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={onSubmit}>
              <p>聯絡資訊</p>
              <div className="mb-2">
                <label for="ContactMail" className="text-muted mb-0">
                  Email
                </label>
                <input
                  {...register('email', {
                    required: 'Email 欄位必填',
                    pattern: {
                      value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Email格式錯誤'
                    }
                  })}
                  type="email"
                  className={`form-control ${errors.email && 'is-invalid'}`}
                  id="ContactMail"
                  aria-describedby="emailHelp"
                  placeholder="請輸入Email"
                />
              </div>
              {errors.email && <div className="text-danger my-2">{errors.email.message}</div>}
              {/* <p className="mt-4"></p> */}
              <div className="mb-2">
                <label for="ContactName" className="text-muted mb-0">
                  收件人姓名
                </label>
                <input
                  {...register('name', {
                    required: '姓名欄位必填',
                  })}
                  type="text"
                  className={`form-control ${errors.name && 'is-invalid'}`}
                  id="ContactName"
                  placeholder="請輸入姓名"
                />
              </div>
              {errors.name && <div className="text-danger my-2">{errors.name.message}</div>}
              <div className="mb-2">
                <label for="ContactPhone" className="text-muted mb-0">
                  收件人電話
                </label>
                <input
                  {...register('tel', {
                    required: '電話欄位必填',
                    pattern: {
                      value:/^(0[2-8]\d{7}|09\d{8})$/,
                      message: '電話格式錯誤'
                    }
                  })}
                  type="text"
                  className={`form-control ${errors.tel && 'is-invalid'}`}
                  id="ContactPhone"
                  placeholder="請輸入電話"
                />
              </div>
              {errors.tel && <div className="text-danger my-2">{errors.tel.message}</div>}
              <div className="mb-2">
                <label for="ContactAddress" className="text-muted mb-0">
                收件人地址
                </label>
                <input
                  {...register('address', {
                    required: '地址欄位必填',
                  })}
                  type="text"
                  className={`form-control ${errors.address && 'is-invalid'}`}
                  id="ContactAddress"
                  placeholder="請輸入地址"
                />
              </div>
              {errors.address && <div className="text-danger my-2">{errors.address.message}</div>}
              <div className="mb-2">
                <label for="ContactMessage" className="text-muted mb-0">
                  留言
                </label>
                <textarea
                  {...register('message')}
                  className="form-control"
                  rows="3"
                  id="ContactMessage"
                  placeholder=""
                ></textarea>
              </div>
              
              <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                <Link to="/cart" className="text-dark mt-md-0 mt-3">
                  <i className="fas fa-chevron-left me-2"></i> 回購物車
                </Link>
                <button type='submit' to="/checkout-payment" className="btn btn-dark py-3 px-7">
                  選擇付款方式
                </button>
              </div>
              
            </form>
            {/* <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link to="/cart" className="text-dark mt-md-0 mt-3">
                <i className="fas fa-chevron-left me-2"></i> 回購物車
              </Link>
              <Link to="/checkout-payment" className="btn btn-dark py-3 px-7">
                選擇付款方式
              </Link>
              <button type='submit' to="/checkout-payment" className="btn btn-dark py-3 px-7">
                選擇付款方式
              </button>
            </div> */}
          </div>
        </div>
        <Toast/>
      </div>
    );
  }
  