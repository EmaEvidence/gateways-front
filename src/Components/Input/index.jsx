import './input.css';

function Input(props) {
  return (
    <div className="input-wrapper">
      <div className='label-wrapper'>
        {props.label && <label htmlFor="">{props.label}</label>}
      </div>
        <input
          type={props.type || 'text'}
          readOnly={props.readonly}
          defaultValue={props.defaultValue}
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
        />
      {props.hasError && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;