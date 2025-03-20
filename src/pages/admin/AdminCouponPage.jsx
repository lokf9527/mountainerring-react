import { useEffect, useRef, useState } from "react";
import { Modal } from 'bootstrap';
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/common/Pagination";
import Toast from "../../components/common/Toast"
import { useDispatch } from "react-redux";
import { pushMessage } from "../../redux/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function AdminCouponPage () {
    const defaultModalState = {
        title: "",
        code:"",
        due_date:"",
        percent:100,
        is_enabled: 0,
      };

    const [coupons, setCupons] = useState([]);
    const [pageInfo , setPageInfo] = useState({})
    const dispatch = useDispatch();

    const getCoupons = async (page = 1) => {
        try {
          const res = await axios.get(
            `${BASE_URL}/v2/api/${API_PATH}/admin/coupons?page=${page}`
          );
          setCupons(res.data.coupons);
          setPageInfo(res.data.pagination)
          dispatch(pushMessage({
            text:'取得優惠卷列表成功',
            status:'success'
          }))
        } catch (error) {
          const {message} = error.response.data
          dispatch(pushMessage({
            text:message.join(""),
            status:'failed'
          }))
        }
      };

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
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
        axios.defaults.headers.common['Authorization'] = token;
        checkUserLogin();
      }, [])

      useEffect(() => {
        getCoupons();
    
      }, []);

      useEffect (() => {
        new Modal(couponModalRef.current);

        new Modal(delCouponModalRef.current);
      }, [])

      const couponModalRef = useRef(null)
      const delCouponModalRef = useRef(null)
      const [modalMode, setModalMode] = useState(null)

      const handleOpenCouponModal = (mode, coupon) => {
        setModalMode(mode)
        switch (mode) {
            case 'create':
                 setTempCoupon(defaultModalState)
                break;
            
            case 'edit':
                setTempCoupon({
                    ...coupon,
                    due_date: coupon.due_date ? new Date(coupon.due_date * 1000).toISOString().split('T')[0] : '',
                })
                break;
        
            default:
                break;
        }
        
        const modalInstance = Modal.getInstance(couponModalRef.current)

        modalInstance.show()
      }

      const handleOpenDelCouponModal = (coupon) => {
        const modalInstance = Modal.getInstance(delCouponModalRef.current)
        
        setTempCoupon(coupon)

        modalInstance.show()
      }

      const handleCloseDelCouponModal = () => {
        const modalInstance = Modal.getInstance(delCouponModalRef.current)

        modalInstance.hide()
      }

      const handleCloseCouponModal = () => {
        const modalInstance = Modal.getInstance(couponModalRef.current)

        modalInstance.hide()
      }

      const [tempCoupon, setTempCoupon] = useState(defaultModalState);
      

      const handleModalInputChange = (e) => {
        const {value, name, checked, type} = e.target;
        setTempCoupon ({
            ...tempCoupon,
            [name]:type === "checkbox" ? checked : value
        })
      }

      const createCoupon = async () => {
        try {
            await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon`,{
                data:{
                    ...tempCoupon,
                    percent:Number(tempCoupon.percent),
                    due_date:new Date(tempCoupon.due_date).getTime() / 1000,
                    is_enabled:tempCoupon.is_enabled ? 1: 0
                }
            })
            dispatch(pushMessage({
              text:'新增優惠卷成功',
              status:'success'
            }))
        } catch (error) {
            const {message} = error.response.data
              dispatch(pushMessage({
                text:message.join("、"),
                status:'failed'
              }))
        }
      }

      const updateCoupon = async () => {
        try {
            await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${tempCoupon.id}`,{
                data:{
                    ...tempCoupon,
                    percent:Number(tempCoupon.percent),
                    due_date:new Date(tempCoupon.due_date).getTime() / 1000,
                    is_enabled:tempCoupon.is_enabled ? 1: 0
                }
            })
            dispatch(pushMessage({
              text:'編輯優惠卷成功',
              status:'success'
            }))
        } catch (error) {
            const {message} = error.response.data
            dispatch(pushMessage({
              text:message.join("、"),
              status:'failed'
            }))
        }
      }

      const deleteCoupon = async () => {
        try {
            await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${tempCoupon.id}`,{
                data:{
                    ...tempCoupon,
                    percent:Number(tempCoupon.percent),
                    due_date:new Date(tempCoupon.due_date).getTime() / 1000,
                    is_enabled:tempCoupon.is_enabled ? 1: 0
                }
            })

            handleCloseDelCouponModal();
            getCoupons();
            dispatch(pushMessage({
              text:'刪除優惠卷成功',
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

      const handleUpdateCoupon = async() => {
        const apiCall = modalMode === 'create' ? createCoupon : updateCoupon
        try {
            await apiCall();
            getCoupons();
            handleCloseCouponModal();
        } catch (error) {
          const {message} = error.response.data
          dispatch(pushMessage({
            text:message.join("、"),
            status:'failed'
          }))
        } 
      }

      const handlePageChange = (page) => {
        getCoupons(page)
      }

    return (
        <>
        <div className="container py-5">
            <div className="row mb-3">
            <div className="justify-content-end">
              {/* <button onClick={() => handleLogout() } type="button" className="btn btn-secondary">
                登出
              </button> */}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-between">
              <h2>優惠卷列表</h2>
              <button onClick={() => handleOpenCouponModal('create')} type="button" className="btn btn-primary">建立新的優惠卷</button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">名稱</th>
                    <th scope="col">折扣百分比</th>
                    <th scope="col">到期日</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col">編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.id}>
                      <th scope="row">{coupon.title}</th>
                      <td>{coupon.percent}</td>
                      <td>{new Date(coupon.due_date * 1000).toLocaleDateString()}</td>
                      <td>{coupon.is_enabled ? (<span className="text-success">啟用</span>):(<span>未啟用</span>)}</td>
                      <td>
                      <div className="btn-group">
                        <button onClick={() => handleOpenCouponModal('edit', coupon)} type="button" className="btn btn-outline-primary btn-sm">編輯</button>
                        <button onClick={() => handleOpenDelCouponModal(coupon)} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                      </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
        </div>
        
        <div ref={couponModalRef} className="modal fade" id="couponModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                        {modalMode === "create" ? `新增優惠券` : `編輯優惠券` }
                        </h5>
                        <button onClick={handleCloseCouponModal} type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                        <label htmlFor="title">標題</label>
                        <input
                            value = {tempCoupon.title}
                            onChange={handleModalInputChange}
                            name = "title"
                            type="text"
                            className="form-control"
                            id="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            placeholder="請輸入標題"
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="coupon_code">優惠碼</label>
                        <input
                            value = {tempCoupon.code}
                            onChange={handleModalInputChange}
                            name = "code"
                            type="text"
                            className="form-control"
                            id="code"
                            // value={formData.code}
                            // onChange={handleChange}
                            placeholder="請輸入優惠碼"
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="due_date">到期日</label>
                        <input
                            value = {tempCoupon.due_date}
                            onChange={handleModalInputChange}
                            name = "due_date"
                            type="date"
                            className="form-control"
                            id="due_date"
                            // value={formData.due_date}
                            // onChange={handleChange}
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="price">折扣百分比</label>
                        <input
                            value = {tempCoupon.percent}
                            onChange={handleModalInputChange}
                            name = "percent"
                            type="number"
                            className="form-control"
                            id="percent"
                            min="0"
                            // value={formData.percent}
                            // onChange={handleChange}
                            placeholder="請輸入折扣百分比"
                        />
                        </div>
                        <div className="mb-3">
                        <div className="form-check">
                            <input
                            checked = {tempCoupon.is_enabled}
                            onChange={handleModalInputChange}
                            name = "is_enabled"
                            className="form-check-input"
                            type="checkbox"
                            id="is_enabled"
                            // checked={formData.is_enabled}
                            // onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleCloseCouponModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                        </button>
                        <button onClick={handleUpdateCoupon} type="button" className="btn btn-primary">
                        {modalMode === "create" ? `新增優惠券` : `編輯優惠券` }
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div ref={delCouponModalRef} className="modal fade" id="delCouponModal" tabIndex="-1" style={{ backgroundColor:"rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5">刪除優惠卷</h1>
                <button
                    onClick={handleCloseDelCouponModal}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
                </div>
                <div className="modal-body">
                你是否要刪除 
                <span className="text-danger fw-bold">{tempCoupon.title}</span>
                </div>
                <div className="modal-footer">
                <button
                    onClick={handleCloseDelCouponModal}
                    type="button"
                    className="btn btn-secondary"
                >
                    取消
                </button>
                <button onClick={deleteCoupon}  type="button" className="btn btn-danger">
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