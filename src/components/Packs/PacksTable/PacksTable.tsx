import React, {useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from './PacksTable.module.scss'
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {getPacks} from "../packs-reducer";
import {SinglePack} from "../../../api/api-types";

export default function PacksTable() {
    const dispatch = useAppDispatch()
    const {cardPacks} = useAppSelector(state => state.packs)
    function fixDate(pack: SinglePack) {
        const index = pack.created.indexOf('T')
        return pack.created.slice(0, index)
    }
    useEffect(() => {
        dispatch(getPacks({}))
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
                        const correctDate = fixDate(pack)
                        return <TableRow key={pack._id}>
                            <TableCell component="th" scope="row">
                                {pack.name}
                            </TableCell>
                            <TableCell align="right">{pack.cardsCount}</TableCell>
                            <TableCell align="right">{correctDate}</TableCell>
                            <TableCell align="right">{pack.user_name}</TableCell>
                            <TableCell align="right">SIGN</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
