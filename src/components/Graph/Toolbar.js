import React from 'react';
import Assignment from '@material-ui/icons/Assignment';
import AssignmentLate from '@material-ui/icons/AssignmentLate';
import AssignmentReturn from '@material-ui/icons/AssignmentReturn';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';

const styles = {
  toolbar: {
    height: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    width: 300,
    display: 'flex',
    alignItems: 'center',
  },
  iconDiv: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
};

const Toolbar = () => {
  const prototypes = [
    <Assignment style={styles.icon} />,
    <AssignmentLate style={styles.icon} />,
    <AssignmentTurnedIn style={styles.icon} />,
    <AssignmentReturned style={styles.icon} />,
    <AssignmentReturn style={styles.icon} />,
  ];

  const { onDragStart } = this.props;
  return (
    <div style={styles.toolbar}>
      {prototypes.map((item, index) => (
        <div
          key={`item_${index + 1}`}
          draggable="true"
          style={styles.iconDiv}
          onDragStart={onDragStart(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
