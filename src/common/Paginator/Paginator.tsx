import * as React from 'react';
import {NativeSelect, Pagination} from "@mui/material";
import {ChangeEvent} from "react";
import {useAppDispatch} from "../../app/hooks/hooks";
import {getPacks} from "../../components/Packs/packs-reducer";
import classes from "./Paginator.module.scss"

const Paginator: React.FC<PaginatorProps> = ({currentPage, pageCount, cardPacksTotalCount}) => {
    const dispatch = useAppDispatch()

    const onPaginationChangeHandler = (
        event: ChangeEvent<unknown> | null,
        newPage: number
    ) => {
        dispatch(getPacks({page: newPage, pageCount}))
    };
    const onSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getPacks({pageCount: +e.target.value}))
    }

    return (
        <div className={classes.paginationWrap}>
            <Pagination
                page={currentPage}
                count={cardPacksTotalCount}
                variant="outlined"
                shape="rounded"
                onChange={onPaginationChangeHandler}
            />
            <div className={classes.selectBlock}>
                <span className={classes.selectText}>Show</span>
                <NativeSelect
                    value={pageCount}
                    variant="standard"
                    className={classes.nativeSelect}
                    onChange={onSelectChangeHandler}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </NativeSelect>
                <span className={classes.selectText}>packs per page</span>
            </div>
        </div>
    );
}

type PaginatorProps = {
    currentPage: number
    pageCount: number
    cardPacksTotalCount: number
}
export default Paginator;