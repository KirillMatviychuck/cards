import React from 'react';
import classes from "./Cards.module.scss";
import CardsTable from "./CardsTable/CardsTable";
import {Button} from "@material-ui/core";

const someVariable = false

const Cards = () => {
    if (someVariable) {
        return (
            <div className={classes.emptyCards}>
                <div className={classes.backToPackList}>
                    <Button>Back to Pack List</Button>
                    <h3 className={classes.packName}>Pack Name</h3>
                </div>
                <div className={classes.addNewPackBlock}>
                    <span className={classes.addPackSpan}>This pack is empty. Click add new pack to fill this pack</span><br/>
                    <Button className={classes.addCardBtn}>Add new card</Button>
                </div>
            </div>
        )
    }
    return (
        <div className={classes.cards}>
            <div className={classes.backToPackList}>
                <Button>Back to Pack List</Button>
            </div>
            <div className={classes.mainContent}>
                <div className={classes.packNameBlock}>
                    Pack Name
                    <Button className={classes.addCardBtn}>Add New Card</Button>
                </div>
                <div className={classes.searchField}>SEARCH FIELD</div>
                <div className={classes.cardsTable}>
                    <CardsTable/>
                </div>
            </div>
            <div>PAGINATOR</div>
        </div>
    );
};

export default Cards;