import React, {Dispatch, SetStateAction} from 'react';
import {DeleteOutline, EditOutlined, SchoolOutlined} from "@material-ui/icons";
import classes from './EditButtons.module.scss'
import {deletePack} from "../packs-reducer";
import {useAppDispatch} from "../../../app/hooks/hooks";

const EditButtons: React.FC<PropsType> = ({packId, packName, setPackName, setEditMode, setSavedId, editModeValue}) => {
    const dispatch = useAppDispatch()
    const onDeleteClickHandler = (id: string) => dispatch(deletePack(id))
    const onEditButtonClickHandler = () => {
        setSavedId(packId)
        setEditMode(!editModeValue)
        setPackName(packName)
    }

    return (
        <div className={classes.editButtonsWrapper}>
            <div className={classes.editButtons}>
                <SchoolOutlined className={classes.btn}/>
                <EditOutlined onClick={onEditButtonClickHandler} className={classes.btn}/>
                <DeleteOutline onClick={() => onDeleteClickHandler(packId)} className={classes.btn}/>
            </div>
        </div>
    );
};

type PropsType = {
    packId: string
    packName: string
    setEditMode: Dispatch<SetStateAction<boolean>>
    setSavedId: Dispatch<SetStateAction<string>>
    setPackName: Dispatch<SetStateAction<string>>
    editModeValue: boolean
}

export default EditButtons;