import React from 'react';
import Slider from '@material-ui/core/Slider';
import classes from "./RangeSlider.module.scss"

const RangeSlider = () => {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={classes.rangeSliderWrap}>
            <div className={classes.rangeValues}>{value[0]}</div>
            <Slider
                value={value}
                onChange={handleChange}
                className={classes.slider}
            />
            <div className={classes.rangeValues}>{value[1]}</div>
        </div>
    );
}

export default RangeSlider;
