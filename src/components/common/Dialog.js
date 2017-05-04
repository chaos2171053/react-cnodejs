import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { hashHistory } from 'react-router';

const DialogExample = props => {
  const handleClose = () => {
    props.close()
  }

  const handleJump = () => {
    props.close()
    if (props.link) {
      hashHistory.push(props.link)
    }
    if (props.action) {
      props.action()
    }
  }
  const actions = props.singleButton ?
    [<FlatButton label="确定" primary={true} onTouchTap={handleClose} />] :
    [
    <FlatButton label="取消" primary={true} onTouchTap={handleClose} />,
    <FlatButton label="确定" primary={true} onTouchTap={handleJump} />];
  return (
    <MuiThemeProvider>
      <Dialog
        title={props.title || '嘿嘿~~'}
        actions={actions}
        modal={false}
        open={props.isOpen}
        onRequestClose={handleClose}
      >
        {props.children}
      </Dialog>
    </MuiThemeProvider>
  )
}

export default DialogExample

// import React from 'react';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';

// /**
//  * Dialog with action buttons. The actions are passed in as an array of React objects,
//  * in this example [FlatButtons](/#/components/flat-button).
//  *
//  * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
//  */
// export default class DialogExampleSimple extends React.Component {
//   state = {
//     open: false,
//   };

//   handleOpen = () => {
//     this.setState({open: true});
//   };

//   handleClose = () => {
//     this.setState({open: false});
//   };

//   render() {
//     const actions = [
//       <FlatButton
//         label="Cancel"
//         primary={true}
//         onTouchTap={this.handleClose}
//       />,
//       <FlatButton
//         label="Submit"
//         primary={true}
//         keyboardFocused={true}
//         onTouchTap={this.handleClose}
//       />,
//     ];

//     return (
//       <div>
//         <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
//         <Dialog
//           title="Dialog With Actions"
//           actions={actions}
//           modal={false}
//           open={this.state.open}
//           onRequestClose={this.handleClose}
//         >
//           The actions in this window were passed in as an array of React objects.
//         </Dialog>
//       </div>
//     );
//   }
// }