import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Person from './Person';
import InputField from './InputField';

const PersonsFinderSection = styled.section`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-top: 70px;
`
const Sidebar = styled.div`
    width: 100%;
    margin-bottom: 50px;
    
    @media (min-width: 768px){
        max-width: 400px;
    }
    @media (min-width: 992px){
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
    @media (min-width: 992px){
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
    const [filterByName, setFilterByName] = useState("");
    const [filterByAge, setFilterByAge] = useState("");
    const [filterByGender, setFilterByGender] = useState("");
    
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


    let filteredPosts = [...posts];
    if (filterByName !== ""){
        filteredPosts = filteredPosts.filter(person =>
            person.name.toLowerCase().includes(filterByName)
        );
    }
    if (filterByGender !== ""){
        filteredPosts = filteredPosts.filter(person =>
            person.gender === filterByGender
        );
    }
    if (filterByAge !== ""){
        const AgeRange= filterByAge.split("-");
        filteredPosts = filteredPosts.filter(person =>
            person.age >= AgeRange[0] && person.age <= AgeRange[1]
        );
    }
                

  return (
    <PersonsFinderSection>
        <Sidebar>
            <h2>Refine</h2>
            <InputField
                label= "Name"
                name="name"
                type="text"
                onChange={ event => setFilterByName(event.target.value)}
            />
            <InputField
                label= "Age"
                name= "age"
                type="select"
                onChange={ event => setFilterByAge(event.target.value)}
                options= { ["","0-10", "10-20", "20-30", "30-40", "40-50"] }            
            />
            <InputField
                label= "Gender"
                name="gender"
                type="radio"
                onChange={ event => setFilterByGender(event.target.value)}
                options = { ["male", "female"] }
            />
        </Sidebar> 
    
        <Grid>
            { loading &&
                <h2>Loading...</h2>
            }

            { !loading &&
                <div>
                    <h2>{filteredPosts.length} results</h2>
                    <GridWrapper>
                    { filteredPosts.length >0  && filteredPosts.map( (post, index) => {
                        return <Person 
                            key={index} 
                            name={post.name} 
                            gender={post.gender}
                            age={post.age}
                            email={post.email}
                            picture= {post.picture}
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