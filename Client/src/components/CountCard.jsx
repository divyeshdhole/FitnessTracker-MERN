import { FaFire } from "react-icons/fa";
import { BiTransfer } from 'react-icons/bi';
import { IoIosTrendingUp } from "react-icons/io";

const Card = ({ item, dashboardData }) => {
    const iconMap = {
        FaFire: FaFire,
        BiTransfer: BiTransfer,
        IoIosTrendingUp: IoIosTrendingUp
    };
    const Icon = iconMap[item.icon];
    return <div className="p-2 min-w-[300px]  lg:w-[430px] border border-gray-300 rounded-lg shadow-lg h-[100px]">
        <div className="flex justify-between items-center">
            <h4 className="text-blue-500 ">{item.title}</h4>
            <div className={`${item.bg} bg-opacity-20 rounded-lg p-2`}>
                <Icon className={`text-lg ${item.color}`} />
            </div>
        </div>
        <div className="flex gap-2 items-baseline">
            <p className="text-[20px] font-semibold lg:text-[25px]">{Icon == FaFire ? dashboardData.totalCaloriesBurnedToday
                : Icon == BiTransfer ? dashboardData.totalWorkoutsToday : dashboardData.avgCaloriesBurnedPerWorkout}</p>
            <p className="text-md">{item.unit}</p>
            <p className={`text-xs font-semibold ${item.percent > 0 ? 'text-green-500' : 'text-red-400'}`}>({item.percent}%)</p>
        </div>
        <p className="text-xs text-gray-400">{item.description}</p>


    </div >
}
export default Card;