//This is the server of the FitMentor React app
//Using the passport passport local passport local mongoose


const express = require('express');
const app = express();
const mongoose = require('mongoose');

const passport = require('passport');

//passport local mongoose plugin
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAjdJL8z8VhFEwsCrLxxC__kLKgFtJZAvA");
const Fuse = require('fuse.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure the 'uploads' folder exists in your project
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize multer with storage settings and file size/type validation (optional)
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpg|jpeg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only JPG, JPEG, and PNG files are allowed'));
        }
    }
});
app.use('/uploads', express.static('uploads'));
const secretKey = "your_secret_key";  // Use environment variable in production
//Middleware
app.use(cookieParser()); // Use cookie-parser to parse cookies

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(cors());

// Handle preflight requests explicitly
// app.options('*', cors(corsOptions));
//connect to MongoDB 


mongoose.connect("mongodb+srv://fitmentor:div2123@cluster0.gzf9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});;
//session use

const FileStore = require('session-file-store')(session);

app.use(session({
    store: new FileStore({ path: './sessions' }),
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

//use passport local mongoose plugin

app.use(passport.initialize());
app.use(passport.session());



//User Schema


const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    image: {
        type: String,
        default: null
    },
    age: Number,
    workouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workout'
        }], // Use an array of ObjectIds for referencing workouts
    profilePhoto: {
        type: String

    },
    credit: {
        type: Number,
        default: 3
    }


}, { timeseries: true });


const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,

    },
    workoutName: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number,
    caloriesBurned: Number,
    date: {
        type: Date,
        default: Date.now,
    }
});


const Workout = mongoose.model('Workout', workoutSchema);
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'username',
});

const User = mongoose.model('User', userSchema);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(User.createStrategy());


//simple check / route for check

app.get('/', async (req, res) => {
    return res.send("hello world");
});

//Login Route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Authenticate the user (this automatically compares the password)
        user.authenticate(password, (err, user, passwordError) => {
            if (err || passwordError || !user) {
                return res.status(401).send({ message: "Invalid credentials" });
            }

            // Generate JWT token after successful login
            const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1d" });

            // Send token to the frontend
            res.status(200).send({ message: "Logged in", token, user: { name: user.name, profilePhoto: user.profilePhoto, credit: user.credit } });
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ message: "Server error" });
    }
});



//Register Route

// app.post("/register", async (req, res) => {
//     //check data type of req.body like int strig
//     console.log(typeof req.body.password);

//     await User.register({ username: req.body.username }, req.body.password, function (err, user) {
//         if (err) {
//             console.log(err);
//             return res.send(err)
//         }
//         const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1d" });
//         //saved the name of the user in database to
//         console.log(req.body.name);
//         user.name = req.body.name;
//         user.save();

//         // Send token in HTTP-only cookie
//         console.log(req.body.password)
//         res.status(201).send({ message: "User registered", token });
//     });
// });

