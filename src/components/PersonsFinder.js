import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Person from './Person';
import InputField from './InputField';
import ReactPaginate from 'react-paginate';
import filterImg from '../img/filter.svg';

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
const SidebarTitle = styled.h2`
    position: relative;
    &.collapsible {
        width:  177px;
        height:  25px;
        font-size: 20px;
        text-align: center;
        background: var(--colour-quaternary);
        color: var(--colour-secondary);
        padding: 10px 0;
        border-radius: 5px;
        cursor: pointer;
        :hover{
            background: var(--colour-quinary);
        }
        ::after{
            position: absolute;
            right: 10px;
            content: url(${filterImg});       
            background-size: 25px 25px;
            height: 25px;
            width: 25px;
        }
    }

    &.open {
        background: ${props => (props.open ? "var(--colour-quinary)": "none")};;
    }

`
const SidebarFilters = styled.div`
    transition: 0.25s height ease-in;

    &.hidden {
        opacity: 0;
        height: 0;
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
    const [currentPage, setCurrentPage] = useState(1);
    const [filtersCollapsed, setFiltersCollapsed] = useState(true);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    
    
    useEffect( () => {

        window.addEventListener('resize', handleWindowSizeChange);
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

    const handleWindowSizeChange = () => {
        setInnerWidth(window.innerWidth);
    };

    const showFiltersCollapsedVersion = innerWidth <= 992;

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

    const personsPerPage = 6;
    const totalPages = Math.ceil(filteredPosts.length / personsPerPage );
    let currentPagePersons = filteredPosts.slice( (currentPage-1)*personsPerPage , personsPerPage*currentPage);
    
    const handlePageClick = data => {
        let selected = data.selected;
        setCurrentPage(selected+1);
    };




  return (
    <PersonsFinderSection>
        <Sidebar>
            <SidebarTitle open={!filtersCollapsed} showFiltersCollapsedVersion={showFiltersCollapsedVersion} onClick={() =>setFiltersCollapsed(!filtersCollapsed)}  className={ showFiltersCollapsedVersion ? "collapsible" : null }>Refine</SidebarTitle>
            <SidebarFilters className={showFiltersCollapsedVersion && filtersCollapsed ? "hidden" : null } >
                <InputField
                    key="name"
                    label= "Name"
                    name="name"
                    type="text"
                    onChange={ event => setFilterByName(event.target.value)}
                />
                <InputField
                    key="age"
                    label= "Age"
                    name= "age"
                    type="select"
                    onChange={ event => setFilterByAge(event.target.value)}
                    options= { ["","0-10", "10-20", "20-30", "30-40", "40-50"] }            
                />
                <InputField
                    key="gender"
                    label= "Gender"
                    name="gender"
                    type="radio"
                    onChange={ event => setFilterByGender(event.target.value)}
                    options = { ["male", "female"] }
                />
            </SidebarFilters>
        </Sidebar> 
    
        <Grid>
            { loading &&
                <h2>Loading...</h2>
            }

            { !loading &&
                <div>
                    <h2>{filteredPosts.length} results</h2>
                    <GridWrapper>
                    { currentPagePersons.length >0  && currentPagePersons.map( (post, index) => {
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
                    <ReactPaginate 
                        previousLabel={''}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={ totalPages }
                        pageRangeDisplayed={10}
                        onPageChange={(data)=>handlePageClick(data)}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            }
        </Grid>

    </PersonsFinderSection>
  );
}

export default PersonsFinder;