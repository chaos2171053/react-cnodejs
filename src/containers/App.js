import React, { Component} from 'react'
import PropTypes from 'prop-types'; 
class App extends Component {
//     render() {
//       return (
//           <div>{this.props.children}</div>
//       )
//   }
   render() {
      return (
          <div>{this.props.children}</div>
      )
  }
}
App.propTypes = {
    children: PropTypes.element.isRequired
};
export default App