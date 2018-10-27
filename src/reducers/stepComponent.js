import * as types from '../constants/actions';

const initialState = {
  hasComponent: false,
  dataComponents: [],
};

const stepComponent = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.COMPONENT_FETCHED: {
      const { editor } = action.componentJs;
      const keys = Object.keys(editor);
      const dataComponents = [];
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        dataComponents.push({
          ...editor[key],
          name: key,
        });
      }
      return {
        ...state,
        dataComponents,
        hasComponent: true,
      };
    }
    default:
      return state;
  }
};

export default stepComponent;
