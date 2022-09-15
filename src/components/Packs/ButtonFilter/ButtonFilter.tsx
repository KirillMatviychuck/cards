import React, {useState} from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import classes from './ButtonFilter.module.scss'


const ButtonFilter = () => {
    const [active, setActive] = useState('my')
    const onMyBtnClick = () => setActive('my')
    const onAllBtnClick = () => setActive('all')

    return (
        <ButtonGroup disableElevation variant="contained" color="primary">
            <Button onClick={onMyBtnClick}
                    className={active === "my" ? classes.filterBtn : classes.defaultFilterBtn}
            >My</Button>

            <Button onClick={onAllBtnClick}
                    className={active === "all" ? classes.filterBtn : classes.defaultFilterBtn}
            >All</Button>
        </ButtonGroup>
    );
}

export default ButtonFilter;