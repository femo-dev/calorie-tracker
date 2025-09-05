import { useMemo } from "react";
import type { Activity } from "../types";

type CalorieTrackerProps = {
    activities: Activity[]
};

export default function CalorieTracker({activities} : CalorieTrackerProps){

    // Counters.
    const calorieConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities]);
    const calorieBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities]);

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">
                Calorie Summary
            </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className="font-black text-6xl text-orange">{ calorieConsumed }</span>
                    Consumed
                </p>
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className="font-black text-6xl text-orange">{ calorieBurned }</span>
                    Burned
                </p>                
            </div>
        </>
    )
}
