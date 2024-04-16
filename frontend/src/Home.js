import React from 'react'
import Title from './Title'
import HomeModuleCss from './css/Home.module.css'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className={HomeModuleCss.homeSection}>
            <Title mainTitle={'Home'}/>
            <div className={HomeModuleCss.homeContainer}>
                <div id="carouselExampleAutoplaying" style={{margin: "0 auto", width: "50%", height: "10%", display: "flex", justifyContent: "center", alignItems: "center"}} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <Link to={'/productDetail/' + 1}>
                                <img src={process.env.PUBLIC_URL + '/image/' + 'lingonberry_jam.jpg'} className="d-block w-100" alt={"Lingonberry jam image"} />
                            </Link>
                        </div>
                        <div className="carousel-item">
                            <Link to={'/productDetail/' + 2}>
                                <img src={process.env.PUBLIC_URL + '/image/' + 'rasp_and_blueberry_jam.jpg'} className="d-block w-100" alt={"Rasp and blueberry jam image"} />
                            </Link>
                        </div>
                        <div className="carousel-item">
                            <Link to={'/productDetail/' + 3}>
                                <img src={process.env.PUBLIC_URL + '/image/' + 'orange_and_elderflower_marmalade.jpg'} className="d-block w-100" alt={"Orange and elderflower marmalade image"} />
                            </Link>
                        </div>
                        <div className="carousel-item">
                            <Link to={'/productDetail/' + 4}>
                                <img src={process.env.PUBLIC_URL + '/image/' + 'strawberry_jam.jpg'} className="d-block w-100" alt={"Strawberry jam image"} />
                            </Link>
                        </div>
                        <div className="carousel-item">
                            <Link to={'/productDetail/' + 5}>
                                <img src={process.env.PUBLIC_URL + '/image/' + 'blueberry_jam.jpg'} className="d-block w-100" alt={"Blueberry jam image"} />
                            </Link>
                        </div>
                        <div className="carousel-item">
                            <Link to={'/productDetail/' + 6}>
                                <img src={process.env.PUBLIC_URL + '/image/' + 'cloudberry_jam.jpg'} className="d-block w-100" alt={"Cloudberry jam image"} />
                            </Link>
                        </div>
                    </div>
                    <button className={"carousel-control-prev"}  type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className={"carousel-control-prev-icon"} style={{backgroundColor:"black"}} aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className={"carousel-control-next"} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className={"carousel-control-next-icon"} style={{backgroundColor:"black"}} aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