app.post("/register", async (req, res) => {
    try {
        // Check if required fields are present
        if (!req.body.username || !req.body.password || !req.body.name) {
            return res.status(400).json({ message: "Username, password, and name are required" });
        }

        console.log(typeof req.body.password); // Log the type of the password

        // Register the user using Passport's register method
        const user = new User({ username: req.body.username });
        await User.register(user, req.body.password);

        // Assign additional properties and save
        user.name = req.body.name;
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1d" });

        console.log(req.body.password); // Debugging logs

        // Send a success response with the token
        res.status(201).send({ message: "User registered", token, user: { name: user.name, profilePhoto: user.profilePhoto, credit: user.credit } });
    } catch (error) {
        console.error("Error in /register:", error);

        // Send a proper error response based on the type of error
        if (error.name === 'UserExistsError') {
            return res.status(409).json({ message: "User already exists" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

const getDashBoard = async (req, res) => {
    try {
        // Ensure req.user is available (make sure you have middleware that sets this)
        if (!req.user || !req.user.id) {
            console.log("unotherzied")
            return res.status(401).json({ message: "Unauthorized access" });
        }

        //Calculate the total number of workouts done by user for date today
        const currentDateFormatted = new Date();
        const todayStart = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate(),
            0,
            0,
            0,
            0
        );
        const todayEnd = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate(),
            23,
            59,
            59,
            999
        );
        const user = await User.findById(req.user.id)
            .populate('workouts');



        const totalWorkoutsToday = user.workouts.filter(
            (workout) => workout.date >= todayStart && workout.date <= todayEnd
        ).length;
        // console.log("total workouts today:", totalWorkoutsToday);

        //calculate total calories burnt by today by today date
        // { console.log(req.user.id) }
        // { console.log(todayStart, todayEnd) }
        const todaysWorkouts = user.workouts.filter(
            (workout) => workout.date >= todayStart && workout.date <= todayEnd
        )
        // console.log("todays workouts:", todaysWorkouts);
        const totalCaloriesBurnedToday = todaysWorkouts.reduce(
            (total, workout) => total + workout.caloriesBurned,
            0
        );
        // console.log("total calories burned today:", totalCaloriesBurnedToday);

        //Calculate average calories burnt per workout for today
        const avgCaloriesBurnedPerWorkout =
            totalCaloriesBurnedToday / todaysWorkouts.length;



        const categoryCalories = await Workout.aggregate([
            { $match: { user: user._id, date: { $gte: todayStart, $lt: todayEnd } } },
            {
                $group: {
                    _id: "$category",
                    totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                },
            },
        ]);
        const pieChartData = categoryCalories.map((category, index) => ({
            id: index,
            value: category.totalCaloriesBurnt,
            label: category._id,
        }));
        const weeks = [];
        const caloriesBurned = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(
                currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
            );
            weeks.push(`${date.getDate()}th`);

            const startOfDay = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            );
            const endOfDay = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 1
            );

            const weekData = await Workout.aggregate([
                {
                    $match: {
                        user: user._id,
                        date: { $gte: startOfDay, $lt: endOfDay },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                    },
                },
                {
                    $sort: { _id: 1 }, // Sort by date in ascending order
                },
            ]);

            caloriesBurned.push(
                weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
            );
        }
        res.json({
            totalWorkoutsToday,
            totalCaloriesBurnedToday,
            avgCaloriesBurnedPerWorkout,
            pieChartData,
            weeks,
            todaysWorkouts,
            caloriesBurned,
        })





    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).send({ message: "Server error" });
    }
};

const addWorkout = async (req, res) => {
    try {
        const { name, duration, sets, reps, weight, category } = req.body; // Destructure individual workout details from request body
        // Create a new workout instance
        const newWorkout = new Workout({
            user: req.user.id, // Associate with the user
            category: category, // Map the name to workoutName field
            workoutName: name,
            duration: duration, // Map duration
            sets: sets, // Map sets
            reps: reps, // Map reps
            weight: weight, // Map weight
            date: new Date() // Set the current date
        })
        const user = await User.findById(req.user.id)
            .populate('workouts');
        user.workouts.push(newWorkout);
        user.credit = user.credit + 1;

        user.save();
        // Calculate total calories burned for the new workout
        const durationInMinutes = duration;
        const weightInKg = weight;
        const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
        const caloriesBurned = durationInMinutes * caloriesBurntPerMinute * weightInKg;
        newWorkout.caloriesBurned = caloriesBurned;
        newWorkout.save();
        // console.log("Calories burned:", caloriesBurned);
        // console.log("saved");

        res.status(201).json({ message: "Workout added successfully!", workout: newWorkout, credit: user.credit });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};






const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            console.log("Failed to verify token")
            return res.status(403).json({ message: 'Failed to authenticate token', success: false });
        }

        console.log(decoded);  // Log decoded token to see its contents
        req.user = decoded;  // Assuming the token contains user info like id
        next();
    });
};

