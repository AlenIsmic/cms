import React from 'react';
import {Container} from "reactstrap";

import * as classnames from "classnames";

class Header extends React.Component {
    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {

        return <Container>
            <div className={classnames("d-flex")}>
                <img style={{width: '30px', height: '30px'}} className="logo" src="http://skyleet.com/images/newlogo.png" />
            </div>
        </Container>
    };

}

export default Header;
