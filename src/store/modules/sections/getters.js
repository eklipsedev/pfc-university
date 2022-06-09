export default {
    sections(state) {
      return state.sections;
    },
    hasSections(state) {
      return state.sections || state.sections.length > 0;
    },
  };