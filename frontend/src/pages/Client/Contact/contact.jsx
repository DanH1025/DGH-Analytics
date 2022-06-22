import React from 'react'
import './contact.css'
import Topbar from '../../../components/Client/topbar/topbar'
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';


export default function Contact() {
  return (
    <>
    <Topbar />
    
    <div className="aboutPage">
        <div className="aboutTitle">
            <p>Contact Us</p>
        </div>

       <div className="contactUsBody">
          <div className="contactInformation">
             <div className="contactInfoHolder">
                    <p>
                        +251-935962707
                        
                    </p>
                    <p>
                        +251-975717479
                    </p>
             </div>
          </div>

         <div className="contactUsPhoneIconHolder">
              <div className="contactUsPhoneIconContainer">
                 <PhoneEnabledIcon/>
              </div>
         </div>
       </div>


        <div className="devTeamHolder">
            <div className="devTeamContainer">
                <div className="devTeam">
                    <div className="devTeamTitle">
                       <h3>Development Team</h3>                    

                    </div>

                      <div className="DevTeamBody">
                            <div className="devTeamMembers">                  
                                
                               
                                    
                                        <div className='devTeamCard'>
                                            <div className='devTeamCardContainer'>
                                                <div className="devTeamImgHolder">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQOzFDVeZlCm9yaHzWhZmX815no10_sh3N6g&usqp=CAU" alt="" />
                                                </div>
                                                <div className='devTeamCardBody'>
                                                    <h4 class="card-title">Dano Hailu</h4>
                                                    <p class="card-text">+251-975717479 </p>
                                                    <span>System Developer , Front-End Expert</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='devTeamCard'>
                                            <div  className='devTeamCardContainer'>
                                                <div className="devTeamImgHolder">
                                                    <img src="data:image/jpeg;base64,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" alt="" />
                                                </div>
                                                <div className='devTeamCardBody'>
                                                    <h4 class="card-title">Girum Tilahun</h4>
                                                    <p class="card-text">+251-923123123 </p>
                                                    <span>System Analyst</span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className='devTeamCard'>
                                            <div  className='devTeamCardContainer'>
                                                <div className="devTeamImgHolder">
                                                    <img src="data:image/jpeg;base64,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" alt="" />
                                                </div>
                                                <div className='devTeamCardBody'>
                                                    <h4 class="card-title">Hundaol Niguse</h4>
                                                    <p class="card-text">+251-921231221</p>
                                                    <span>System Developer , Back-End Expert</span>
                                                </div>
                                            </div>
                                            
                                        </div>

                             

                               



                            </div>
                      </div>


                </div>
            </div>

          
        </div>


    </div>


  
  
  </>
  )
}
