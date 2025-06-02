import { useState } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";

export default function Form() {
    const [activity, setActivity] = useState({
        name: '',
        category: 1,
        calories: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        console.log(isNumberField);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        });
    };

    const isValidActivity = () => {
        const { name, calories } = activity
        console.log(name.trim() !== '');
        return name.trim() !== '' && calories > 0;
    }

    return (
        <form>
            <p className="space-y-5 bg-white p-10 rounded-lg">
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
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                    value='Save Food or Exercise'
                    disabled={isValidActivity()}
                />
            </p>
        </form>
    )
}