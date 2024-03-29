import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmDetailFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'

class FilmList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films:[]
    }
  }


_displayDetailForFilm = (idFilm) => {
  console.log("Display film " + idFilm)
  this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
}

render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.films}
          extraData={this.props.favoritesFilm}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <FilmItem
              film={item}
              isFilmFavorite={ this.props.favoritesFilm.includes(item) }
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}

          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
              this.props._loadFilms()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmList)
