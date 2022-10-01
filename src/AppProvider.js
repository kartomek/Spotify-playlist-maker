import React, { useState, createContext, useContext } from 'react';
import request from './axiosConfig';

const AppContext = createContext(null);

const AppProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem("Spotify_token"));
    const [titlesProvider, setTitlesProvider] = useState("");

    const saveToken = token => {
        localStorage.setItem("Spotify_token", token);
        setToken(token);
    }

    const saveTitlesProvider= titles =>{
        setTitlesProvider(titles);
    }

    const deleteTitlesProvider = () =>{
        setTitlesProvider("");
    }

    const checkError = error =>{
        if(error === 401){
            return "Your token has expired or is invalid.";
        }else if(error === 403){
            return "The specified request could not be satisfied.";
        }else if(error === 429){
            return "Too many requests were made.";
        }else{
            return "Error occured.";
        }
    }

    const searchTrack = async(title) => {
        try{
            const res = await request.get(`/search?q=${encodeURIComponent(title)}&type=track&limit=1&offset=0`,  
            { headers: {
                "Authorization": `Bearer ${token}`
            }});
            return [res.data.tracks.items[0]?.id ? res.data.tracks.items[0].id : null, res.data.tracks.items[0]?.uri ? res.data.tracks.items[0]?.uri : null];
        }
        catch(error){
            throw Error(checkError(error.response.status));
        }
     }

     const userId = async() =>{
        try{
           const data = await request.get("/me", { headers: {
                "Authorization": `Bearer ${token}`
            }})
            return data.data.id;
        }
        catch(err){
            throw Error(checkError(err.response.status))
        }
    }

     const createPlaylist = async(userId, name) =>{
        try{
            const data = await request.post(`/users/${userId}/playlists`, {
                "name": name,
                "description": "Playlist created by Spotify playlist maker",
                "public": "true"
            }, { headers: {
                "Authorization": `Bearer ${token}`
            }});
            return data.data.id;
        }
        catch(err){
            throw Error(checkError(err.response.status));
        }
     }

     const addTracksToPlaylist = async(tracks, playlistId) =>{
        try{
            await request.post(`/playlists/${playlistId}/tracks`, { 
                "uris": tracks}, 
                { headers: {
                "Authorization": `Bearer ${token}`,
            }})
        }
        catch(err){
            throw Error(checkError(err.response.status) + " Your playlist has been created but songs could not be added!");
        }
     }

     const createSet = async(tracks, name) => {
        let user_id = null;
        let playlist_id = null;
        try{
            const data = await userId();
            user_id = data;
        }
        catch(err){
            throw Error(err.message);
        }
        try{
            const data = await createPlaylist(user_id, name);
            playlist_id = data;
        }
        catch(err){
            throw Error(err.message);
        }
        try{
            await addTracksToPlaylist(tracks, playlist_id);
        }
        catch(err){
            throw Error(err.message);
        }
     }

    return (
        <AppContext.Provider value={{
            saveToken,
            searchTrack,
            token,
            createSet,
            saveTitlesProvider,
            deleteTitlesProvider,
            titlesProvider
        }}>
            {props.children}            
        </AppContext.Provider>
    )
}

const useController = () => {
    const context = useContext(AppContext);

    if (context === null) {}
    else return context;
}

export default useController;
export {AppProvider}