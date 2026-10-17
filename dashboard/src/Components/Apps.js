import React from "react";
import "./Apps.css";


const apps = [

  {
    name: "Kite",
    icon: "📈",
    description: "Fast and modern trading platform.",
    link:"#"
  },

  {
    name: "Console",
    icon: "💼",
    description: "Portfolio analytics and reports.",
    link:"#"
  },

  {
    name: "Coin",
    icon: "🪙",
    description: "Invest in Direct Mutual Funds.",
    link:"#"
  },

  {
    name: "Varsity",
    icon: "📚",
    description: "Learn stock market for free.",
    link:"#"
  },

  {
    name: "Kite Connect",
    icon: "💻",
    description: "Trading APIs for developers.",
    link:"#"
  },

  {
    name: "Sentinel",
    icon: "🛡️",
    description: "Create price alerts and notifications.",
    link:"#"
  },

];



function Apps() {


  return (


    <div className="apps-page">


      <div className="apps-header">

        <h2>
          Apps
        </h2>

        <p>
          Explore trading, investing and learning tools.
        </p>

      </div>





      <div className="apps-grid">


        {
          apps.map((app,index)=>(


            <div 
            className="app-card"
            key={index}
            >


              <div className="app-icon">

                {app.icon}

              </div>




              <h3>

                {app.name}

              </h3>




              <p>

                {app.description}

              </p>





              <button
              onClick={()=>{
                alert(`${app.name} opened`);
              }}
              >

                Open

              </button>



            </div>


          ))
        }


      </div>



    </div>


  );

}


export default Apps;