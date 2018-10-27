import * as types from '../constants/actions';

const initialState = {
  hasComponent: false,
  objects: [],
};

const stepComponent = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.COMPONENT_FETCHED: {
      const newObjects = [];
      const { objects } = action;
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        const { editor } = object;
        const keys = Object.keys(editor);
        const dataComponents = [];
        for (let m = 0; m < keys.length; m++) {
          const key = keys[m];
          dataComponents.push({
            ...editor[key],
            name: key,
          });
        }
        newObjects.push({ components: dataComponents })
      }
      return {
        ...state,
        objects: newObjects,
        hasComponent: true,
      };
    }
    default:
      return state;
  }
};

export default stepComponent;
