from collections import UserString
from flask import Blueprint
from app.models import Library, User


searchSong_routes = Blueprint('search', __name__)

@searchSong_routes.route('/<nameOfItem>')
def searchItem(nameOfItem):
    users = User.query.filter(User.username.ilike(f'%{nameOfItem}%')).distinct(User.username)
    dict_users = [user.to_dict() for user in users]

    songs = Library.query.filter(Library.song_title.ilike(f'%{nameOfItem}%'))
    dict_songs = [song.to_dict() for song in songs]

    artists = Library.query.filter(Library.artist_name.ilike(f'%{nameOfItem}%')).distinct(Library.artist_name)
    dict_artists = [artist.to_dict() for artist in artists]

    albums = Library.query.filter(Library.album_name.ilike(f'%{nameOfItem}%')).distinct(Library.album_name)
    dict_albums = [album.to_dict() for album in albums]

    return {"users": dict_users, 
            "songs": dict_songs,
            "artists": dict_artists,
            "albums": dict_albums
    }


