
import { Link } from 'react-router-dom';
import banner from '../assets/pic/banner.png'
export default function HomePage() {
    return (
      <div className="container-fluid">
        <div
          className="position-absolute"x
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage:
              `url(${banner})`,
            backgroundPosition: "center center",
            // opacity: 0.1,
            zIndex: -1,
          }}
        ></div>
        <div
          className="container d-flex flex-column"
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          <div className="row justify-content-center my-auto">
            <div className="col-md-4 text-center">
              <h2 style={{ fontFamily: "Righteous" }}>MOUNTAINERRING</h2>
              <p className="text-muted mb-0">
              和你一起翻山越嶺
              </p>
              <Link to='/products' className="btn btn-dark rounded-0 mt-6">
                查看行程
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-4 mt-md-4">
              <Link to='/products/-NKQiZLYMBOKErtRI24k' className="card border-0 mb-4">
                <img
                  src="https://greathunger.com.tw/images/activity_20220525164209.jpg"
                  className="card-img-top rounded-0"
                  alt="少女之湖｜松羅湖"
                />
                <div className="card-body text-center">
                  <h4>少女之湖｜松羅湖</h4>
                  {/* <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                      diam nonumy eirmod.
                    </p>
                  </div> */}
                </div>
              </Link>
            </div>
            <div className="col-md-4 mt-md-4">
              <Link to='/products/-NR2IkrzZx0QBHqSbOca' className="card border-0 mb-4">
                <img
                  src="https://greathunger.com.tw/images/images/activity0_20221115212626.jpg"
                  className="card-img-top rounded-0"
                  alt="散落的珍珠｜加羅湖"
                />
                <div className="card-body text-center">
                  <h4>散落的珍珠｜加羅湖</h4>
                  {/* <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                      diam nonumy eirmod.
                    </p>
                  </div> */}
                </div>
              </Link>
            </div>
            <div className="col-md-4 mt-md-4">
              <Link to='/products/-NN0TN0Oy7quf2LBeINs' className="card border-0 mb-4">
                <img
                  src="https://greathunger.com.tw/images/images/activity0_20230518150304.JPG"
                  className="card-img-top rounded-0"
                  alt="水鹿的故鄉｜能高安東軍縱走"
                />
                <div className="card-body text-center">
                  <h4>水鹿的故鄉｜能高安東軍縱走</h4>
                  {/* <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                      diam nonumy eirmod.
                    </p>
                  </div> */}
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-light mt-7">
          <div className="container">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row justify-content-center py-7">
                    <div className="col-md-6 text-center">
                      <h3>走入山林，踏上不同的旅程</h3>
                      {/* <p className="my-5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat.”
                      </p> */}
                      <p>
                        <small>—MOUNTAINERRING—</small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row justify-content-center py-7">
                    <div className="col-md-6 text-center">
                      <h3>Lorem ipsum.</h3>
                      <p className="my-5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat.”
                      </p>
                      <p>
                        <small>—Lorem ipsum dolor sit amet.—</small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row justify-content-center py-7">
                    <div className="col-md-6 text-center">
                      <h3>Lorem ipsum.</h3>
                      <p className="my-5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat.”
                      </p>
                      <p>
                        <small>—Lorem ipsum dolor sit amet.—</small>
                      </p>
                    </div>
                  </div>
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
        </div>
        <div className="container my-7">
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://greathunger.com.tw/images/images/activity0_20230518150304.JPG"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-4 m-auto text-center">
              <h4 className="mt-4">水鹿的故鄉：能高安東軍縱走</h4>
              <p className="text-muted">
              中央山脈主脊北三段，北自大禹嶺，一路向南經過奇萊北壁、奇萊連峰、能高安東軍，然後再往南穿越魔王草山摩即後，抵達七彩湖。知名的進階路線一奇萊東稜及千卓萬群峰，正是分屬此處東西支稜。
              </p>
            </div>
          </div>
          <div className="row flex-row-reverse justify-content-between mt-4">
            <div className="col-md-6">
              <img
                src="https://greathunger.com.tw/images/activity_20210627213755.jpg"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-4 m-auto text-center">
              <h4 className="mt-4">絕美入門縱走：南二段</h4>
              <p className="text-muted">
              行走高度多在海拔三千公尺上下，有時越過斷崖、有時下切谷地、有時奮力登頂，路線變化多端。不僅可見風情萬種的杜鵑林、白木林、針葉林，也將與遼闊的高山草原和湛藍天空下的高山湖泊相遇。
              壯闊的崇山峻嶺間還藏著頹圮的駐在所、破碎的酒瓶，向往來旅人訴說百年前先民的血淚史，精采絕倫。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  