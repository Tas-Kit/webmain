import React from 'react';

import task1 from '../../assets/svgs/task1.svg';
import task2 from '../../assets/svgs/task2.svg';
import task3 from '../../assets/svgs/task3.svg';
import task4 from '../../assets/svgs/task4.svg';
import task5 from '../../assets/svgs/task5.svg';

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

const Toolbar = (props) => {
  const prototypes = [
    <img src={task1} style={{ width: 40, height: 40 }} alt="taskSvg" />,
    <img src={task2} style={{ width: 40, height: 40 }} alt="taskSvg" />,
    <img src={task3} style={{ width: 40, height: 40 }} alt="taskSvg" />,
    <img src={task4} style={{ width: 40, height: 40 }} alt="taskSvg" />,
    <img src={task5} style={{ width: 40, height: 40 }} alt="taskSvg" />,
  ];

  return (
    <div style={styles.toolbar}>
      {prototypes.map((item, index) => (
        <div
          key={`item_${index + 1}`}
          draggable="true"
          style={styles.iconDiv}
          onDragStart={props.onDragStart(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
