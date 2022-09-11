import {Snackbar} from "@material-ui/core";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {errorHandling, successHandling} from "../../app/app-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars() {
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(errorHandling({error: null}))
        dispatch(successHandling({success: null}))
    };
    const {error, success} = useAppSelector(state => state.app)
    const hasError = error !== null
    const hasSuccess = success !== null

    let valueToShow: string = ''

    if (hasError) {
        valueToShow = error
    }
    if (hasSuccess) {
        valueToShow = success
    }
    const whatToShow = hasSuccess ? "success" : "error"

    return (

        <Snackbar open={hasError || hasSuccess} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={whatToShow}>
                {valueToShow}
            </Alert>
        </Snackbar>

    );
}