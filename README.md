# MN State Bot - Webhook Test
=========================

**Let's make a simple node.js server talk to both Dialogflow and MongoDB, and while we're at it we'll create an express.js REST API and some mongoose.js data models for our MongoDB database.**

-------------------

## Architecture
1. Chat Channel (e.g. Facebook)
2. Dialog Flow
3. Node.js Server
    * Express.js REST API
    * Mongoose Model
4. MongoDB instance on mlab.com

## Implementation notes
### Action naming
Use descriptive action names that are period deliminated, for instance: `user.name` This allows action handlers to use the `string.startsWith()` function to sort incoming requests and pass them to the correct handlers. See ./actions/index.js and ./actions/test/index.js for an example.


-----------------
\ ゜o゜)ノ -- Woo!