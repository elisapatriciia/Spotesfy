import { Button, Card, Form, FormControl } from "react-bootstrap";
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import './homepages.css'
import React, { useEffect, useState } from 'react';

function HomePages (){
    const [state, setState] = useState('');
    const [filteredData, setFilter] = useState('');
    

    const ARTIST_QUERY = gql`
        query GetArtist($n: String!){
            artist(name: $n){
                name,
                albums{
                id,
                name,
                image,
                }
            }
        }`
    const { loading, error, data } = useQuery(ARTIST_QUERY, {
        variables: {
            n: "IU"
        }
    })
    
    let searchWord = ""
    const handleFilter = event =>{
        searchWord = event.target.value;
        // const newFilter = data.artist.albums.filter((value)=>{
        //     return value.name.toLowerCase().includes(searchWord.toLowerCase() )
        // });
        setState(searchWord);
        // setFilter(newFilter);
        console.log(searchWord)
    };

    if (loading) {
        return <div className="load-txt">Loading....</div>
    }
    
    const ALBUMS = data.artist.albums
    const ARTIS = data.artist.name
    console.log(data)

    

    return(

        <div loading={loading}>
            <div>
               <Form className="d-flex search-bar">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="mr-2 margin-fbt"
                  aria-label="Search"
                  onChange={handleFilter}
                />
              </Form>
            </div>
            <div className="body">
                {
                    data.artist.albums?.filter(album=>state? album.name.toLowerCase().includes(state.toLowerCase()): true).map(album=>{
                        return(
                                <Card style={{ width: '18rem' }} className="card-container">
                                    <Card.Img variant="top" src={album.image} />
                                    <Card.Body className="card-body">
                                        <Card.Title as={Link} to={`/detail/${album.id}/${ARTIS}`}> {album.name} </Card.Title>

                                        <Card.Text className="card-text">Song •  
                                        {ARTIS}
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
export default HomePages;