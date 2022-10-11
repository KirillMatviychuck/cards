import React, {Dispatch, SetStateAction} from 'react';
import {DeleteOutline, EditOutlined, SchoolOutlined} from "@material-ui/icons";
import classes from './EditButtons.module.scss'
import {deletePack} from "../packs-reducer";
import {useAppDispatch} from "../../../app/hooks/hooks";

const EditButtons: React.FC<PropsType> = ({
                                              packId,
                                              userId,
                                              myId,
                                              packName,
                                              setPackName,
                                              setEditMode,
                                              setSavedId,
                                              editModeValue
                                          }) => {
    const dispatch = useAppDispatch()
    const onDeleteClickHandler = (id: string) => dispatch(deletePack(id))
    const onEditButtonClickHandler = () => {
        setSavedId(packId)
        setEditMode(!editModeValue)
        setPackName(packName)
    }
    const openPackCardsHandler = () => {

    }

    return (
        <div className={classes.editButtonsWrapper}>
            <div className={classes.editButtons}>
                <SchoolOutlined onClick={openPackCardsHandler} className={classes.btn}/>
                {userId === myId &&
                    <EditOutlined onClick={onEditButtonClickHandler} className={classes.btn}/>}
                {userId === myId &&
                    <DeleteOutline onClick={() => onDeleteClickHandler(packId)} className={classes.btn}/>}
            </div>
        </div>
    );
};

type PropsType = {
    packId: string
    userId: string
    myId: string
    packName: string
    setEditMode: Dispatch<SetStateAction<boolean>>
    setSavedId: Dispatch<SetStateAction<string>>
    setPackName: Dispatch<SetStateAction<string>>
    editModeValue: boolean
}

export default EditButtons;