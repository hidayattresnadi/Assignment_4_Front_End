import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';

const SelectField = ({ label, options, id, value, onChange, className }) => (
    <div className="mb-4">
        <Label htmlFor={id} className="form-label">{label}</Label>
        <select id={id} className={className} value={value} onChange={onChange}>
            <SelectOption value="" disabled={true}>Choose Book Category</SelectOption>
            {options.map((option, index) => (
                <SelectOption key={index} value={option.categoryId}>{option.categoryName}</SelectOption>
            ))}
        </select>
    </div>
);

export default SelectField;
