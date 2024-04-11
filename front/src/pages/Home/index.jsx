import React from 'react'
import { IMG_CANADA } from "../../components/Images"

const Home = () => {
    return (
        <>
            <section className="banner">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-8">
                            <div className="banner-content center-heading">
                                <h1 className='mb-0'>Find your dream study</h1>
                                <span className="subheading mb-5">Discover thousands of Master's degrees worldwide!</span>
                                {/* <a href="#" className="btn btn-main"><i className="fa fa-list-ul mr-2"></i>our Courses </a>
                                <a href="#" className="btn btn-tp ">get Started <i className="fa fa-angle-right ml-2"></i></a> */}
                                <div className="form-banner">
                                    <form action="#" className="form-search-banner">
                                        <input type="text" className="form-control" placeholder="What do study?" />
                                        <a href="#" className="btn btn-main">Search<i className="fa fa-search ml-2"></i> </a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="feature">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-lg-4 col-md-6">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="bi bi-badge2"></i>
                                </div>
                                <div className="feature-text">
                                    <h4>Learn from Industry Experts</h4>
                                    <p>Behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="bi bi-article"></i>
                                </div>
                                <div className="feature-text">
                                    <h4>Learn the Latest Top Skills</h4>
                                    <p>Behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="bi bi-headset"></i>
                                </div>
                                <div className="feature-text">
                                    <h4>Lifetime Access & Support</h4>
                                    <p>Behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding category-section">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                {/* <span className="subheading">Top Categories</span> */}
                                <h3>Browse by Discipline</h3>
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicin gelit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters">
                        <div className="course-categories">
                            <div className="category-item">
                                <a href="#">
                                    <div className="category-icon">
                                        <i className="bi bi-laptop"></i>
                                    </div>
                                    <h4>Web Development</h4>
                                    <p>(4 Courses)</p>
                                </a>
                            </div>
                            <div className="category-item">
                                <a href="#">
                                    <div className="category-icon">
                                        <i className="bi bi-layer"></i>
                                    </div>
                                    <h4>Design</h4>
                                    <p>(12 Courses)</p>
                                </a>
                            </div>
                            <div className="category-item">
                                <a href="#">
                                    <div className="category-icon">
                                        <i className="bi bi-target-arrow"></i>
                                    </div>
                                    <h4>Marketing</h4>
                                    <p>(6 Courses)</p>
                                </a>
                            </div>

                            <div className="category-item">
                                <a href="#">
                                    <div className="category-icon">
                                        <i className="bi bi-rocket2"></i>
                                    </div>
                                    <h4>Art & Design</h4>
                                    <p>(6 Courses)</p>
                                </a>
                            </div>
                            <div className="category-item">
                                <a href="#">
                                    <div className="category-icon">
                                        <i className="bi bi-shield"></i>
                                    </div>
                                    <h4>Design</h4>
                                    <p>(12 Courses)</p>
                                </a>
                            </div>
                            <div className="category-item">
                                <a href="#">
                                    <div className="category-icon">
                                        <i className="bi bi-shield"></i>
                                    </div>
                                    <h4>Design</h4>
                                    <p>(12 Courses)</p>
                                </a>
                            </div>
                            <div className="category-item">
                                <a href="#">
                                    <div className="category-icon">
                                        <i className="bi bi-shield"></i>
                                    </div>
                                    <h4>Design</h4>
                                    <p>(12 Courses)</p>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="text-center mt-5">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                <div className="course-btn mt-4"><a href="#" className="btn btn-main"><i className="fa fa-grip-horizontal mr-2"></i>All Categories</a></div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>

            <section className="section-padding category-section">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                {/* <span className="subheading">Top Categories</span> */}
                                <h3>Our Top Categories</h3>
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicin gelit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters">
                        {["","","","","","","","","","","",].map(() => <div className="col-lg-3 col-md-6">
                            <div className="course-category" style={{ background: `url(${IMG_CANADA})`, backgroundSize: "cover" }}>
                                {/* <div className="category-icon">
                                    <i className="bi bi-laptop"></i>
                                </div> */}
                                <h4><a href="#">Canada</a></h4>
                                {/* <p>4 Courses</p> */}
                            </div>
                        </div>)}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Home