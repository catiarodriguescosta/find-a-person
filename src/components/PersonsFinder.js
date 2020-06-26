import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Person from './Person';

const PersonsFinderSection = styled.section`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`
const Sidebar = styled.div`
    width: 100%;
    @media (min-width: 768px){
        width: 345px;
        margin-right: 55px;
    }
`
const Grid = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    @media (min-width: 768px){
        width: calc(100% - 400px);
    }
`
const GridWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`

function PersonsFinder() {

    const [posts, updatePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    

    /*useEffect(() => {
        axios.get('https://randomuser.me/api/?results=200')
        .then(response =>{
            const dataPosts = [...response.data.results];
            console.log(dataPosts);
            const updatedPosts = dataPosts.map( post =>{
                return {
                    name: post.name.first + " " + post.name.last, 
                    gender: post.gender,
                    email: post.email,
                    picture: post.picture.medium,
                    age: post.dob.age
                }
            });
            updatePosts(updatedPosts);
        });

        
    });*/

    useEffect( () => {

        axios({
            method: 'GET',
            url: 'https://randomuser.me/api/?results=200'
        }).then(res =>{
            const dataPosts = [...res.data.results];
            const updatedPosts = dataPosts.map( post =>{
                return {
                    name: post.name.first + " " + post.name.last, 
                    gender: post.gender,
                    email: post.email,
                    picture: post.picture.large,
                    age: post.dob.age
                }
            });
            updatePosts(updatedPosts);
            setLoading(false);
        });
    }, []);
                

  return (
    <PersonsFinderSection>
        <Sidebar>

        </Sidebar> 
    
        <Grid>
            { loading &&
                <p>Loading...</p>
            }

            { !loading &&
                <div>
                    <h2>{posts.length} results</h2>
                    <GridWrapper>
                    { posts.length >0  && posts.map( (post, index) => {
                        return <Person 
                            key={index} 
                            name={post.name} 
                            gender={post.gender}
                            age={post.age}
                            email={post.email}
                            picture= {post.picture}
                            //clicked={()=> this.postSelectHandler(post.id)} 
                            />
                        })
                    }
                    </GridWrapper>
                </div>
            }
        </Grid>

    </PersonsFinderSection>
  );
}

export default PersonsFinder;