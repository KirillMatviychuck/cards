import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import classes from './ButtonFilter.module.scss'
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {getPacks, setButtonFilter} from "../packs-reducer";
import {useEffect} from "react";

export default function ColorToggleButton() {
    const {onlyMyPacks, searchField, pageCount} = useAppSelector(state => state.packs)
    const {_id} = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (onlyMyPacks) {
            dispatch(getPacks({user_id: _id,packName: searchField, pageCount}))
        }
        if (!onlyMyPacks) {
            dispatch(getPacks({packName: searchField, pageCount}))
        }
    }, [onlyMyPacks])
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: boolean,
    ) => {
        dispatch(setButtonFilter({value: newAlignment}))
    };

    return (
        <ToggleButtonGroup
            value={onlyMyPacks}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton className={classes.button} value={true}>My</ToggleButton>
            <ToggleButton className={classes.button} value={false}>All</ToggleButton>
        </ToggleButtonGroup>
    );
}