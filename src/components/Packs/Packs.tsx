import React from 'react';
import classes from './Packs.module.scss'
import {Button} from "@material-ui/core";
import ButtonFilter from "./ButtonFilter/ButtonFilter";
import SearchField from "./SearchField/SearchField";
import RangeSlider from "./RangeFilter/RangeFilter";
import PacksTable from "./PacksTable/PacksTable";
import {FilterListOutlined} from "@material-ui/icons";
import Pagination from "../../common/Paginator/Pagination";

const Packs = () => {

    return (
        <div className={classes.packs}>
            <div className={classes.packsHeader}>
                <h1>Packs list</h1>
                <Button variant="contained" className={classes.headerBtn}>Add new pack</Button>
            </div>
            <div className={classes.mainContentBlock}>
                <div className={classes.filtersBlock}>
                    <SearchField/>
                    <ButtonFilter/>
                    <RangeSlider/>
                    <FilterListOutlined />
                </div>
                <div className={classes.packsTable}>
                    <PacksTable/>
                </div>
            </div>
            <div className={classes.paginator}>
                <Pagination />
            </div>
        </div>
    );
};

export default Packs;