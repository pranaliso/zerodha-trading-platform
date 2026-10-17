// ================================
// Imports
// ================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


// ================================
// Routes
// ================================

const holdingRoutes = require("./routes/holdingRoute");
const positionRoutes = require("./routes/positionRoutes");
const orderRoutes = require("./routes/orderRoute");

const userRoutes = require("./routes/userRoute");
const watchlistRoutes = require("./routes/watchlistRoute");
const fundsRoutes = require("./routes/FundsRoute");
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoute");


// ================================
// Error Middleware
// ================================

const errorMiddleware = require("./middleware/errorMiddleware");


// ================================
// App Initialization
// ================================

const app = express();



// ================================
// Middleware
// ================================


app.use(
    cors({

        origin: [
            "http://localhost:3000",
            "http://localhost:3001"
        ],

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE"
        ],

        credentials: true

    })
);



app.use(express.json());





// ================================
// Database Connection
// ================================

connectDB();





// ================================
// Test Route
// ================================

app.get("/", (req,res)=>{

    res.status(200).json({

        success:true,

        message:"Zerodha Backend Running"

    });

});






// ================================
// API Routes
// ================================


// Holdings

app.use(
    "/api/holdings",
    holdingRoutes
);




// Positions

app.use(
    "/api/positions",
    positionRoutes
);




// Orders

app.use(
    "/api/orders",
    orderRoutes
);

// Authentication

app.use(
    "/api/auth",
    authRoutes
);



// Users

app.use(
    "/api/users",
    userRoutes
);




// Watchlist

app.use(
    "/api/watchlist",
    watchlistRoutes
);




// Funds ✅ NEW

app.use(
    "/api/funds",
    fundsRoutes
);

app.use(
    "/api/stocks",
    stockRoutes
);







// ================================
// 404 Handler
// ================================

app.use((req,res)=>{


    res.status(404).json({

        success:false,

        message:"API route not found"

    });


});







// ================================
// Error Handler
// ================================

app.use(errorMiddleware);







// ================================
// Server Start
// ================================


const PORT = process.env.PORT || 3002;



app.listen(PORT,()=>{


    console.log(
        `Server running on port ${PORT}`
    );


});