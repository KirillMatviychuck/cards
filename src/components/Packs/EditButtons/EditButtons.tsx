import React from 'react';
import {DeleteOutline, EditOutlined, SchoolOutlined} from "@material-ui/icons";
import classes from './EditButtons.module.scss'
import {deletePack} from "../packs-reducer";
import {useAppDispatch} from "../../../app/hooks/hooks";

const EditButtons: React.FC<PropsType> = ({packId}) => {
    const dispatch = useAppDispatch()
    const onDeleteClickHandler = (id: string) => dispatch(deletePack(id))

    return (
        <div className={classes.editButtonsWrapper}>
            <div className={classes.editButtons}>
                <SchoolOutlined className={classes.btn}/>
                <EditOutlined className={classes.btn}/>
                <DeleteOutline onClick={() => onDeleteClickHandler(packId)} className={classes.btn}/>
            </div>
        </div>
    );
};

type PropsType = {
    packId: string
}

export default EditButtons;