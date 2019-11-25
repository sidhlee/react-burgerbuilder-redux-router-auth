import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

// shows Modal when axios' response interceptor catches an error
// takes wrapping component and axios instance to which
// we're attaching interceptor middleware
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      console.log("[withErrorHandler] constructor");
      super(props);
      this.state = {
        error: null
      };
      this.reqInterceptor = axios.interceptors.request.use(
        req => {
          this.setState({ error: null }); // reset error before each new request
          console.log(
            `[withErrorHandler] axios.interceptors.request.use(req => :`,
            req
          );
          return req;
        }
      );
      this.resInterceptor = axios.interceptors.response.use(
        res => res /* return res to "call next" */,
        err => {
          this.setState({ error: err }); // set error with err OBJECT
        }
      );
    }

    /* moved interceptors into constructor 
      because here, interceptors will be in effect only after 
      ALL child component renderes. 
      We want to set interceptors before the child component 
      start rendering */
    componentDidMount() {
      console.log("[withErrorHanlder] componentDidMount");
    }

    componentDidUpdate() {
      console.log("[withErrorHandler] componentDidUpdate");
    }

    componentWillUnmount() {
      // console.log('will Unmount', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(
        this.resInterceptor
      );
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {/* without ternary, we get reference error 
            (when this.state.error == null) */}
            {this.state.error
              ? this.state.error.message
              : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
