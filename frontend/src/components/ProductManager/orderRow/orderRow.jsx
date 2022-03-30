import React, {useState} from 'react';
// import { render } from 'react-dom';
// import { slideDown, slideUp } from 'anim';
// // import {slideDown, slideUp} from 'react-slidedown'

function formatDate(str) {
  return str.substr(0, 10);
}

function capitalize(str) {
  return str.split(' ').map(s => {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }).join(' ');
}

export default function UserTableRow( props ) {
  const [expanded, setExpanded] = React.useState(false);

    return (
      <tr key="main">
        <td>
          <input className="uk-checkbox" type="checkbox" />
        </td>
        <td>{this.props.name}
        </td>
        <td>{props.lname}</td>
        <td>{props.email}</td>
        <td>{props.total}</td>
      </tr>,
      this.state.expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" 
            className="inner uk-grid">          
              <div className="uk-width-3-4">  
                E-mail: <br/>
                Phone: 
              </div>
            </div>
          </td>
        </tr>
      )
    )
}
