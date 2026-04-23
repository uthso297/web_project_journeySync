const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ebhbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const packageCollection = client.db("touristDB").collection("tourPackages");
        const userCollection = client.db("touristDB").collection("users");
        const applicantCollection = client.db("touristDB").collection("applications");
        const guideCollection = client.db("touristDB").collection("guides");
        const bookCollection = client.db("touristDB").collection("bookings");
        const storyCollection = client.db("touristDB").collection("stories");

        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
            res.send({ token });
        })

        app.get('/tourPackages', async (req, res) => {
            const packages = await packageCollection.find().toArray()
            res.send(packages)
        })

        app.get('/tourPackages/random', async (req, res) => {
            const randomPackages = await packageCollection.aggregate([
                { $sample: { size: 3 } }
            ]).toArray();
            res.send(randomPackages)
        })

        app.get('/tourPackages/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const package = await packageCollection.find(query).toArray()
            res.send(package)
        })



        const verifyToken = (req, res, next) => {
            // console.log('inside verify token', req.headers.authorization);
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'no header' });
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'unauthorized access' })
                }
                req.decoded = decoded;
                next();
            })
        }

        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { userEmail: email };
            const user = await userCollection.findOne(query);
            const isAdmin = user?.role === 'Admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }

        app.post('/tourPackages', verifyToken, verifyAdmin, async (req, res) => {
            const package = req.body
            const result = await packageCollection.insertOne(package)
            res.send(result)
        })

        // app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
        //     const users = await userCollection.find().toArray()
        //     res.send(users)
        // })

        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            const { search, role } = req.query;

            // Construct the filter query
            const filter = {};

            if (search) {
                filter.$or = [
                    { userName: { $regex: search, $options: 'i' } }, // Case-insensitive search for name
                    { userEmail: { $regex: search, $options: 'i' } } // Case-insensitive search for email
                ];
            }

            if (role) {
                filter.role = role;
            }

            try {
                const users = await userCollection.find(filter).toArray();
                res.send(users);
            } catch (error) {
                console.error("Error fetching users:", error);
                res.status(500).send({ message: "Error fetching users. Please try again later." });
            }
        });



        app.get('/users/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const user = await userCollection.findOne(query);
            res.send(user || { message: 'User not found' });
        });

        app.patch('/users/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const { username, userimage } = req.body;
            const filter = { userEmail: email };
            const updatedDoc = {
                $set: {
                    userName: username,
                    image: userimage
                },
            };

            try {
                const result = await userCollection.updateOne(filter, updatedDoc);

                if (result.modifiedCount === 0) {
                    return res.status(404).send({ message: "User not found or no changes made" });
                }

                res.send({ message: "Username updated successfully!" });
            } catch (error) {
                console.error("Error updating username:", error);
                res.status(500).send({ message: "Error updating username. Please try again." });
            }
        });



        app.get('/users/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;

            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const query = { userEmail: email };
            const user = await userCollection.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === 'Admin';
            }
            res.send({ admin });
        })

        app.get('/users/guide/:email', verifyToken, async (req, res) => {
            const email = req.params.email;

            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const query = { userEmail: email };
            const user = await userCollection.findOne(query);
            let guide = false;
            if (user) {
                guide = user?.role === 'Tour Guide';
            }
            res.send({ guide });
        })

        app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: 'Admin'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        app.patch('/users/role/:email', verifyToken, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const filter = { userEmail: email };
            const updatedDoc = {
                $set: {
                    role: 'Tour Guide'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })



        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { userEmail: user.userEmail }
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.get('/applications', verifyToken, verifyAdmin, async (req, res) => {
            const applications = await applicantCollection.find().toArray()
            res.send(applications)
        })

        app.delete('/applications/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await applicantCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/applications', verifyToken, async (req, res) => {
            const application = req.body
            const applicant = await applicantCollection.insertOne(application)
            res.send(applicant)
        })

        app.get('/guides', async (req, res) => {
            const guides = await guideCollection.find().toArray()
            res.send(guides)
        })

        app.get('/guide/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await guideCollection.findOne(query);
            res.send(user || { message: 'User not found' });
        });

        app.get('/guides/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await guideCollection.findOne(query);
            res.send(user || { message: 'User not found' });
        });

        app.patch('/guides/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const { username, userimage } = req.body;
            const filter = { email: email };
            const updatedDoc = {
                $set: {
                    name: username,
                    photo: userimage
                },
            };

            try {
                const result = await guideCollection.updateOne(filter, updatedDoc);

                if (result.modifiedCount === 0) {
                    return res.status(404).send({ message: "User not found or no changes made" });
                }

                res.send({ message: "Username updated successfully!" });
            } catch (error) {
                console.error("Error updating username:", error);
                res.status(500).send({ message: "Error updating username. Please try again." });
            }
        });

        app.post('/guides', verifyToken, verifyAdmin, async (req, res) => {
            const guideInfo = req.body
            const guide = await guideCollection.insertOne(guideInfo)
            res.send(guide)
        })

        app.get('/books/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { touristEmail: email };
            const user = await bookCollection.find(query).toArray();
            res.send(user || { message: 'User not found' });
        })

        app.get('/book/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { guideEmail: email };
            const user = await bookCollection.find(query).toArray();
            res.send(user || { message: 'User not found' });
        })

        app.patch('/books/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status: "In-review"
                },
            };
            const result = await bookCollection.updateOne(query, updatedDoc)
            res.send(result)
        })

        app.patch('/books/accept/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status: "Accepted"
                },
            };
            const result = await bookCollection.updateOne(query, updatedDoc)
            res.send(result)
        })

        app.patch('/books/reject/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status: "Rejected"
                },
            };
            const result = await bookCollection.updateOne(query, updatedDoc)
            res.send(result)
        })

        app.get('/books', verifyToken, verifyAdmin, async (req, res) => {
            const result = await bookCollection.find().toArray()
            res.send(result)
        })

        app.get('/bookss/:id', verifyToken, async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await bookCollection.findOne(query)
            res.send(result)
        })

        app.delete('/books/:id', verifyToken, async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await bookCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/books', verifyToken, async (req, res) => {
            const book = req.body;
            const result = await bookCollection.insertOne(book);
            res.send(result);
        })

        app.get('/stories', async (req, res) => {
            const result = await storyCollection.find().toArray();
            res.send(result);
        })

        app.get('/story/:id', verifyToken, async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const story = await storyCollection.findOne(query)
            res.send(story)
        })

        app.delete('/stories/:id', verifyToken, async (req, res) => {
            const { id } = req.params;
            const query = { _id: new ObjectId(id) }
            const result = await storyCollection.deleteOne(query)
            res.send(result)
        })


        app.patch('/stories/:id', verifyToken, async (req, res) => {
            const { id } = req.params;
            const { title, description, newImages, removedImages } = req.body;

            try {

                if (!ObjectId.isValid(id)) {
                    return res.status(400).send({ message: "Invalid story ID" });
                }

                const storyFilter = { _id: new ObjectId(id) };


                if (title || description) {
                    const updateDoc = {};
                    if (title) updateDoc.title = title;
                    if (description) updateDoc.description = description;

                    await storyCollection.updateOne(storyFilter, { $set: updateDoc });
                }


                if (removedImages && removedImages.length > 0) {
                    await storyCollection.updateOne(storyFilter, {
                        $pull: { images: { $in: removedImages } },
                    });
                }


                if (newImages && newImages.length > 0) {
                    await storyCollection.updateOne(storyFilter, {
                        $push: { images: { $each: newImages } },
                    });
                }

                const updatedStory = await storyCollection.findOne(storyFilter);
                res.send(updatedStory);

            } catch (error) {
                console.error("Error updating story:", error);
                res.status(500).send({ message: "Error updating story. Please try again." });
            }
        });

        app.get('/storie/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const result = await storyCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/stories/:email', verifyToken, async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const result = await storyCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/stories', verifyToken, async (req, res) => {
            const story = req.body;
            const result = await storyCollection.insertOne(story);
            res.send(result);
        })

        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body
            const amount = parseInt(price * 100)
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",

                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('tourists are wandering');
})

app.listen(port, () => {
    console.log(`tourits are wandering at port ${port}`);
})