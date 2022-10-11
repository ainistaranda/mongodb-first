import { MongoClient, ObjectId } from 'mongodb'

import { uri } from "./credentials.js"

const client = new MongoClient(uri)
//connects to database
const db = client.db("sample_mflix")
const moviesCollection = db.collection("movies")


// console.log( await moviesCollection.findOne({}))
let query = { title: { $regex: /boca code/i } } //search for "movie name" anywhere in the title & ignore case
let movieArray = await moviesCollection
    .find(query)
    // .limit(3) // limit how many it searches for
    .toArray() // make it into an array

for (let i = 0; i < movieArray.length; i++) {
    console.log(movieArray[i].title)
}

// let firstMovie = movieArray[0]
// console.log(firstMovie.title)



console.log(`there are ${movieArray.length} movies`)

// add a new movie

const newMovie = {
    title: "The Boca Code Story",
    rating: "R",
    genre: ["Comedy"],
    releaseDate: "2022/12/16",

}

// const results = await moviesCollection.insertOne(newMovie)
//checks if added in database, copy insertedId and paste
// console.log("Results of insert", results) 

const updateQuery = { _id: new ObjectId("6345cc2a1d072bf3908b99e5") }
const update = { $set: {title: "The New Boca Code Story"}}
const results = await moviesCollection.findOneAndUpdate(updateQuery,update);
console.log(results)







