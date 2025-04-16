/* eslint-disable react/prop-types */
import React from "react";
import { Link as RouterLink } from "react-router-dom";

// eslint-disable-next-line react/display-name
const LinkBehavior = React.forwardRef((props, ref) => {

    // eslint-disable-next-line no-unused-vars
    const {button, ...restPropps} = props;

    return <RouterLink ref={ref} {...restPropps} />;
});

export default LinkBehavior;