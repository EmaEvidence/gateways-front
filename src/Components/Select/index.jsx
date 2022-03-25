import './select.css';

function Select(props) {
  return (
    <div className="input-wrapper">
      <div className='label-wrapper'>
        {props.label && <label htmlFor="">{props.label}</label>}
      </div>
        <select
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          required={props.required}
          onChange={({target}) => {
            props.onChange && props.onChange(props.name, target.value)
          }}
          onBlur={() => {
            props.onBlur && props.onBlur()
          }}
        >
          {
            props.options && props.options.map((option) => (
              <option key={option}>{option}</option>
            ))
          }
        </select>
      {props.hasError && <p>{props.errorText}</p>}
    </div>
  );
}

export default Select;