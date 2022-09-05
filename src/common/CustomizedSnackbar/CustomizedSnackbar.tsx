import {Snackbar} from "@material-ui/core";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useSelector} from "react-redux";
import {errorHandling} from "../../app/app-reducer";
import {useAppDispatch} from "../../app/hooks/hooks";
import {RootState} from "../../app/store";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars() {
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(errorHandling({ error: null }))
    };
    let error = useSelector<RootState, string | null>(state => state.app.error)
    let hasError = error !== null
    return (

        <Snackbar open={hasError} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>

    );
}