const verifyToken = (req, res) => {
    res.json({ message: 'Token verified!', success: true });
};
const getWorkouts = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have `req.user` from auth middleware

        // Get the date parameter from the request
        const dateParam = req.params.date; // e.g., "2024-10-10"

        // Create a start and end date for the given date
        const startOfDay = new Date(dateParam);
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1); // Move to the next day

        // Fetch workouts for the specified date
        const workouts = await Workout.find({
            user: userId,
            date: { $gte: startOfDay, $lt: endOfDay }, // Filter for workouts within the same day
        });


        // console.log(workouts);
        res.status(200).json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const uploadProfile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Find user by ID (assuming `req.user` contains user ID)
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Save the file path to the user's profile photo field
        user.profilePhoto = `/uploads/${req.file.filename}`;

        // Save the user object with the new profile photo path
        await user.save();

        res.json({
            message: 'File uploaded and profile updated successfully',
            filePath: `/uploads/${req.file.filename}`,

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload profile photo' });
    }
};


// Function to extract data from user prompt using gemini



const sessions = {}; // Store session data in memory (for testing only, use a DB for production)

const generateResponse = async (req, res) => {
    const { prompt } = req.body;

    // Generate a session ID using cookies (or any unique user identifier)

    const user = await User.findOne({ _id: req.user.id });
    const sessionId = user.name;
    // console.log("user: ", user);

    // Initialize conversation history if not present
    if (!sessions[sessionId]) {
        sessions[sessionId] = [
            {
                role: "system", content: "You are FitMentor, a fitness assistant bot. Collect weight, height, goal, and diet from users for personalized workout and meal plans. the user name is"
                    + user.name + "! and credits are" + (user.credit - 1)
            }
        ];
    }


    // Add user input to the conversation history
    sessions[sessionId].push({ role: "user", content: prompt });
    console.log("sessions[sessionId]: ", sessions[sessionId]);
    // Prepare the complete prompt for the AI model
    const completePrompt = `
    Conversation History: ${JSON.stringify(sessions[sessionId])}
    current Prompt : ${prompt}
   -the natural conversation consider previous history provide plain text as response if user unrelated topic then politly say them to fitness topic use greetings also have credits to chat if exeeds no chat ${user.credit - 1} dont remind them repeatedly 
   the conversation is like he chatting with real person and behave like real! 
   -reply to greetings hi hello and all and how are u like fitness couch

    -one chat one credit one add workout one credit

    `;

    try {
        sessions[sessionId].push({ role: "user", content: prompt });
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(completePrompt);
        const responseText = await result.response.text();

        // Add the AI's response to the conversation history
        sessions[sessionId].push({ role: "assistant", content: responseText });
        const user = await User.findById(req.user.id);
        if (user.credit !== 0)
            user.credit = user.credit - 1;
        user.save();
        res.json({
            message: "✅ Response generated successfully!",
            response: responseText,
            sessionId: sessionId, // Include the session ID for future reference
            credit: user.credit
        });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate the fitness plan." });
    }
};

//Function to get dates for particular user and return in json formate
const getDates = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have `req.user` from auth middleware
        const user = await User.findOne({ _id: userId }).populate('workouts');
        // console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        //populate with workouts

        const dates = user.workouts.map(workout => workout.date);

        console.log(dates);
        res.status(200).json(dates);
    }
    catch (error) {
        console.error('Error fetching dates:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
// Function to generate personalized fitness plan


// Function to store user data (this should ideally be done through a session or a database)


app.post("/generate", authMiddleware, generateResponse);

// Middleware to handle auth (Dummy Example)
app.get('/workouts/:date', authMiddleware, getWorkouts);


app.get("/dashboard", authMiddleware, getDashBoard);

app.post('/addWorkout', authMiddleware, addWorkout);

app.get('/verifyToken', authMiddleware, verifyToken);

app.post('/upload-profile', authMiddleware, upload.single('profilePhoto'), uploadProfile);

app.get('/getDates', authMiddleware, getDates);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})