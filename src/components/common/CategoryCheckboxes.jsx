import { CATEGORIES } from "../../constants/categories";

export default function CategoryCheckboxes({ selectedCategories, onChange }) {
    return (
        <div>
            <p>Category:</p>
            <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.filter(c => c !== "All").map(category => (
                    <label key={category} className="ctm-genre-label">
                        <input
                            className="ctm-genre-input"
                            type="checkbox"
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                                const newCategories = e.target.checked
                                    ? [...selectedCategories, category]
                                    : selectedCategories.filter(c => c !== category)
                                onChange(newCategories);
                            }}
                        />
                        {category}
                    </label>
                ))}
            </div>
        </div>
    );
}