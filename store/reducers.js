const initialState = { setlist: [], editMode: false, checkedItem : []}

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
        editMode:!state.editMode,
      }
      return nextState || state
    case 'TOGGLE_CHECK_ITEM':
      const itemIndex = state.checkedItem.findIndex(item => item === action.value)
      if(itemIndex !== -1){
        nextState = {
          ...state,
          checkedItem: state.checkedItem.filter( (item, index) => index !== itemIndex)
        }
      }
      else{
        nextState={
          ...state,
          checkedItem:[...state.checkedItem, action.value]
        }
      }
      return nextState || state
    case 'DELETE_ITEMS':
      nextState={
        ...state,
        checkedItem:[],
        setlist:state.setlist.filter( (item) => !state.checkedItem.includes(item) )
      }
      return nextState || state
  default:
    return state
  }
}

export default setlistReducer

