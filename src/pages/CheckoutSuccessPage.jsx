import { Link } from "react-router-dom";
import { useEffect } from "react"
import axios from "axios";
import { updateCartData } from "../redux/cartSlice.js";
import Toast from "../components/common/Toast"
import { pushMessage } from "../redux/toastSlice";
import { useDispatch } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutSuccessPage() {

  const dispatch = useDispatch();

  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`)
      dispatch(updateCartData(res.data.data))
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
    return (
      <div className="container-fluid">
        <div className="position-relative d-flex">
          <div
            className="container d-flex flex-column"
            style={{ minHeight: "100vh" }}
          >
            {/* <nav className="navbar navbar-expand-lg navbar-light px-0">
              <a className="navbar-brand" href="./index.html">
                Navbar
              </a>
            </nav> */}
            <div className="row my-auto pb-7">
              <div className="col-md-4 d-flex flex-column">
                <div className="my-auto">
                  <h2>付款成功</h2>
                  {/* <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod
                  </p> */}
                  <Link to="/products" className="btn btn-dark mt-4 px-5">
                    回到商品列表
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-md-50 w-100 position-absolute opacity-1"
            style={{
              zIndex: -1,
              minHeight: "100vh",
              right: 0,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
              backgroundPosition: "center center",
            }}
          ></div>
        </div>
        <Toast/> 
      </div>
    );
  }
  