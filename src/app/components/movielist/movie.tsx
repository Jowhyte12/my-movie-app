"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./Movie.css";
import Link from "next/link";

export default function Movie() {
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }

  const [Movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=d0f5f2e135336200362af8a1a73acb17&language=en-US&page=1";

  useEffect(() => {
    const fetchMovies = async () => {
    fetch(API_URL)
.then(response => response.json())
.then(data => setMovies(data.results))
.catch(error =>console.error("error;", error));
    };
    fetchMovies();
  }, []);


  const filteredMovies= Movies.filter((movies) => movies.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
  
    <div className="movie">
    <div className="search">
    <FaSearch id="search-icon"/>
    <input placeholder="type to search.."
      value ={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}

/>
    </div>
      <h1 className="heading">Movies App</h1>
     
    
 <div className="row">
        {filteredMovies.map((movie) => (
          
          <div key={movie.id} style={{margin: "10px"}} >
          {movie.poster_path && (
              <div className="if">
              <Image
            
              className="od"
              src={`${baseUrl}${movie.poster_path}`}
              alt={movie.title}
              height={300}
              width={200}
            />
           </div>
           )}
          
      

            <p className="Title">{movie.title}</p>

            <Link href={`/favourite/${movie.id}`}>
              <p className="fav"> <FaHeart /></p>
               
             
            </Link>
           
          </div>
        ))}
      </div>
     
      </div>
  
  );
}