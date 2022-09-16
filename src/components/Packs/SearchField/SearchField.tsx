import React, {ChangeEvent, useEffect, useState} from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import {Search} from "@material-ui/icons";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {getPacks, setSearchField} from "../packs-reducer";
import {useDebounce} from "../../../common/hooks/useDebouncer/useDebouncer";


const SearchField = () => {
    const dispatch = useAppDispatch()
    const {searchField, page, pageCount} = useAppSelector(state => state.packs)
    const [value, setValue] = useState<string>(searchField)
    const debouncedValue = useDebounce<string>(value, 500)

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        dispatch(setSearchField({text: value}))
        dispatch(getPacks({pageCount, packName: value}))
    }, [debouncedValue])

    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
                <Input
                    value={value}
                    onChange={handleChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    );
}

export default SearchField;