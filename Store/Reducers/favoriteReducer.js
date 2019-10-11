const initialState = { favoriteFilm: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteFilmIndex = state.favoriteFilm.findIndex(item => item.id === action.value.id)
      if (favoriteFilmIndex !== -1) {
        //le film est deja dans les favoris
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
        }
      }
      else {
        //le film n'est pas encore dans les favoris
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        }
      }
      return nextState || state
    default:
      return state
  }
}

export default toggleFavorite
