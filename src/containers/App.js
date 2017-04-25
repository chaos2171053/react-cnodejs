import React, { Component} from 'react'
import PropTypes from 'prop-types'; 
class App extends Component {
    
    componentWillMount() {
        
    }
    
   render() {
      return (
          <div>666666</div>
      )
  }
}
App.propTypes = {
    children: PropTypes.element.isRequired
};
export default App