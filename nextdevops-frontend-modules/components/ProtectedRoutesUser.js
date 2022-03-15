import React, { Component } from 'react';
import { Auth } from "aws-amplify";

const isBrowser = () => typeof window !== "undefined";

class ProtectedRoutesUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false
    }
  }

  componentWillMount() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.setState({ user: true })
        localStorage.setItem('user', true);
      })
      .catch((err) => this.setState({user: false}));
  }

  render() {
    const { children, pathIsProtected, router } = this.props;
    if (isBrowser() && pathIsProtected && !(this.state.user || localStorage.getItem('user') || localStorage.getItem('shipperDetails') || localStorage.getItem('carrierDetails'))) {
      router.push("/");
    }
    return children;
  }
}
export default ProtectedRoutesUser;