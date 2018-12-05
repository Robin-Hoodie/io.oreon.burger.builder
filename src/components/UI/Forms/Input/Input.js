import React from 'react';
import classes from './Input.css';

const Input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')}
                                  onChange={props.onChange}
                                  {...props.elementConfig}
                                  value={props.value}/>;
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')}
                                     onChange={props.onChange}
                                     {...props.elementConfig}
                                     value={props.value}/>;
            break;
        case 'select':
            inputElement = (
                <select className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.onChange}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}/>;
    }
    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default Input;