import React from "react";
import { createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 50px",
            backgroundColor: "#C4C4C4",
            color: "#181717"
        },
    })
);

const Header = () => {
    const classes = useStyles();
	return (
        <AppBar position="static">
        <Toolbar className={classes.root}>
            <Box>
                ToDo list
            </Box>
            <Box>
               created by Alina and Dasha
            </Box>
        </Toolbar>
    </AppBar>
	)
}

export default Header;

