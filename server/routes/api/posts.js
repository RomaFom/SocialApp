const express = require("express");
const router = express.Router();
const auth = require("../../service/auth");
const { check, validationResult } = require("express-validator");
const connection = require("../../service/db");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);
const moment = require("moment");

// @route POST api/posts
// @desc  user post a post
// @acess Private

router.post('/', auth,[
    check("post", "Post can't be empty").not().isEmpty(),
  ],
  async(req, res)=>{
    // Validate is post not empty
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
        }
    // Get post from body
    const {post} = req.body;
    // Get user id from token
    const userId = req.user.id;
    // Get current date
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const addPostQuery = `INSERT INTO posts (user_id, data, date) VALUES (? , ? , ?);`;

    try {
        await query(addPostQuery, [userId, post, date], (err, result) => {
            if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        }
        if (result) {
            res.status(200).json({ msg: "Post added" });
        }
        })
    } 
    catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
})

// @route GET api/posts
// @desc  Get all my friends posts
// @acess Private
router.get('/', auth, async(req, res)=>{
    // friend list TODO take from profile
    const friendList = [1,2,3];
    // 
    const getAllFriendsPosts = `SELECT * FROM posts WHERE user_id IN (?);`;
    try {
        await query(getAllFriendsPosts, [friendList], (err, result) => {
            if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        }
        if (result) {
            console.log(result);
            res.status(200).json({ Posts: result });
        }
        })
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }

})

// @route POST api/posts
// @desc  Delete my post
// @acess Private
router.delete('/', auth, async(req, res)=>{

    // Delete post query
    const deletePostQuery = `DELETE FROM posts WHERE id = (?);`;
    // Get selected post to check if user is a poster
    const getPost = `SELECT * FROM posts WHERE id = ?;`;
    const {userId} = req.user.id;
    const {postId} = req.body;
    try {
        await query(getPost, postId, async (err, result) => {
            if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        }
        if (result) {
            console.log(result[0].user_id);
            if(!userId==result[0].user_id){
                return res.status(400).json({ errors: [{ msg: "You can't delete this post" }] });
            }
            await query (deletePostQuery,postId,  (err, result) =>{
                if (err) {
                    return res.status(400).json({ errors: [{ msg: err }] });
                }
                if (result) {
                    res.status(200).json({ msg: "Post deleted" });
                }
            })
        }
        })
        
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
})

module.exports = router;