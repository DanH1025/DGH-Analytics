import React from 'react'
import './about.css'
import Topbar from '../../../components/Client/topbar/topbar'

export default function About() {
  return (
    <>
      <Topbar />
      
      <div className="aboutPage">
          <div className="aboutTitle">
              <p>About Us</p>
          </div>

         <div className="aboutBody">
            <p>
                 We design and develop modern web solutions <br />
                with a professional design using latest <br />
                technologies and trends
            </p>

           <div className="aboutImgPrev">
                <div className="about_imageHolder">
                   <img src="https://the7.io/elementor-minimal-creative-light/wp-content/uploads/sites/69/2021/09/t001.jpeg" alt="Loading..." />
                </div>
           </div>
         </div>


          <div className="whoWeAreHolder">
              <div className="whoWeAreContainer">
                  <div className="whoWeAre">
                      <div className="whoWeAreTitle">
                         <h3>Who We Are & What We do</h3>                    

                      </div>

                        <div className="whoWeAreBody">
                          <p>We are a  quam, nec laoreet enim laoreet sed lorem ipsum placerat metus erat, nec vulputate nulla iaculis eu.</p>
                          <p>We offer complete donec placerat metus erat, conubia nostra, per inceptos  vulputate nulla iaculis eu creative volutpat donec placerat metus erat, conubia nostra, per inceptos vulputate nulla iaculis eu. Class litora torquent per conubia nostra, per inceptos himenaeos. In vel varius esteu!</p>
                          <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In creative volutpat donec vel varius esteu!</p>

                        </div>


                  </div>
              </div>

            
          </div>


      </div>


    
    
    </>

  )
}
 