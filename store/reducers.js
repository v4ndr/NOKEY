const initialState = { setlist: [], editMode: false, checkedItem : [] }

function setlistReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_SETLIST':
      const songIndex = state.setlist.findIndex(item => item === action.value)
      if (songIndex !== -1) {
        nextState = {
          ...state,
          setlist: state.setlist.filter( (item, index) => index !== songIndex)
        }
      }
      else {
        nextState = {
          ...state,
          setlist: [...state.setlist, action.value]
        }
      }
      return nextState || state
    case 'NEW_SETLIST':
      nextState={
        ...state,
        setlist: action.value
      }
      return nextState || state
    case 'TOGGLE_EDITMODE':
      nextState={
        ...state,
        editMode:!state.editMode
      }
      return nextState || state
    // case 'DELETE_ITEMS':
    //   state.checkedItem.forEach(item=>{
    //     state.setlist.indexOf(item)
    //   })
    //   nextState={
    //     ...state,
    //     editMode:!state.editMode
    //   }
    //   return nextState || state
  default:
    return state
  }
}

export default setlistReducer

