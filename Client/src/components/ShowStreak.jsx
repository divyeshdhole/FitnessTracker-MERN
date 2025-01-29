import { BsFire } from "react-icons/bs";
import { motion } from "framer-motion";

const ShowStreak = ({ showStreak, setShowStreak, streak }) => {
    // Automatically hide the modal after 2 seconds
    setTimeout(() => {
        setShowStreak(false); // Ensure it hides instead of toggling repeatedly
    }, 5000);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
            {/* Fire Icon with Circular Animation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ opacity: 1, scale: 1.2, rotate: 360 }}
                transition={{ duration: 1, type: "spring" }}
                className="flex justify-center items-center"
            >
                <BsFire className="text-[200px] text-orange-500" />
            </motion.div>

            {/* Message Below */}
            <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-white text-2xl font-bold mt-5"
            >
                🔥 Your streak increased to {streak} days! Keep going!
            </motion.p>
        </div>
    );
};

export default ShowStreak;
