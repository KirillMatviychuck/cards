import React, {ChangeEvent, useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from './PacksTable.module.scss'
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {changePackName, getPacks} from "../packs-reducer";
import {SinglePack} from "../../../api/api-types";
import EditButtons from "../EditButtons/EditButtons";
import {TextField} from "@material-ui/core";

export default function PacksTable() {
    const dispatch = useAppDispatch()
    const {cardPacks} = useAppSelector(state => state.packs)
    const {_id: myId} = useAppSelector(state => state.profile)

    const [editMode, setEditMode] = useState(false)
    const [savedId, setSavedId] = useState('')
    const [packName, setPackName] = useState('')

    // handlers
    const onPackNameChangeHandler = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setPackName(e.currentTarget.value)
    const onBlurHandler = () => {
        dispatch(changePackName({id: savedId, name: packName}))
        setEditMode(false)
        setSavedId('')
    }

    function fixDate(pack: SinglePack) {
        const index = pack.created.indexOf('T')
        return pack.created.slice(0, index)
    }

    useEffect(() => {
        dispatch(getPacks({pageCount: 10}))
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Cards</TableCell>
                        <TableCell align="right">Last Update</TableCell>
                        <TableCell align="right">Created by</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cardPacks.map(pack => {
                        return <TableRow key={pack._id}>
                            <TableCell component="th" scope="row">
                                {editMode && savedId === pack._id
                                    ? <TextField value={packName}
                                                 onChange={onPackNameChangeHandler}
                                                 autoFocus
                                                 onBlur={onBlurHandler}/>
                                    : pack.name}
                            </TableCell>
                            <TableCell align="right">{pack.cardsCount}</TableCell>
                            <TableCell align="right">{fixDate(pack)}</TableCell>
                            <TableCell align="right">{pack.user_name}</TableCell>
                            <TableCell align="right" className={classes.editButtonsBlock}>
                                {pack.user_id === myId
                                    && <EditButtons
                                        packId={pack._id}
                                        packName={pack.name}
                                        setEditMode={setEditMode}
                                        editModeValue={editMode}
                                        setSavedId={setSavedId}
                                        setPackName={setPackName}/>}
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
