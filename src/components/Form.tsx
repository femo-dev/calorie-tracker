import { categories } from "../data/categories";

export default function Form() {
  return (
    <form>
        <p className="space-y-5 bg-white p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Category:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
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
                <label htmlFor="activity" className="font-bold">Activity:</label>
                <input
                    id="activity"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="e.g. Food, Orange Juice, Salad, Weights, Bike"
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
                >
                </input>
            </div>

            <input 
                type="submit"            
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                value='Save Food or Exercise'
            />
        </p>
    </form>
  )
}
