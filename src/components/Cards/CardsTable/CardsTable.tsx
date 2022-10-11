import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import classes from "./CardsTable.module.scss";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

const CardsTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell align="right">Answer</TableCell>
                        <TableCell align="right">Last Update</TableCell>
                        <TableCell align="right">Grade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            QuestionCell
                        </TableCell>
                        <TableCell align="right">AnswerCell</TableCell>
                        <TableCell align="right">Last UpdateCell</TableCell>
                        <TableCell align="right">Grade</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CardsTable;