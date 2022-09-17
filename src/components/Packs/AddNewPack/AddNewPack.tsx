import React from 'react';
import classes from "../Packs.module.scss";
import {Button} from "@material-ui/core";
import {useAppDispatch} from "../../../app/hooks/hooks";
import {addNewPack} from "../packs-reducer";

const AddNewPack = () => {
    const dispatch = useAppDispatch()
    const onClickHandler = () => {
        dispatch(addNewPack({name: 'new pack'}))
    }

    return (
        <div>
            <Button
                variant="contained"
                className={classes.headerBtn}
                onClick={onClickHandler}
            >
                Add new pack</Button>
        </div>
    );
};

export default AddNewPack;