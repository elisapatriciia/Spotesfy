import { Card } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


function Favorite (){
    const [love, setLove] = useState([])
    const FAV = JSON.parse(localStorage.getItem("favorite"))??[]
    var flag = "fa-heart"
    // if(addedToFav===true){
    //     var flag = "fa-heart";
    // }else{
    //     var flag = "fa-heart-o";
    // }
    const addFavBtn = JSON.parse(localStorage.getItem("favorite"))??[]
    const addedToFav = addFavBtn.some(love=>love.id === FAV.id)

    const removeFavorite = value =>() => {

            for (let index = 0; index < FAV.length; index++) {
                if(FAV[index].id === value){
                    FAV.splice(index, 1)
                    localStorage.setItem("favorite", JSON.stringify(FAV))
                    
                }
            }
            setLove(value)
            
    }

    if(FAV.length===0){
        return(
            <h1 className="no-fav">No Favorite...</h1>
        )
    }else{
        return(
             <div >
                 <h1 className="no-fav">Favorites</h1>
                 <div className="body">
                    {
                        FAV?.map(fav => {
                            return(
                                <Card style={{ width: '18rem' }} className="card-container grow"
                                as={Link} to={`/detail/${fav.id}/IU`}>
                                    <Card.Img variant="top" src={fav.image} className="album-cov"/>
                                    <Card.Body className="card-body">
                                        <Card.Title> {fav.name} </Card.Title>
                                        <Card.Text className="card-text flex-card-text">Song •  
                                        IU
                                        <i className={`fa fa-2x ${flag} love`} aria-hidden="true" onClick={removeFavorite(fav.id)}>
                                            </i>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                 </div>
                    
            </div>
        )
    }

}
export default Favorite;