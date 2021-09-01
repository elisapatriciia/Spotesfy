import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import './DetailPage.css';
import React, { useState, useEffect } from 'react'


function DetailPage (){
    const [love, setLove] = useState([])
    const { id } = useParams();
    const { artist } = useParams();

    const ALBUM_QUERY = gql`
    query GetAlbum($n: String!){
        album(id: $n){
            id,
            name,
            image,
            tracks{
                id,
                name,
                preview_url
            }
        }
    }`
    const { loading, error, data } = useQuery(ALBUM_QUERY, {
        variables: {
            n: id
        }
    })

    if (loading) {
        return <div className="load-txt">Loading....</div>
    }
    console.log(data)
    const ALBUM = data.album
    const TRACKS = data.album.tracks

    const addFavBtn = JSON.parse(localStorage.getItem("favorite"))??[]
    const addedToFav = addFavBtn.some(love=>love.id === id)
    if(addedToFav===true){
        var flag = "fa-heart";
    }else{
        var flag = "fa-heart-o";
    }
      
    const addFavorite =() => {
        const FAV = JSON.parse(localStorage.getItem("favorite"))??[]
        console.log(addedToFav)
        if(addedToFav===true){
            for (let index = 0; index < addFavBtn.length; index++) {
                if(addFavBtn[index].id === id){
                    addFavBtn.splice(index, 1)
                    localStorage.setItem("favorite", JSON.stringify(addFavBtn))
                    
                }
            }
            setLove("K")
            
        }else{
            setLove(ALBUM)
            localStorage.setItem("favorite", JSON.stringify([...FAV, ALBUM]))
        }
    }
    return(
        <div>
            <div className="card-flex">
                <Card.Img className="album-cover" variant="top" src={ALBUM.image} />
                <Card style={{ width: '40rem' }} className="card-container">
                    <Card.Body className="card-body">
                        <span className="title-card"> {ALBUM.name} </span>

                        <Card.Text className="card-text">Album •  
                        {artist}
                        </Card.Text>
                        <i className={`fa fa-2x ${flag} love`} aria-hidden="true" onClick={addFavorite}></i>
                    </Card.Body>
                </Card>
            </div>
            {
                    TRACKS?.map(track => {
                        return(
                            <div className="audio-container">
                                    <span>{track.name}</span>
                                   <audio src={track.preview_url} controls></audio> 
                            </div>
                        )
                    })
            }
            
        </div>
    )
}
export default DetailPage;