import { useState, useEffect } from "react";
import type { Dispatch, ChangeEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import type { Activity } from "../types";
import { categories } from "../data/categories";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState : Activity = {
    id: uuidv4(),
    name: '',
    category: 1,
    calories: 0
};

export default function Form({dispatch, state} : FormProps) {
    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
            setActivity(selectedActivity);
        }

    }, [state.activeId]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        });
    };

    const isValidActivity = () => {
        const { name, calories } = activity;

        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "save-activity", payload: { newActivity: activity } });
        setActivity({
            ...initialState,
            id: uuidv4()
        });        
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="space-y-5 bg-white p-10 rounded-lg">
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category" className="font-bold">Category:</label>
                    <select
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        id="category"
                        value={activity.category}
                        onChange={handleChange}
                    >
                        {
                            categories.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="name" className="font-bold">Activity:</label>
                    <input
                        id="name"
                        type="text"
                        className="border border-slate-300 p-2 rounded-lg"
                        placeholder="e.g. Food, Orange Juice, Salad, Weights, Bike"
                        value={activity.name}
                        onChange={handleChange}
                    >
                    </input>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories" className="font-bold">Calories:</label>
                    <input
                        id="calories"
                        type="number"
                        className="border border-slate-300 p-2 rounded-lg"
                        placeholder="Calories e.g. 300 or 500"
                        value={activity.calories}
                        onChange={handleChange}
                    >
                    </input>
                </div>

                <input 
                    type="submit"            
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                    value={activity.category === 1 ? 'Save Food' : 'Save Exercise'}
                    disabled={!isValidActivity()}
                />
            </div>
        </form>
    )
}