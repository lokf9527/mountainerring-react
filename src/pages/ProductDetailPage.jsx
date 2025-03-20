import axios from "axios";
import { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Toast from "../components/common/Toast"
import { pushMessage } from "../redux/toastSlice";
import { updateCartData } from "../redux/cartSlice.js";
import { useDispatch } from "react-redux";
import ReactLoading from 'react-loading';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ProductDetailPage() {
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([]);
    const [qtySelect, setQtySelect] = useState(1)

    const [isScreenLoading, setIsScreenLoading] = useState(false)

    const {id: product_id} = useParams()

    const swiperRef = useRef(null)

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
      
      new Swiper(swiperRef.current, {
        modules: [Autoplay],
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
          767: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });

    }, []);

    useEffect(() => {
        const getProduct = async () => {
          setIsScreenLoading(true)
          try {
            const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${product_id}`);
            setProduct(res.data.product);
          } catch (error) {
            const {message} = error.response.data
            dispatch(pushMessage({
              text:message.join(""),
              status:'failed'
            }))
          } finally {
            setIsScreenLoading(false)
          }
        };
        getProduct();
      }, []);

      const addCartItem = async (product_id, qty) => {
        setIsScreenLoading(true)
        try {
          await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
            data: {
              product_id,
              qty: Number(qty)
            }
          })
          getCart();
          dispatch(pushMessage({
            text:'加入購物車成功',
            status:'success'
          }))
        } catch (error) {
          const {message} = error.response.data
          dispatch(pushMessage({
            text:message.join(""),
            status:'failed'
          }))
        } finally {
          setIsScreenLoading(false)
        }
      }

      useEffect(() => {
        const getProducts = async () => {
          setIsScreenLoading(true)
          try {
            const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
            setProducts(res.data.products);
          } catch (error) {
            const {message} = error.response.data
              dispatch(pushMessage({
                text:message.join(""),
                status:'failed'
              }))
          } finally {
            setIsScreenLoading(false)
          }
        };
        getProducts();
        
      }, []);

       return (
          <div className="container-fluid">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src={product.imageUrl}
                          className="d-block w-100"
                          alt={product.title}
                        />
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
                <div className="col-md-5">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                      <li className="breadcrumb-item">
                        <Link className="text-muted" to="/">
                          首頁
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link className="text-muted" to="/products">
                          產品列表
                        </Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        產品資訊
                      </li>
                    </ol>
                  </nav>
                  <h2 className="fw-bold h1 mb-1">{product.title}</h2>
                  <p className="mb-0 text-muted text-end">
                    <del>NT${product.origin_price?.toLocaleString()}</del>
                  </p>
                  <p className="h4 fw-bold text-end">NT${product.price?.toLocaleString()}</p>
                  <div className="row align-items-center">
                    <div className="col-6">
                      <div className="input-group my-3 bg-light rounded">
                        <div className="input-group-prepend">
                          <button
                            onClick={() => setQtySelect(qtySelect - 1)}
                            className="btn btn-outline-dark border-0 py-2"
                            disabled={qtySelect === 1}
                            type="button"
                            id="button-addon1"
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control border-0 text-center my-auto shadow-none bg-light"
                          placeholder=""
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                          value={qtySelect}
                        />
                        <div className="input-group-append">
                          <button
                          onClick={() => setQtySelect(qtySelect + 1)}
                            className="btn btn-outline-dark border-0 py-2"
                            type="button"
                            id="button-addon2"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <button
                        onClick={() => addCartItem(product_id,qtySelect)}
                        type="button"
                        className="text-nowrap btn btn-dark w-100 py-2"
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-5">
                <div className="col-md-7">
                  <p>
                  {product.description}
                  </p>
                </div>
                {/* <div className="col-md-3">
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor
                  </p>
                </div> */}
              </div>
              <h3 className="fw-bold">相關行程</h3>
              <div ref={swiperRef} className="swiper mt-4 mb-5">
                <div className="swiper-wrapper">
                {products.map((product) => (
                    <div key={product.id} className="swiper-slide">
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <img
                        src={product.imageUrl}
                        className="card-img-top rounded-0"
                        alt={product.title}
                      />
                      <a href="#" className="text-dark"></a>
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-3">
                        <Link to={`/products/${product.id}`}>{product.title}</Link>
                        </h4>
                        <p className="card-text mb-0">
                          NT${product.price}
                        </p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
            <Toast/> 
            {isScreenLoading && (
              <div className="d-flex justify-content-center align-items-center"
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(255,255,255,0.3)",
                    zIndex: 999,
                    }}
               >
                <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
               </div>
            )}
          </div>
       );

      
      
    // return (
    //     <>
    //     <div className="container mt-5">
    //         <div className="row">
    //             <div className="col-6">
    //             <img className="img-fluid" src={product.imageUrl} alt={product.title} />
    //             </div>
    //             <div className="col-6">
    //             <div className="d-flex align-items-center gap-2">
    //                 <h2>{product.title}</h2>
    //                 <span className="badge text-bg-success">{product.category}</span>
    //             </div>
    //             <p className="mb-3">{product.description}</p>
    //             <p className="mb-3">{product.content}</p>
    //             <h5 className="mb-3">NT$ {product.price}</h5>
    //             <div className="input-group align-items-center w-75">
    //                 <select
    //                 value={qtySelect}
    //                 onChange={(e) => setQtySelect(e.target.value)}
    //                 id="qtySelect"
    //                 className="form-select"
    //                 >
    //                 {Array.from({ length: 10 }).map((_, index) => (
    //                     <option key={index} value={index + 1}>
    //                     {index + 1}
    //                     </option>
    //                 ))}
    //                 </select>
                    
    //                     <button disabled={isLoading} onClick={() => addCartItem(product_id, qtySelect) } type="button" className="btn btn-primary d-flex align-item-center gap-2">
    //                     加到購物車
    //                     {isLoading && (<ReactLoading type={"spin"} color={"#000"} height={"1.5rem"} width={"1.5rem"}/>)}
    //                 </button>
    //             </div>
    //             </div>
    //         </div>
    //     </div>
    //     {isScreenLoading && (
    //         <div className="d-flex justify-content-center align-items-center"
    //             style={{
    //                 position: "fixed",
    //                 inset: 0,
    //                 backgroundColor: "rgba(255,255,255,0.3)",
    //                 zIndex: 999,
    //                 }}
    //         >
    //         <ReactLoading type="spin" color="black" width="4rem" height="4rem" /></div>
    //     )}
    //     </>
    // )
}