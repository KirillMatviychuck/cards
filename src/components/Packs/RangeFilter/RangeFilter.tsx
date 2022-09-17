import React from 'react';
import Slider from '@material-ui/core/Slider';
import classes from "./RangeSlider.module.scss"
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {getPacks} from "../packs-reducer";

const RangeSlider = () => {
    const dispatch = useAppDispatch()
    const {onlyMyPacks, searchField, pageCount} = useAppSelector(state => state.packs)
    const {_id} = useAppSelector(state => state.profile)
    const [value, setValue] = React.useState<number[]>([1, 20]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
        console.log(newValue)
        console.log(value)
    };
    const getPacksWithValue = () => {
        if (onlyMyPacks) {
            dispatch(getPacks({user_id: _id, packName: searchField, pageCount, min: value[0], max: value[1]}))

        } else {
            dispatch(getPacks({packName: searchField, pageCount, min: value[0], max: value[1]}))
        }
    }

    return (
        <div className={classes.rangeSliderWrap}>
            <div className={classes.rangeValues}>{value[0]}</div>
            <Slider
                value={value}
                onChange={handleChange}
                className={classes.slider}
                onChangeCommitted={getPacksWithValue}
            />
            <div className={classes.rangeValues}>{value[1]}</div>
        </div>
    );
}

export default RangeSlider;
